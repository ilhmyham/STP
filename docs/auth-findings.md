# Auth Findings & Decisions

> Ringkasan temuan auth sebelum refactor dan keputusan yang diambil.
> Implementasi ada di `frontend/src/features/auth/`.

## Temuan

- Ada **tiga mekanisme guard** yang tumpang tindih: `AppProviders`, `ProtectRoute` per-layout, dan `middleware.ts` yang tidak pernah aktif.
- Hanya `/user/auth` yang benar-benar bisa login. `/user/login` dan `/admin/login` memanggil `fetch("/api/login")`, padahal route itu tidak ada (404).
- `/admin/login` **tidak bisa diakses tanpa token** karena berada di bawah `ProtectRoute(['admin'])`; admin yang belum login tidak punya jalan masuk.
- `/user/auth` berada di bawah `user/layout`, sehingga `ProtectRoute(['user'])` melakukan redirect ke URL yang sama (bukan loop, tetapi sia-sia).
- `admin/layout` memasang `AppProvider` kedua (provider bersarang) sehingga guard berjalan dua kali.
- `login()` menelan error dan tidak mengembalikan hasil; kredensial salah (HTTP 200 + `status:false`) tidak menampilkan pesan apa pun.
- `ProtectRoute` merender `children` saat unauthorized, sehingga konten sempat berkedip sebelum redirect.
- `middleware.ts` memakai cookie `auth-token` (bukan `authToken`), matcher `"user/profile/"` tidak valid, dan redirect ke `/login` yang tidak ada.

## Keputusan

1. **Satu provider** (`features/auth/components/AuthProvider.tsx`): hanya menghidrasi sesi dan menyediakan `login`/`register`/`logout` lewat hook `useAuthSession`. Tidak melakukan redirect saat hidrasi; redirect hanya setelah login/logout.
2. **Satu guard** (`features/auth/components/AuthGuard.tsx`) dipasang di root layout. Aturan path:
   - publik: `/`, `/user/auth` (termasuk sub-path), `/user/login`, `/admin/login`
   - `/admin/*` → `admin`
   - `/user/*` → `user`
   - role salah → halaman utama role-nya; tanpa sesi → halaman login.
3. **Satu modul cookie** (`features/auth/lib/session.ts`). Nama cookie `authToken`/`userRole`/`userId`, masa berlaku 7 hari, dan URL dipertahankan.
4. `/user/auth` tetap pintu utama. `/user/login` sekarang redirect ke `/user/auth` (UI lama yang mati dihapus).
5. `/admin/login` dipertahankan dengan tampilan sama, disambungkan ke `auth.service`; role selain admin ditolak dan sesi tidak disimpan.
6. `middleware.ts` dihapus.
7. 401: admin → `/admin/login`, user → `/user/auth`.
8. Kredensial salah menampilkan pesan generik **"Email atau password salah"** memakai elemen error yang sudah ada (tidak ada UI baru).
