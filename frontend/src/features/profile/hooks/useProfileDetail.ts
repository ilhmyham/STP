"use client";

import { useMemo } from "react";
import { usePendaftarStatus } from "@/features/pendaftaran/hooks/usePendaftarStatus";
import { toProfileDetail } from "../lib/pendaftarProfile";
import type { ProfileDetail } from "../types";

/** Detail profil diambil dari data pendaftar milik user login. */
export function useProfileDetail() {
  const { pendaftar, status, error } =
    usePendaftarStatus();

  const userData = useMemo<ProfileDetail | null>(
    () =>
      pendaftar
        ? toProfileDetail(pendaftar)
        : null,
    [pendaftar]
  );

  return {
    userData,
    isLoading: status === "loading",
    error: status === "error" ? error : null,
  };
}
