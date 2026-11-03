# TODO Backend

## Endpoint "Data Magang Saya"

Timeline magang di halaman `/user/informasi` saat ini memakai data mock
(`frontend/src/app/api/timeline/[id]/route.ts`). Agar memakai data asli,
backend perlu menyediakan endpoint yang mengembalikan data magang milik
**user yang sedang login**.

### Kenapa endpoint baru?

Endpoint yang sudah ada tidak bisa dipakai langsung:

- `GET /api/pesertas/{id}` memakai `id_peserta`.
- `GET /api/pendaftars/{id}` memakai `id_pendaftar`.
- Keduanya bukan `user_id` login, dan tidak bisa dipakai user biasa untuk
  mengambil datanya sendiri.

### Kontrak yang dibutuhkan frontend

`GET /api/magang-saya` (nama bebas, sesuaikan), di-scope dari
`user_id` pada token/session:

```json
{
  "success": true,
  "data": {
    "status": "diterima",
    "tanggal": "2026-01-05",
    "tanggal_selesai": "2026-04-05"
  }
}
```

| Field            | Sumber                                              | Nullable |
| ---------------- | --------------------------------------------------- | -------- |
| `status`         | `pendaftars.status` (`uncheck`/`diterima`/`ditolak`) | tidak    |
| `tanggal`        | `pesertas.tanggal` (mulai magang)                    | ya       |
| `tanggal_selesai`| `pesertas.tanggal_selesai`                           | ya       |

Catatan:

- Relasi: `users.id` -> `pendaftars.user_id` -> `pesertas.pendaftar_id`.
- `pesertas` hanya ada setelah pendaftar diterima, jadi `tanggal` dan
  `tanggal_selesai` boleh `null` (mis. masih `uncheck`/`ditolak`).
- Format tanggal: `Y-m-d`.
- Jangan menyederhanakan bentuk respons; frontend membaca `success` dan `data`.

### Setelah endpoint tersedia

Cukup ubah `frontend/src/service/timeline.service.ts`:

- Ganti URL `/api/timeline/${id}` ke endpoint user-scoped (tanpa `id`).
- Hapus penanda `// TODO: ganti ke endpoint user-scoped Laravel`.
- Route mock `frontend/src/app/api/timeline/[id]/route.ts` bisa dihapus.

Konversi `status` -> `statusPendaftaran` (diterima = `true`, selain itu
`false`) sudah terpusat di service tersebut.
