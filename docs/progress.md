# Progress

## Ringkasan

| Area                           | Status                                  |
| ------------------------------ | --------------------------------------- |
| Timeline Magang (`/user/informasi`) | **Mock** (belum tersambung ke Laravel) |

## Timeline Magang

- Status: **mock data**, bukan data asli.
- Sumber data sementara: `frontend/src/app/api/timeline/[id]/route.ts`
  (data statis per `id`, mengikuti bentuk respons Laravel).
- Alur: route mock -> `frontend/src/service/timeline.service.ts` ->
  `frontend/src/app/user/informasi/page.tsx` -> komponen `TimelineMagang`.
- Konversi status: `diterima` = `statusPendaftaran: true`, selain itu
  (`uncheck`/`ditolak`) = `false`.
- Endpoint Laravel yang dibutuhkan: lihat `docs/todo-backend.md`.

## Catatan lain

- Komponen lain di `/user/informasi` juga masih memakai data mock/placeholder
  (`Status`, `Supervisor`, `Divisi`).

## Auth guard (refactor)

- Satu provider (`features/auth/components/AuthProvider`) dan satu guard
  (`features/auth/components/AuthGuard`) di root layout; `AppProvider` bersarang di
  `admin/layout` dihapus.
- Provider tidak mengarahkan saat hidrasi; guard yang mengarahkan setelah sesi terbaca.
- **Children tidak dirender saat unauthorized** (sebelumnya konten sempat
  tampil lalu redirect). Saat loading/redirect yang dirender hanya `Loader`.
- Tanpa sesi: `/admin/*` -> `/admin/login`, `/user/*` -> `/user/auth`.
  Role salah -> halaman utama role masing-masing.
- `/user/login` sekarang redirect ke `/user/auth`; `/admin/login` disambungkan
  ke `auth.service` (role non-admin ditolak, sesi tidak disimpan).
- Kredensial salah menampilkan "Email atau password salah" lewat state error
  yang sudah ada.
- `middleware.ts` dihapus. Sesi tetap di cookie `authToken`/`userRole`/`userId`
  selama 7 hari.

## Klien API tunggal (langkah #2)

- Semua panggilan ke Laravel sekarang lewat `lib/api-client.ts`. Tidak ada lagi
  `axios.create` di luar api-client.
- Service per resource: `service/api.tsx` (`PendaftarService`),
  `service/servicePerserta.tsx` (`pesertaService`),
  `service/master.service.ts` (jenjang & bidang), dan
  `service/berkasPeserta.service.ts` (surat balasan/penilaian/sertifikat).
- Komponen yang dimigrasi: `applicationform`, `UserDashboard`,
  `AdminDashboard`, `admin/infopendaftar{,/[id],/tambahdata/[id],/tambahdata/sunting/[id]}`,
  `admin/users/datapeserta/[id]`.
- `applicationform` membaca `userId` lewat modul auth (`getSession`), bukan
  `js-cookie` langsung.
- Sisa `fetch` untuk route internal Next yang masih mock/404
  (`/api/statuspenerimaan`, `/api/supervisor`, `/api/penempatan`, `/api/user/profile`,
  `/api/timeline`) sudah dipindahkan ke service pada langkah #5 (lihat bawah).
  Backend belum punya endpoint-nya (lihat `docs/todo-backend.md`).

## Fitur user ringan (langkah #5)

- `Status`, `statuspenerimaan`, `supervisordata` (2 salinan), `informasi/divisi`,
  `profilesidebar` (2 salinan), dan `profile/userinfo` tidak lagi memanggil
  `fetch` langsung.
- Service baru: `statusPenerimaan.service.ts`, `supervisor.service.ts`,
  `penempatan.service.ts`, `profile.service.ts`, plus `timeline.service.ts`
  yang sudah ada.
- Tampilan dan fallback placeholder **tidak diubah** karena endpoint Laravel
  untuk data ini belum tersedia. Semua URL lama dipertahankan di dalam service.
- `/user/dokumen` masih memakai mock `lib/dokumen.ts` (belum ada endpoint).

## Fitur profil (langkah #6)

- Komponen profil dipindahkan ke `features/profile/`:
  `components/ProfileSidebar`, `UserInfo`, `ProfileInfoItem`, `ProfileLayout`,
  `ProfileForm`, `ProfileFormField`; hook `useProfileSummary`, `useProfileDetail`,
  `useProfileForm`; konstanta form di `lib/profileForm.ts`; tipe di `types.ts`.
- `app/user/profile`, `app/user/editprofile`, `profilesidebar`, `userinfo`, dan
  `editprofile/form` sekarang hanya wrapper tipis (`export default`).
- Perilaku lama dipertahankan per halaman:
  - Logout mobile di `/user/profile` tetap `router.push("/")`.
  - Logout mobile di `/user/editprofile` tetap tanpa aksi.
  - Tombol "Simpan" pada form edit tetap di luar `<form>` (tidak men-submit),
    dan "Batal" tetap mengosongkan form.
- Tidak ada perubahan pada service `profile.service.ts`; masih mock
  `/api/user/profile` sampai endpoint Laravel tersedia.
- `components/profilesidebar/page.tsx` dipertahankan sebagai alias re-export
  (lihat `docs/unwired-features.md`).

## Admin baca (langkah #7)

- Dashboard admin dipindahkan ke `features/admin/`:
  - `components/FilterTabs`, `SearchInput` (dipakai kedua tabel).
  - `pendaftar/hooks/usePendaftarList`, `pendaftar/components/PendaftarTable`,
    `pendaftar/components/AdminDashboard`.
  - `peserta/hooks/usePesertaList`, `peserta/components/PesertaTable`,
    `peserta/components/PesertaRowActions`, `peserta/components/UserDashboard`.
  - Tipe baris/API di `features/admin/types.ts`.
- `components/AdminDashboard.tsx` dan `components/UserDashboard.tsx` menjadi
  alias re-export; halaman `/admin` dan `/admin/users` tidak berubah.
- Filter, pencarian, tombol status, navigasi detail, dan footer tabel
  dipertahankan persis seperti sebelumnya (masih client-side).
- **Pagination server-side belum aktif**: backend belum mendukung
  `page`/`per_page`/`status`/`search` (lihat `docs/todo-backend.md`). Placeholder
  "Next Page" dan teks "Menampilkan X dari Y data" dibiarkan apa adanya.
- `updatingId` yang tidak pernah dibaca dihapus; tidak ada perubahan tampilan.
- Dua halaman detail placeholder tanpa link masuk
  (`/admin/infopendaftar`, `/admin/users/datapeserta`) belum disentuh karena
  bukan daftar tabel; dicatat di `docs/unwired-features.md` (keputusan akhir:
  dipertahankan apa adanya, lihat langkah #8).

## Admin form & detail (langkah #8)

- Komponen bersama di `features/admin/shared/components/`: `AdminFormShell`,
  `AdminDetailShell` (layout `Sidebar` + konten), `FormBreadcrumb`,
  `DetailBreadcrumb`, dan `DataSection` (baris label/nilai; opsi `withBreak`).
- Halaman form sekarang hanya wrapper tipis:
  - `admin/infopendaftar/tambahdata/page.tsx` (49 baris) — placeholder.
  - `admin/infopendaftar/tambahdata/[id]/page.tsx` (69 baris).
  - `admin/infopendaftar/tambahdata/sunting/page.tsx` (49 baris) — placeholder.
  - `admin/infopendaftar/tambahdata/sunting/[id]/page.tsx` (74 baris).
- Halaman detail:
  - `admin/infopendaftar/[id]/page.tsx` (70 baris) — `usePendaftarDetail`,
    `PendaftarDetailSections` (pribadi/pendidikan),
    `PendaftarMagangSection`, `PendaftarStatusActions`.
  - `admin/users/datapeserta/[id]/page.tsx` (46 baris) — `usePesertaDetail`,
    `usePesertaBerkas`, `PesertaDetailSections`, `PesertaInfoSection`,
    `PesertaBerkasSection`, `PesertaBerkasCard`.
- Hook baru: `useBidangPeminatanOptions`, `useCreatePesertaForm`,
  `usePesertaEditForm`, `usePendaftarDetail`, `usePesertaDetail`,
  `usePesertaBerkas`. Tipe admin form/detail di
  `features/admin/infopendaftar/types.ts` dan `features/admin/peserta/types.ts`;
  helper berkas di `peserta/lib/pesertaFiles.ts`, tanggal di
  `peserta/lib/formatDate.ts`.
- Semua komponen hasil pecahan ≤150 baris.
- **Perilaku & tampilan lama dipertahankan**, termasuk bug yang sudah ada:
  - `sunting/[id]` tetap memakai `name='tanggal_selesai}'` (via prop
    `tanggalSelesaiName`), tombol "Simpan" di dalam `<form>`, dan teks `;`
    setelah `</form>`.
  - `tambahdata/[id]` dan `tambahdata` tetap menaruh tombol Simpan di luar
    `<form>` (modal konfirmasi memanggil submit secara manual).
  - `tambahdata/sunting/[id]` tetap memakai dua opsi bidang hardcoded
    ("Divisi 1", "Divisi 2") seperti versi lama, bukan data dari API.
  - Modal status pendaftar baru ditutup setelah `updateStatus` selesai
    (meniru `finally` lama).
  - Base URL berkas awalnya hardcoded `http://127.0.0.1:8000/storage`;
    sekarang diturunkan dari env (lihat bagian "Perbaikan dokumen admin").
- Verifikasi: `npx tsc --noEmit` bersih, `npm run build` sukses (29 route).
  `npm run lint` hanya menyisakan warning lama; warning `<img>` berpindah dari
  halaman detail lama ke `PesertaBerkasCard` (markup sengaja dipertahankan).
- Dua halaman placeholder tanpa link masuk (`admin/infopendaftar/page.tsx`,
  `admin/users/datapeserta/page.tsx`) **tidak dipecah**: tidak dapat dijangkau
  dari UI dan hanya salinan detail lama. Dipertahankan sesuai aturan "jangan
  hapus kode belum tersambung" dan dicatat di `docs/unwired-features.md`.

## Perbaikan dokumen admin (lanjutan)

- **403 saat melihat dokumen pendaftar/peserta**: data seed hanya menyimpan
  path tanpa file fisik, sehingga route `storage.local` mengembalikan 403.
  Seeder kini membuat PDF contoh nyata di `storage/app/public/seed/...`;
  `php artisan storage:link` wajib dijalankan sekali.
- **422 saat unggah berkas peserta**: batas lama 2 MB dan hanya
  `pdf/jpg/jpeg/png`. Sekarang batas 10 MB dan menerima
  `pdf/doc/docx/jpg/jpeg/png` (validasi backend + pre-check frontend).
  `upload_max_filesize`/`post_max_size` lokal dinaikkan ke 20M/25M.
- `store` memakai `firstOrNew` per `id_peserta` sehingga unggahan tidak lagi
  membuat baris ganda yang tidak terbaca relasi `hasOne`.
- `SertifikatMagangController@update` memvalidasi field `sertifikat_magang`
  (sebelumnya keliru memakai `surat_balasan`).
- Nama file disimpan dengan ekstensi asli (DOCX tidak lagi menjadi `.zip`).
- URL file frontend diturunkan dari `NEXT_PUBLIC_API_URL`
  (`frontend/src/lib/storage.ts`), bukan hardcoded di dua tempat.

## Perbaikan UX pendaftar baru

- Sumber error `Failed to fetch user data` dihapus: `profileService`
  (`/api/user/profile`, route yang tidak ada) diganti endpoint Laravel
  `GET /api/me/pendaftar` yang di-scope dari user login.
- `features/pendaftaran/` baru: `PendaftarProvider` (satu kali fetch per sesi),
  hook `usePendaftarStatus`, service `pendaftaranService`, tipe `PendaftarRecord`,
  dan `PendaftarGate` (loading/error/empty state).
- `PendaftarProvider` dipasang di `app/user/layout.tsx`. Navbar menyembunyikan
  menu **Informasi Magang**, **Berkas Magang**, dan **Profil** selama user
  belum punya data pendaftar, lalu menampilkan CTA "Lengkapi Pendaftaran".
- Akses langsung ke `/user/profile`, `/user/editprofile`, `/user/informasi`,
  dan `/user/dokumen` menampilkan ajakan melengkapi form (bukan error).
- Karena sidebar profil (satu-satunya tombol keluar lama) ikut tersembunyi,
  navbar menampilkan tombol **Keluar** untuk pendaftar baru.
- Setelah form pendaftaran berhasil dikirim, `ApplicationForm` memanggil
  `refresh()` agar menu langsung muncul tanpa reload.
- Halaman yang bergantung pada data pendaftar tetap mempertahankan tampilan
  lamanya ketika user sudah mendaftar.
