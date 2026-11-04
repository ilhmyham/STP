"use client";

import { useContext } from "react";
import { PendaftarContext } from "../components/PendaftarProvider";

/** Membaca status pendaftaran user dari provider di layout /user. */
export function usePendaftarStatus() {
  const context = useContext(PendaftarContext);

  if (!context) {
    throw new Error(
      "usePendaftarStatus harus dipakai di dalam PendaftarProvider."
    );
  }

  return context;
}
