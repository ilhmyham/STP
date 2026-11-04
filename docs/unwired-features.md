# Unwired Features

Kode yang belum tersambung dan sengaja tidak dihapus (sesuai `frontend/CLAUDE.md`).

- `frontend/src/components/ProtectRoute.tsx` — tidak dipakai layout lagi.
  Sekarang hanya re-export `AuthGuard` dari `features/auth/components/AuthGuard.tsx`.
  Guard aktif dipasang sekali di root layout.
- `frontend/src/components/profilesidebar/page.tsx` — tidak diimpor di mana pun
  setelah profil dipindahkan ke `features/profile/`. Dipertahankan sebagai alias
  re-export `ProfileSidebar`.
- `frontend/src/app/admin/infopendaftar/page.tsx` (486 baris) dan
  `frontend/src/app/admin/users/datapeserta/page.tsx` (588 baris) — halaman
  detail placeholder tanpa link masuk (hanya bisa dibuka lewat URL langsung).
  Keduanya salinan detail lama; `infopendaftar/page.tsx` memakai `useParams`
  tanpa `[id]` sehingga selalu memuat data kosong. **Keputusan langkah #8:**
  tidak dipecah dan tidak dihapus, karena tidak terjangkau dari UI dan bukan
  bagian alur aktif. Jika nanti dihubungkan kembali, pecah memakai komponen
  `features/admin/infopendaftar` / `features/admin/peserta` yang sudah ada.
