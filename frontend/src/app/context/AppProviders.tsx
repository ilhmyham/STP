"use client";

/**
 * Titik impor lama dipertahankan agar halaman yang sudah ada tidak perlu
 * diubah. Implementasi tunggal ada di features/auth/components/AuthProvider.
 */
export {
  AuthProvider as AppProvider,
  useAuth,
  useMyApp,
} from "@/features/auth/components/AuthProvider";
