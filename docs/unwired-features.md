# Unwired Features

Kode yang belum tersambung dan sengaja tidak dihapus (sesuai `frontend/CLAUDE.md`).

- `frontend/src/components/ProtectRoute.tsx` — tidak dipakai layout lagi.
  Sekarang hanya re-export `AuthGuard` dari `features/auth/components/AuthGuard.tsx`.
  Guard aktif dipasang sekali di root layout.
