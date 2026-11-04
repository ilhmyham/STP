# Akun Development (Lokal)

> **HANYA UNTUK LINGKUNGAN LOCAL / DEVELOPMENT.**
> Seeder tidak membuat data apa pun jika `APP_ENV` bukan `local`
> (`DatabaseSeeder` memeriksa `app()->environment('local')`).
> Jangan jalankan `migrate:fresh` atau seeder ini di staging/production.

## Akun uji

| Peran | Email | Password | Role |
| --- | --- | --- | --- |
| Admin | `admin@test.com` | `password123` | `admin` |
| User | `user1@test.com` | `password123` | `user` |
| User | `user2@test.com` | `password123` | `user` |
| User | `user3@test.com` | `password123` | `user` |

`user1@test.com` sudah terhubung ke pendaftar berstatus `diterima` dan punya
data peserta magang (peserta #1, status `onGoing`).

### Akun pelamar tambahan

Karena kolom `pendaftars.user_id` bersifat unik, 10 pendaftar membutuhkan 10
user. Tujuh akun berikut dibuat otomatis sebagai pelamar, bukan akun uji utama
(semua role `user`, password sama):

| Email |
| --- |
| `pelamar4@test.com` |
| `pelamar5@test.com` |
| `pelamar6@test.com` |
| `pelamar7@test.com` |
| `pelamar8@test.com` |
| `pelamar9@test.com` |
| `pelamar10@test.com` |

## Data yang di-seed

| Tabel | Jumlah | Keterangan |
| --- | --- | --- |
| `users` | 11 | 1 admin + 10 user (3 akun uji + 7 pelamar) |
| `jenjang_pendidikans` | 4 | D3, D4, S1, S2 |
| `bidang_peminatans` | 6 | Web, Mobile, Data Science, UI/UX, Digital Marketing, Cyber Security |
| `pendaftars` | 10 | 5 `diterima`, 3 `uncheck`, 2 `ditolak` |
| `berkas_pendaftars` | 10 | satu per pendaftar |
| `pesertas` | 5 | hanya dari pendaftar `diterima`; 3 `onGoing`, 2 `finished` |
| `berkas_pesertas` | 5 | satu per peserta |
| `surat_balasan_magangs` | 5 | satu per peserta |
| `surat_penilaians` | 5 | satu per peserta |
| `sertifikat_magangs` | 5 | satu per peserta |

Semua kolom berkas diisi path contoh (mis.
`seed/peserta/1/surat-balasan.pdf`). Seeder juga membuat **file PDF contoh
yang benar-benar ada** di `storage/app/public/seed/...`, sehingga tombol
lihat/unduh berkas seed bisa dibuka (HTTP 200) setelah `storage:link`.
File contoh hanya dibuat di environment `local`.

## Cara menjalankan

Dari folder `backend/`:

```bash
# Reset total (hapus semua tabel lalu seed ulang) — hanya untuk lokal
php artisan migrate:fresh --seed

# Seed tanpa menghapus tabel
php artisan db:seed

# Seed satu seeder saja
php artisan db:seed --class=UserSeeder
```

Seeder memakai `updateOrCreate` untuk akun, data master, pendaftar, peserta,
dan berkas, sehingga **aman dijalankan berulang** tanpa membuat baris ganda.

### Catatan environment lokal ini

`php.ini` di mesin ini sudah diaktifkan `extension=pdo_mysql` dan
`extension=fileinfo`, jadi perintah `php artisan ...` biasa sudah bisa dipakai.
Jika memakai PHP lain dan muncul `could not find driver`, aktifkan
`extension=pdo_mysql` (dan `extension=fileinfo`) di `php.ini` PHP tersebut.

Pastikan juga `APP_KEY` sudah terisi. Jika masih kosong, jalankan sekali dari
folder `backend/`:

```bash
php artisan key:generate
```

Tanpa `APP_KEY`, request yang melewati middleware web (mis. membuka file
`/storage/...`) bisa gagal dengan error 500.

Pada PHP 8.5 + OPcache di Windows, `php artisan serve` dapat gagal dengan
`Opcode handlers are unusable due to ASLR`. Solusinya aktifkan cache file
OPcache di `php.ini`:

```ini
opcache.file_cache="C:\path\ke\folder\cache"
opcache.file_cache_fallback=1
```

## Menjalankan backend & frontend

Frontend memanggil backend lewat `NEXT_PUBLIC_API_URL`. Buat
`frontend/.env.local` (diabaikan git) berisi:

```bash
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api
```

URL file publik (`/storage/...`) otomatis diturunkan dari variabel di atas.
Jika file disajikan dari host lain, tambahkan `NEXT_PUBLIC_STORAGE_URL`
(mis. `http://127.0.0.1:8000/storage`).

Sekali saja, dari folder `backend/`, buat symlink agar file di
`storage/app/public` dapat diakses lewat `/storage`:

```bash
php artisan storage:link
```

Lalu jalankan dua terminal:

```bash
# Terminal 1 — backend (http://127.0.0.1:8000)
cd backend
php artisan serve

# Terminal 2 — frontend (http://localhost:3000)
cd frontend
npm run dev
```

Buka `http://localhost:3000/user/auth`, lalu login dengan akun di atas.
Jika `.env.local` baru dibuat/diubah, **restart** `npm run dev` agar nilainya
terbaca.

Alur login: frontend → `POST /api/login` → token disimpan di cookie
`authToken`/`userRole`/`userId` → redirect ke beranda sesuai role.
Kredensial salah (HTTP 200, `status: false`) ditampilkan sebagai
"Email atau password salah"; gangguan jaringan/server ditampilkan sebagai
"Terjadi kesalahan, coba lagi nanti".

### Dokumen & unggahan

- Seeder membuat file PDF contoh sungguhan di `storage/app/public/seed/...`,
  jadi tombol **Lihat Dokumen** pada data seed bisa dibuka setelah
  `php artisan storage:link` (HTTP 200).
- Berkas peserta (surat balasan, surat penilaian, sertifikat) menerima
  `pdf`, `doc`, `docx`, `jpg`, `jpeg`, `png` dengan ukuran maksimal **10 MB**.
- Batas PHP terkait sudah dinaikkan di mesin ini:
  `upload_max_filesize=20M`, `post_max_size=25M`.
- Halaman admin menampilkan pesan validasi dari server (mis. ukuran terlalu
  besar atau format tidak didukung) alih-alih hanya log konsol.

### Catatan kompatibilitas PHP 8.5

`backend/config/database.php` memakai `Pdo\Mysql::ATTR_SSL_CA` bila tersedia
(fallback ke `PDO::MYSQL_ATTR_SSL_CA` untuk PHP < 8.4). Tanpa ini, notice
deprecation PHP 8.5 tercetak di body respons dan membuat JSON login tidak
valid.

## Urutan seeding

`DatabaseSeeder` memanggil seeder dengan urutan yang mengikuti foreign key:

1. `MasterDataSeeder` — `jenjang_pendidikans`, `bidang_peminatans`
2. `UserSeeder` — `users`
3. `PendaftarSeeder` — `pendaftars` + `berkas_pendaftars`
4. `PesertaSeeder` — `pesertas` + `berkas_pesertas` + surat/sertifikat

## File terkait

- Factory: `database/factories/*Factory.php`
- Seeder: `database/seeders/{Database,MasterData,User,Pendaftar,Peserta}Seeder.php`
