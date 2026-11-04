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

## Auth

### Logout belum mencabut token Sanctum

`AuthController@logout` ada, tetapi tidak didaftarkan di `routes/api.php`.
Frontend hanya menghapus cookie `authToken`/`userRole`/`userId`. Token Sanctum
tetap valid sampai kedaluwarsa atau dicabut manual.

Backend perlu endpoint logout, misalnya:

```http
POST /api/logout
Authorization: Bearer <token>
```

```php
$request->user()->currentAccessToken()->delete();
```

### Login gagal sebaiknya bukan HTTP 200

`POST /api/login` saat kredensial salah membalas HTTP **200** dengan
`{ "status": false, "message": "invalid credentials" }`. Frontend harus
menebak kegagalan dari body, dan interceptor 401 tidak pernah terpicu.

Sebaiknya balas **401** (atau 422) dengan pesan yang sama, agar penanganan
error konsisten. Backend tidak diubah dari sisi frontend.

## Update status peserta

`pesertaService.updateStatus` memanggil `POST /api/pesertas/{id}/update-status`,
tetapi route tersebut belum ada (yang tersedia hanya
`PUT /api/pendaftars/{id}/update-status`). Method ini belum dipakai komponen
mana pun. Jika nanti dibutuhkan, backend perlu menambah route yang setara.

## Endpoint data magang user (sebagian masih mock)

Profil pendaftar (`/user/profile`, sidebar, dan detail) kini memakai
`GET /api/me/pendaftar` yang sudah tersedia dengan middleware `auth:sanctum`.
Endpoint ini mengembalikan data pendaftar milik user login, atau `data: null`
bila user belum mengisi form, sehingga frontend dapat membedakan "belum
mendaftar" dari error. Service lama `profileService` (`/api/user/profile`)
sudah dihapus.

Halaman `/user/informasi` masih mengambil data dari route internal Next yang
**belum ada** (404) atau mock. Service-nya sudah disiapkan agar nanti cukup
mengganti URL:

| Service frontend | URL sekarang | Endpoint yang dibutuhkan |
| --- | --- | --- |
| `statusPenerimaanService` | `/api/statuspenerimaan/{id}` | `GET /api/status-penerimaan-saya` |
| `supervisorService` | `/api/supervisor/{id}` | `GET /api/supervisor-saya` |
| `penempatanService` | `/api/penempatan/{id}` | `GET /api/penempatan-saya` |

Semua endpoint sebaiknya di-scope dari user yang sedang login (tanpa `id` di
URL), sama seperti usulan `magang-saya`.

Bentuk respons yang dibaca frontend:

```json
{ "status": "diterima" }
```

```json
{ "name": "Nama Supervisor", "phone": "+62...", "email": "..." }
```

```json
{ "divisi": "Divisi IT", "tanggalMulai": "2026-01-05" }
```

```json
{
  "nama": "...",
  "status": "...",
  "divisi": "...",
  "profilePicture": null,
  "namalengkap": "...",
  "jeniskelamin": "...",
  "email": "...",
  "nohandphone": "...",
  "instansi": "...",
  "tempatlahir": "...",
  "tanggalLahir": "...",
  "alamatasal": "...",
  "alamatdomisili": "...",
  "jurusan": "..."
}
```

Selama endpoint belum ada, UI tetap memakai placeholder/fallback yang lama agar
tidak menampilkan error.

## Pagination & filter daftar admin

`GET /api/pendaftars` dan `GET /api/pesertas` masih mengembalikan seluruh tabel
(`->get()`), tanpa parameter pagination/filter. Karena itu dashboard admin
(`/admin` dan `/admin/users`) masih memuat semua data lalu memfilter di browser.
Refactor frontend langkah #7 sudah memecah tabel menjadi komponen, tetapi
pagination server-side belum bisa diaktifkan.

Kontrak yang dibutuhkan (nama parameter bebas, sesuaikan):

```http
GET /api/pendaftars?page=1&per_page=10&status=diterima&search=budi
GET /api/pesertas?page=1&per_page=10&status=onGoing&search=budi
```

```json
{
  "success": true,
  "data": [{ "id_pendaftar": 1 }],
  "meta": {
    "current_page": 1,
    "per_page": 10,
    "total": 42,
    "last_page": 5
  }
}
```

Catatan:

- `search` sebaiknya mencocokkan nama (dan email bila perlu).
- `status` memakai nilai yang sama dengan kolom: `uncheck|diterima|ditolak`
  untuk pendaftar, `onGoing|finished` untuk peserta.
- Frontend saat ini juga membaca status peserta sebagai `On Going`/`Finished`
  (label UI). Perlu kesepakatan nilai status agar filter tidak kosong; sampai
  itu perilaku lama dipertahankan.

Setelah endpoint tersedia, ganti pemanggilan di
`frontend/src/features/admin/pendaftar/hooks/usePendaftarList.ts` dan
`frontend/src/features/admin/peserta/hooks/usePesertaList.ts` agar mengirim
`page`/`per_page`/`status`/`search`, lalu hapus filter client-side.
