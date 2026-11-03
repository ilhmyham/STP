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
