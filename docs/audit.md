# Audit Frontend & Rencana Refactor

> Hasil analisis kode (tanpa mengubah kode). Kondisi: 69 file TS/TSX, 10.616 baris,
> Next.js 15.5 App Router. Kontrak backend ada di `docs/api-contract.md`.

## 1. Peta frontend

### Halaman (29 route)

| Area | Route | File | Catatan |
| --- | --- | --- | --- |
| Publik | `/` | `app/page.tsx` | landing + link ke `/user/auth` |
| Publik | `/user/auth` | `app/user/auth/page.tsx` → `auth/card/page.tsx` | login/register asli via `useMyApp()` |
| Publik | `/user/login` | `app/user/login/page.tsx` | mati: `fetch("/api/login")` tidak ada route |
| Publik | `/admin/login` | `app/admin/login/page.tsx` | mati + diblok `ProtectRoute` admin |
| User | `/user/beranda` | `beranda/page.tsx` | guard manual `authToken` |
| User | `/user/datadiri` | `datadiri/page.tsx` | memakai `components/applicationform.tsx` |
| User | `/user/dokumen` | `dokumen/page.tsx` | data mock `lib/dokumen.ts` |
| User | `/user/editprofile` (+`/form`) | `editprofile/*` | form profil |
| User | `/user/informasi` (+`/divisi`, `/supervisordata`) | `informasi/*` | `Status`, `TimelineMagang` (mock) |
| User | `/user/profile` (+`/profilesidebar`, `/userinfo`) | `profile/*` | sidebar & info profil |
| Admin | `/admin` | `admin/page.tsx` | `Sidebar` + `AdminDashboard` |
| Admin | `/admin/users` (+`/datapeserta`, `/[id]`) | `admin/users/*` | daftar & detail peserta |
| Admin | `/admin/infopendaftar` (+`/[id]`, `tambahdata`, `sunting`) | `admin/infopendaftar/*` | alur penerimaan |
| Admin | `/admin/setting` (+`/edit`) | `admin/setting/*` | `Sidebar` + `SettingCard` |
| API | `/api/statuspenerimaan`, `/api/timeline/[id]` | `app/api/*` | mock |

### Komponen bersama

`Navbar` & `Footer` (dipakai hampir semua halaman), `Sidebar` (admin), `AdminDashboard`,
`UserDashboard`, `SettingCard`, `Status`, `TimelineMagang`, `DocumentCard`, `applicationform`,
`customfileinput`, `faq`, `stepindicator`, `Loader`, `ProtectRoute`, `popup/*`, `ui/*`,
`profilesidebar`, `supervisordata`, `statuspenerimaan`, `timelinemagang`, `dokumen`
(4 terakhir duplikat/tidak terpakai).

### Semua panggilan API langsung — 30 panggilan di 19 file (+1 file mock)

| File | Jml | Target |
| --- | --- | --- |
| `components/applicationform.tsx` | 3 | `GET /jenjangPendidikans`, `GET /bidangPeminatans`, `POST /pendaftars` |
| `service/api.tsx` | 4 | `GET/POST /pendaftars*`, `GET /pesertas/{id}` |
| `service/servicePerserta.tsx` | 3 | `GET/POST /pesertas*` (1 route tidak ada) |
| `app/context/AppProviders.tsx` | 2 | `POST /login`, `POST /register` |
| `components/UserDashboard.tsx` | 1 | `GET /pesertas` |
| `admin/users/datapeserta/[id]/page.tsx` | 3 | `GET /pesertas/{id}`, `POST surat-balasan/surat-penilaian/sertifikat` |
| `admin/infopendaftar/tambahdata/[id]/page.tsx` | 1 | `POST /pesertas` |
| `admin/infopendaftar/tambahdata/sunting/[id]/page.tsx` | 2 | `GET/PUT /pesertas/{id}` |
| `service/timeline.service.ts` | 1 | `/api/timeline/{id}` (mock) |
| `components/Status.tsx` + `statuspenerimaan/page.tsx` | 2 | `/api/statuspenerimaan/{id}` |
| `components/supervisordata/page.tsx` + `informasi/supervisordata/page.tsx` | 2 | `/api/supervisor/{id}` |
| `app/user/informasi/divisi/page.tsx` | 1 | `/api/penempatan/{id}` |
| `components/profilesidebar`, `profile/profilesidebar`, `profile/userinfo` | 3 | `/api/user/profile` |
| `user/login/page.tsx`, `admin/login/page.tsx` | 2 | `/api/login` |
| `lib/dokumen.ts` | 0 | mock; `fetch` dikomentari |

- 19 panggilan ke Laravel memakai `${process.env.NEXT_PUBLIC_API_URL}` (16 referensi di 8 file);
  tidak ada instance axios bersama — 3 file membuat `axios.create` sendiri.
- 11 panggilan ke route internal Next; **hanya 2 route yang ada**. `/api/login` (2),
  `/api/user/profile` (3), `/api/supervisor` (2), `/api/penempatan` (1) → 404.
  `/api/statuspenerimaan/{id}` juga 404 karena route-nya statis.
- Pola berulang: `useEffect` + `try/catch` + `console.error` + fallback placeholder ditulis
  manual di tiap komponen (Status, Supervisor, Divisi, ProfileSidebar, Userinfo, dashboard).

## 2. Alur auth

| Hal | Fakta |
| --- | --- |
| Penyimpanan | Cookie via `js-cookie`: `authToken`, `userRole`, `userId` (7 hari) di `AppProviders` |
| Pembacaan | `useMyApp()` (context) untuk token/role; `ProtectRoute` membaca `userRole` dari `document.cookie` |
| `AppProviders` | Sumber login/register/logout ke Laravel; gate `isLoading`; redirect jika tidak ada token dan path bukan `["/", "/user/auth"]`; dipasang di root layout **dan** di `admin/layout.tsx` (provider bersarang) |
| `ProtectRoute` | Per-segmen (`user/layout`, `admin/layout`): cek `authToken` + role, lalu `router.push("/user/auth")`; anak tetap dirender saat belum loading → konten sempat berkedip sebelum redirect |
| Root layout | `ProtectRoute` **diimpor tetapi tidak dipakai** (warning build). Alasan wajar: root mencakup halaman publik (`/`, `/user/auth`); `ProtectRoute` tidak punya daftar route publik sehingga akan memblokir landing/auth dan memicu loop dengan `AppProviders` |
| Bug layout | `admin/layout` membungkus **semua** `/admin/*`, termasuk `/admin/login` → halaman login admin ikut diblok. `user/layout` membungkus `/user/auth` & `/user/login` → redirect ke dirinya sendiri |
| Redirect | `login()`: admin → `/admin`, user → `/user/beranda`, lainnya → `/`. `logout()`: hapus cookie → `/user/auth`. Halaman login lama (`/user/login`, `/admin/login`) hanya `router.push("/")` |
| Middleware | `middleware.ts` memeriksa cookie `auth-token` (nama berbeda dari `authToken`) dan matcher `"user/profile/"` (tidak valid) → tidak pernah aktif; jika aktif pun redirect ke `/login` yang tidak ada |
| Kesimpulan | Ada 3 mekanisme guard (AppProviders, ProtectRoute, middleware) + 3 UI login; hanya `/user/auth` + `AppProviders` yang berfungsi |

## 3. File terpanjang & duplikasi

**Terpanjang:** `admin/users/datapeserta/[id]/page.tsx` 992 · `components/applicationform.tsx` 869 ·
`admin/infopendaftar/[id]/page.tsx` 594 · `admin/users/datapeserta/page.tsx` 588 ·
`admin/infopendaftar/tambahdata/sunting/[id]/page.tsx` 489 · `admin/infopendaftar/page.tsx` 486 ·
`admin/infopendaftar/tambahdata/[id]/page.tsx` 436 · `AdminDashboard.tsx` 315 ·
`auth/card/page.tsx` 312 · `admin/infopendaftar/tambahdata/page.tsx` 267.

**Duplikasi terbesar (selisih baris `diff`):**

| Pasangan | Selisih | Status |
| --- | --- | --- |
| `components/timelinemagang/page.tsx` vs `components/TimelineMagang.tsx` | 2 | nyaris identik |
| `components/supervisordata/page.tsx` vs `informasi/supervisordata/page.tsx` | 4 | nyaris identik |
| `user/login/page.tsx` vs `admin/login/page.tsx` | 57 | UI + logika sama |
| `components/dokumen/page.tsx` vs `components/DocumentCard.tsx` | 84 | beda kelas font |
| `profile/profilesidebar/page.tsx` vs `components/profilesidebar/page.tsx` | 90 | versi berbeda |
| `components/statuspenerimaan/page.tsx` vs `components/Status.tsx` | 96 | beda kecil |
| `tambahdata/page.tsx` vs `tambahdata/sunting/page.tsx` | 155 | form sejenis |
| `admin/infopendaftar/page.tsx` vs `admin/users/datapeserta/page.tsx` | 454 | tabel sejenis |
| `admin/infopendaftar/[id]/page.tsx` vs `admin/users/datapeserta/[id]/page.tsx` | 1.040 | alur detail sejenis |

**Backend:** `SuratBalasanMagangController` (170) ≈ `SuratPenilaianController` (141) ≈
`SertifikatMagangController` (141) — blok validasi/upload/response hampir sama; `BerkasPesertaController`
mengulang blok yang sama. Semua controller mengulang pola validasi + response.

## 4. Urutan refactor (kecil → besar)

| # | Langkah | Cakupan | Alasan/urut |
| --- | --- | --- | --- |
| 1 | **Bersih-bersih** | Hapus duplikat tak terpakai (`components/statuspenerimaan`, `timelinemagang`, `dokumen`, `profilesidebar`), `ProtectRoute` di root layout, `middleware.ts` mati, halaman login ganda | Risiko rendah, mengurangi kebingungan sebelum kerja besar |
| 2 | **Klien API tunggal** | `lib/api.ts` (satu axios instance + baseURL + interceptor token), service per resource; ganti 19 panggilan langsung | Fondasi; menghapus 16 referensi env dan 3 `axios.create` |
| 3 | **Kontrak + auth backend** | FormRequest + Resource, satukan envelope, pasang `auth:sanctum` + policy, perbaiki `show` surat/sertifikat & field `*_dua` | API stabil dulu agar frontend tidak mengejar perubahan |
| 4 | **Auth frontend** | Satu alur: `/user/auth` → `AppProviders`; hapus `/user/login`, `/admin/login`; perbaiki `ProtectRoute` (pakai context, bukan cookie) + allowlist publik; hapus provider bersarang | Menyentuh semua halaman, jadi setelah API stabil |
| 5 | **Fitur user ringan** | `informasi` (Status/Supervisor/Divisi/Timeline) + `dokumen` pakai service nyata; hapus fallback placeholder | 4 komponen, pola sama, cepat |
| 6 | **Profil user** | Satukan `profile`, `userinfo`, `profilesidebar`; form `editprofile`; endpoint "data magang saya" (lihat `docs/todo-backend.md`) | Ukuran sedang, dependency ke #3 |
| 7 | **Admin baca** | `AdminDashboard`, `UserDashboard`, daftar pendaftar/peserta: server-side pagination + filter, pecah tabel jadi komponen | File 300–600 baris |
| 8 | **Admin form berat** | `tambahdata`, `sunting`, `datapeserta/[id]` (992 baris): pecah per langkah form, hook upload, satukan dua alur detail yang 1.040 baris berbeda | Terbesar & paling berisiko; terakhir |

Kriteria selesai tiap langkah: `npx tsc --noEmit` dan `npm run build` bersih, tidak ada route 404
yang dipanggil, dan tidak ada data placeholder yang tampil sebagai data asli.
