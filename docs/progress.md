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
