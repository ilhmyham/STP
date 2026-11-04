# API Contract — Backend Laravel

> Disusun dari pembacaan kode `backend/` (bukan dokumentasi resmi). Kondisi repo saat audit.
> Base URL: `{APP_URL}/api` (default `http://localhost:8000/api`).
> Auth: Laravel Sanctum. Login mengembalikan bearer token; endpoint yang diproteksi memakai
> `Authorization: Bearer <token>` + middleware `auth:sanctum`.
> Error validasi: HTTP 422 format default Laravel `{ "message": "...", "errors": { "field": ["..."] } }`.
>
> Tidak ada FormRequest dan tidak ada API Resource. Validasi ditulis inline di controller dan
> bentuk respons tidak seragam (`{status,message}`, `{success,data}`, `{message,data}`, atau array mentah).

## Ringkasan endpoint

| Method | Path | Auth | Controller | Status |
| --- | --- | --- | --- | --- |
| POST | `/api/register` | publik | `AuthController@register` | jalan |
| POST | `/api/login` | publik | `AuthController@login` | jalan |
| GET | `/api/users` | publik | `UserController@index` | jalan |
| POST | `/api/users` | publik | `UserController@store` | jalan |
| GET | `/api/users/{id}` | publik | `UserController@show` | jalan |
| PUT/PATCH | `/api/users/{id}` | publik | `UserController@update` | jalan |
| DELETE | `/api/users/{id}` | publik | `UserController@destroy` | jalan |
| GET | `/api/jenjangPendidikans` | publik | `JenjangPendidikanController@index` | jalan |
| POST | `/api/jenjangPendidikans` | publik | `JenjangPendidikanController@store` | jalan |
| GET/PUT/DELETE | `/api/jenjangPendidikans/{id}` | publik | `show/update/destroy` | kosong |
| GET | `/api/bidangPeminatans` | publik | `BidangPeminatanController@index` | jalan |
| POST | `/api/bidangPeminatans` | publik | `BidangPeminatanController@store` | jalan |
| GET/PUT/DELETE | `/api/bidangPeminatans/{id}` | publik | `show/update/destroy` | kosong |
| GET/POST/GET/PUT/DELETE | `/api/berkasPendaftars[/{id}]` | publik | `BerkasPendaftarController` | **semua kosong** |
| GET | `/api/pendaftars` | publik | `PendaftarController@index` | jalan |
| POST | `/api/pendaftars` | publik | `PendaftarController@store` | jalan (multipart) |
| GET | `/api/pendaftars/{id}` | publik | `PendaftarController@show` | jalan |
| PUT/PATCH | `/api/pendaftars/{id}` | publik | `PendaftarController@update` | **bermasalah** (lihat catatan) |
| DELETE | `/api/pendaftars/{id}` | publik | `PendaftarController@destroy` | jalan |
| PUT | `/api/pendaftars/{id}/update-status` | publik | `PendaftarController@updateStatus` | jalan |
| GET | `/api/me/pendaftar` | sanctum | `PendaftarController@me` | jalan (`data: null` bila belum mendaftar) |
| GET | `/api/pesertas` | publik | `PesertaController@index` | jalan |
| POST | `/api/pesertas` | publik | `PesertaController@store` | jalan (nama field bermasalah) |
| GET | `/api/pesertas/{id}` | publik | `PesertaController@show` | jalan |
| PUT/PATCH | `/api/pesertas/{id}` | publik | `PesertaController@update` | jalan |
| DELETE | `/api/pesertas/{id}` | publik | `PesertaController@destroy` | jalan |
| POST | `/api/surat-balasan` | publik | `SuratBalasanMagangController@store` | jalan |
| GET | `/api/surat-balasan/{id}` | publik | `SuratBalasanMagangController@show` | **rusak** |
| PUT | `/api/surat-balasan/{id}` | publik | `SuratBalasanMagangController@update` | jalan |
| POST | `/api/surat-penilaian` | publik | `SuratPenilaianController@store` | jalan |
| GET | `/api/surat-penilaian/{id}` | publik | `SuratPenilaianController@show` | **rusak** |
| PUT | `/api/surat-penilaian/{id}` | publik | `SuratPenilaianController@update` | jalan |
| POST | `/api/sertifikat` | publik | `SertifikatMagangController@store` | jalan |
| GET | `/api/sertifikat/{id}` | publik | `SertifikatMagangController@show` | **rusak** |
| PUT | `/api/sertifikat/{id}` | publik | `SertifikatMagangController@update` | **validasi salah field** |
| GET | `/api/admin-only` | sanctum + role:admin | closure | jalan |
| GET | `/api/user-only` | sanctum + role:user | closure | jalan |

Catatan besar: **seluruh CRUD bisnis bersifat publik**. Hanya `/me/pendaftar` dan dua route uji
(`/admin-only`, `/user-only`) yang memakai middleware. `BerkasPesertaController` ada, tetapi route-nya dikomentari di `routes/api.php`.
`AuthController@profile` dan `@logout` ada, tetapi tidak pernah didaftarkan.

## Auth

### POST /api/register

Request (JSON):

```json
{ "name": "Budi", "email": "budi@example.com", "password": "rahasia123" }
```

Response `200`:

```json
{ "status": true, "message": "user registred successfully" }
```

Catatan: `password_confirmation` tidak divalidasi/dipakai meski frontend mengirimnya. Role tidak di-set
di controller; mengandalkan default kolom `role` = `user`.

### POST /api/login

Request (JSON):

```json
{ "email": "budi@example.com", "password": "rahasia123" }
```

Response `200` (sukses):

```json
{
  "status": true,
  "message": "user logged in",
  "token": "1|xxxxxxxxxxxxxxxxxxxxxxxx",
  "role": "user",
  "user_id": 2
}
```

Response `200` (gagal — bukan 401):

```json
{ "status": false, "message": "invalid credentials" }
```

Catatan: tidak ada rate limiting, token Sanctum tidak pernah dicabut (method `logout` tidak dirutekan).

## Users

### GET /api/users

Response `200`:

```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "Budi",
      "email": "budi@example.com",
      "role": "user",
      "pendaftar": {
        "id_pendaftar": 1,
        "user_id": 2,
        "nama": "Budi",
        "status": "diterima",
        "peserta": {
          "id": 1,
          "pendaftar_id": 1,
          "tanggal": "2026-01-05",
          "tanggal_selesai": "2026-04-05",
          "status": "onGoing"
        }
      }
    }
  ]
}
```

### POST /api/users

Request: `name`, `email` (unik), `password` (min 6). Response `201`:

```json
{ "success": true, "message": "User berhasil dibuat", "data": { "id": 3, "name": "Ani", "email": "ani@example.com" } }
```

Catatan: `role` tidak ada di `$fillable`, jadi tidak bisa di-set lewat endpoint ini.

### GET/PUT/DELETE /api/users/{id}

- GET → `{ "success": true, "data": <user + pendaftar> }`
- PUT/PATCH (semua field `sometimes`) → `{ "success": true, "message": "...", "data": <user> }`
- DELETE → `{ "success": true, "message": "User berhasil dihapus" }`

## Master data

### GET /api/jenjangPendidikans · GET /api/bidangPeminatans

Response berupa **array mentah** (dipakai frontend sebagai `response.data`):

```json
[ { "id": 1, "pendidikan": "SMA/SMK" }, { "id": 2, "pendidikan": "D3" } ]
```

```json
[ { "id": 1, "nama_bidang": "Software Development" } ]
```

### POST /api/jenjangPendidikans

Request: `{ "pendidikan": "S1" }` → `201 { "message": "...", "data": {...} }`.
POST `/api/bidangPeminatans`: request `{ "nama_bidang": "Data" }` → `201 <objek mentah>`.

`show/update/destroy` kedua controller masih kosong (respons `200` tanpa body).

## Pendaftar

### GET /api/me/pendaftar (auth:sanctum)

Data pendaftar milik user yang sedang login, dengan eager load yang sama seperti
`index` (`berkas`, `bidangPeminatan`, `jenjangPendidikan`, `peserta`). Bila user
belum mengisi form, respons tetap `200` agar frontend bisa membedakan
"belum mendaftar" dari error:

```json
{ "success": true, "data": null }
```

### GET /api/pendaftars

Eager load: `berkas`, `bidangPeminatan`, `jenjangPendidikan`, `peserta`.

```json
{
  "success": true,
  "data": [
    {
      "id_pendaftar": 1,
      "user_id": 2,
      "nama": "Budi",
      "tempat_lahir": "Solo",
      "tanggal_lahir": "2003-02-01T00:00:00.000000Z",
      "jenis_kelamin": "pria",
      "email": "budi@example.com",
      "noHP": "0812...",
      "alamat_asal": "Solo",
      "alamat_domisili": "Solo",
      "asal_instansi": "UNS",
      "jenjang_pendidikan": 1,
      "fakultas": "FT",
      "program_studi": "Informatika",
      "nim": "123",
      "semester": "5",
      "durasi": "3 bulan",
      "periodic_mulai": "2026-01-05T00:00:00.000000Z",
      "bidang_peminatan": 1,
      "status": "diterima",
      "berkas": { "cv": "berkas/xxx.pdf", "surat_rekomendasi": "...", "proposal": "...", "dok_pendukung": null },
      "peserta": { "id": 1, "tanggal": "2026-01-05", "tanggal_selesai": "2026-04-05" }
    }
  ]
}
```

### POST /api/pendaftars (multipart/form-data)

Field wajib: `nama`, `tempat_lahir`, `tanggal_lahir`, `jenis_kelamin` (`pria|wanita`), `email` (unik),
`noHP`, `alamat_asal`, `alamat_domisili`, `asal_instansi`, `jenjang_pendidikan`, `program_studi`,
`nim`, `semester`, `durasi`, `periodic_mulai`, `bidang_peminatan`, `user_id`, dan file
`cv`, `surat_rekomendasi`, `proposal` (PDF, maks 2 MB). Opsional: `fakultas`, `dok_pendukung`, `status`.

Response `201`:

```json
{ "success": true, "data": { "id_pendaftar": 4, "...": "..." }, "berkas": { "id": 4, "cv": "berkas/..." } }
```

Catatan: `user_id` dikirim manual oleh frontend (bukan dari token). File disimpan di disk `public`;
respons hanya berisi path relatif, tanpa URL siap pakai.

### PUT /api/pendaftars/{id}

Semua field `sometimes`, **tetapi** `cv`, `surat_rekomendasi`, dan `proposal` divalidasi
`required|string`. Artinya update data tanpa mengirim ketiganya akan gagal `422`, dan endpoint ini
tidak menerima upload file baru. Frontend tidak memakai endpoint ini.

### PUT /api/pendaftars/{id}/update-status

Request: `{ "status": "diterima" }` (`uncheck|diterima|ditolak`) → `{ "success": true, "data": {...}, "message": "Status berhasil diupdate" }`.

## Peserta

### GET /api/pesertas

Eager load `pendaftar.berkas`, `bidangPeminatan`, `suratBalasan`, `suratPenilaian`, `sertifikatMagang`.

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "pendaftar_id": 1,
      "tanggal": "2026-01-05T00:00:00.000000Z",
      "tanggal_selesai": "2026-04-05",
      "mentor": "Pak Andi",
      "mentor_kedua": null,
      "email": "andi@example.com",
      "email_kedua": null,
      "noHp": "0812...",
      "noHp_kedua": null,
      "bidang_peminatan_id": 1,
      "status": "onGoing",
      "pendaftar": { "id_pendaftar": 1, "nama": "Budi" },
      "bidang_peminatan": { "id": 1, "nama_bidang": "Software Development" }
    }
  ]
}
```

### POST /api/pesertas

Validasi: `pendaftar_id`, `tanggal` (`Y-m-d`), `tanggal_selesai` (`Y-m-d`), `mentor`,
`bidang_peminatan_id`, `email`, `noHp`; opsional `mentor_dua`, `email_dua`, `noHp_dua`, `status`.
Response `201 { "success": true, "data": {...} }`.

**Bug nama field:** validasi memakai `mentor_dua`/`email_dua`/`noHp_dua`, sedangkan kolom dan
`$fillable` memakai `mentor_kedua`/`email_kedua`/`noHp_kedua`. Nilai "kedua" tidak akan tersimpan.

### PUT /api/pesertas/{id}

Semua `sometimes`. Jika `tanggal_selesai` dikirim, `status` dihitung ulang (`finished` bila tanggal
sudah lewat, selain itu `onGoing`). Validasi status memakai `in:finished,ongoing` — nilai `ongoing`
tidak cocok dengan enum/`onGoing` yang dipakai di tempat lain.

## Surat & sertifikat

Pola ketiganya sama (multipart):

### POST /api/surat-balasan · /api/surat-penilaian · /api/sertifikat

Field: `id_peserta` (wajib, ada di tabel `pesertas`) + satu file (`surat_balasan` /
`surat_penilaian` / `sertifikat_magang`, nullable, pdf/jpg/jpeg/png maks 2 MB).

Response `201`:

```json
{ "message": "Berkas Peserta berhasil ditambahkan.", "data": { "id": 1, "id_peserta": 1, "surat_balasan": "berkas_peserta/surat_balasan/xxx.pdf" } }
```

### GET /api/surat-balasan/{id} (juga surat-penilaian, sertifikat)

Response yang diharapkan:

```json
{ "data": { "id": 1, "id_peserta": 1, "surat_balasan": "..." } }
```

**Rusak:** signature `show(SuratBalasanMagang $id)` membuat route model binding mengisi `$id` dengan
objek model, lalu `find($id)` dipanggil dengan objek → error. Ganti menjadi `show($id)`.

### PUT /api/surat-balasan/{id}

Validasi hanya `surat_balasan` (file). Response `200`:

```json
{ "message": "Berhasil memperbarui berkas: surat_balasan diperbarui", "data": {...} }
```

**Sertifikat:** `update` memvalidasi `surat_balasan`, bukan `sertifikat_magang` (copy-paste).
`index/destroy/create/edit` kosong di ketiga controller; tidak ada endpoint daftar surat.

## Endpoint uji ber-middleware

```http
GET /api/admin-only
Authorization: Bearer <token admin>
```
→ `{ "message": "Selamat Datang Admin!" }`

```http
GET /api/user-only
Authorization: Bearer <token user>
```
→ `{ "message": "Halo User Biasa!" }`

Role diambil dari kolom `users.role` (`user` default, `admin` manual di DB). Middleware `role`
didaftarkan sebagai alias di `bootstrap/app.php`.

## Ringkasan masalah kontrak

1. Tidak ada otorisasi pada endpoint bisnis; siapa pun bisa CRUD data pendaftar/peserta/user.
2. Envelope respons tidak konsisten (4 bentuk) → menyulitkan tipe frontend.
3. `show` surat/sertifikat rusak; `update` sertifikat salah field.
4. Nama field peserta tidak konsisten (`*_dua` vs `*_kedua`).
5. `PUT /pendaftars/{id}` tidak bisa dipakai untuk update biasa (file diwajibkan string).
6. Tidak ada pagination/filter; index mengembalikan seluruh tabel.
7. Tidak ada endpoint "data magang saya" berbasis `user_id` (lihat `docs/todo-backend.md`).
8. Tidak ada FormRequest/Resource; validasi dan bentuk output tersebar di controller.
