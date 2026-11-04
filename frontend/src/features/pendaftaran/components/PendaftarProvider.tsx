"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "@/features/auth/components/AuthProvider";
import { pendaftaranService } from "../services/pendaftaran.service";
import type {
  PendaftarRecord,
  PendaftarState,
} from "../types";

export interface PendaftarContextValue {
  pendaftar: PendaftarRecord | null;
  status: PendaftarState;
  isLoading: boolean;
  hasPendaftar: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const PendaftarContext =
  createContext<
    PendaftarContextValue | undefined
  >(undefined);

/**
 * Mengambil sekali data pendaftar milik user login dan membagikannya ke
 * navbar, sidebar profil, serta halaman yang bergantung pada data form.
 */
export function PendaftarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const [pendaftar, setPendaftar] =
    useState<PendaftarRecord | null>(null);
  const [status, setStatus] =
    useState<PendaftarState>("loading");
  const [error, setError] = useState<string | null>(
    null
  );

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setPendaftar(null);
      setError(null);
      setStatus("unregistered");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const data = await pendaftaranService.getMine();
      setPendaftar(data);
      setStatus(data ? "registered" : "unregistered");
    } catch (err) {
      console.error(
        "Gagal memuat data pendaftaran:",
        err
      );
      setPendaftar(null);
      setError("Gagal memuat data pendaftaran.");
      setStatus("error");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<PendaftarContextValue>(
    () => ({
      pendaftar,
      status,
      isLoading: status === "loading",
      hasPendaftar: status === "registered",
      error,
      refresh,
    }),
    [pendaftar, status, error, refresh]
  );

  return (
    <PendaftarContext.Provider value={value}>
      {children}
    </PendaftarContext.Provider>
  );
}
