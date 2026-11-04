"use client";

import { useMemo } from "react";
import { usePendaftarStatus } from "@/features/pendaftaran/hooks/usePendaftarStatus";
import { toProfileSummary } from "../lib/pendaftarProfile";
import type { ProfileSummary } from "../types";

/** Ringkasan sidebar profil diambil dari data pendaftar user login. */
export function useProfileSummary() {
  const { pendaftar, isLoading } =
    usePendaftarStatus();

  const userData = useMemo<ProfileSummary | null>(
    () =>
      pendaftar
        ? toProfileSummary(pendaftar)
        : null,
    [pendaftar]
  );

  return { userData, isLoading };
}
