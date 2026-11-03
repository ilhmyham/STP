"use client";

/**
 * @deprecated Guard aktif sekarang adalah features/auth/components/AuthGuard yang
 * dipasang di root layout. File ini dipertahankan sebagai alias agar tidak
 * menghapus kode yang belum tersambung (lihat docs/unwired-features.md).
 */
export { AuthGuard as ProtectRoute } from "@/features/auth/components/AuthGuard";
