# Frontend Guide (stp-internship)

## Stack

- Next.js 15 App Router (src/app), React 19, TypeScript

- Tailwind CSS v4, pola shadcn/ui (Radix, cva, clsx, tailwind-merge), lucide-react

- HTTP: axios. Token: js-cookie. Tanggal: date-fns, react-day-picker

- Backend: Laravel REST API (folder ../backend, JANGAN diubah dari sini)

## Perintah

- Dev: npm run dev | Build: npm run build | Lint: npm run lint

- Type check: npx tsc --noEmit

- Jika build gagal aneh, hapus .next/types

## Arsitektur (layered)

Alur satu arah: Page -&gt; Component -&gt; Hook -&gt; Service -&gt; api-client

src/

  app/               # HANYA routes. page.tsx tipis, HANYA `export default`

  components/

    ui/              # primitif (Button, Select, Popover)

    shared/          # komponen reusable (Sidebar, Modal, dll), BUKAN page.tsx

  features/&lt;fitur&gt;/

    components/ hooks/ services/ types.ts

  lib/

    api-client.ts    # SATU instance axios

    utils.ts         # cn()

  types/             # tipe global

## Aturan Wajib

1. page.tsx hanya merangkai komponen dan hanya boleh `export default`.

2. Komponen reusable TIDAK boleh bernama page.tsx dan TIDAK boleh di dalam app/.

3. Komponen UI tidak boleh memanggil axios/fetch langsung: lewat hooks -&gt; services.

4. Semua request API hanya di services/ dan memakai lib/api-client.ts.

5. Cookie/token hanya diakses di api-client dan modul auth.

6. Tipe request/response mengikuti docs/[api-contract.md](http://api-contract.md). Jangan menebak.

7. Dilarang `any`. Pakai tipe jelas atau `unknown` + type guard.

8. Satu komponen = satu tanggung jawab; pecah jika &gt;150 baris.

9. Hook custom wajib berawalan `use` (contoh: useMyApp).

10. URL API lewat NEXT_PUBLIC_API_URL, jangan hardcode.

11. "use client" hanya jika butuh state/efek/event.

12. Penamaan: komponen PascalCase, hook useXxx, service xxx.service.ts.

## Cara Kerja

- SATU fitur per iterasi, hanya file terkait fitur itu.

- Jangan ubah tampilan atau perilaku saat refactor, kecuali diminta.

- Jangan install library baru tanpa izin.

- Jangan hapus kode "belum tersambung" (ConfirmationModal, showModal,

  handleConfirm, ProtectRoute, dll). Catat di docs/[unwired-features.md](http://unwired-features.md).

- Jangan ubah logika auth/redirect tanpa melapor dulu.

- Endpoint BE belum ada: mock di services/ + catat di docs/[todo-backend.md](http://todo-backend.md).

- Akhir tiap iterasi: ringkasan maks 5 baris, update docs/[progress.md](http://progress.md),

  lalu beritahu aku untuk menjalankan tsc, lint, build (jangan jalankan

  sendiri jika terminal bermasalah).

## Prioritas

1. Fondasi (api-client, auth)  2. Halaman user  3. Halaman admin