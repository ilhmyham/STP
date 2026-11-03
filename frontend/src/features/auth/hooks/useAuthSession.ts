"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  authService,
  getApiErrorMessage,
  isCredentialError,
} from "../services/auth.service";
import { clearSession, getSession, saveSession } from "../lib/session";
import { loginPath, roleHome } from "../lib/routes";
import type {
  AppProviderType,
  AuthResult,
  AuthStatus,
  LoginOptions,
  RegisterPayload,
  Session,
} from "../types";

const INVALID_CREDENTIALS_MESSAGE = "Email atau password salah";
const GENERIC_ERROR_MESSAGE = "Terjadi kesalahan, coba lagi nanti";

/**
 * Sumber tunggal state sesi + aksi auth.
 * Tidak melakukan redirect otomatis saat hidrasi; hanya setelah login/logout.
 */
export function useAuthSession(): AppProviderType {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = getSession();

    if (stored?.token && stored.role) {
      setSession(stored);
      setStatus("authenticated");
    } else {
      setSession(null);
      setStatus("unauthenticated");
    }
  }, []);

  const login = async (
    email: string,
    password: string,
    options?: LoginOptions
  ): Promise<AuthResult> => {
    try {
      const data = await authService.login(email, password);

      if (!data.status || !data.token || !data.role) {
        return { ok: false, message: INVALID_CREDENTIALS_MESSAGE };
      }

      if (options?.requiredRole && data.role !== options.requiredRole) {
        // Jangan simpan sesi jika role tidak sesuai halaman login.
        return { ok: false, message: INVALID_CREDENTIALS_MESSAGE };
      }

      const nextSession: Session = {
        token: data.token,
        role: data.role,
        userId: data.user_id !== undefined ? String(data.user_id) : "",
      };

      saveSession(nextSession);
      setSession(nextSession);
      setStatus("authenticated");

      // Biarkan state provider tersimpan dulu sebelum guard mengevaluasi route.
      setTimeout(() => router.replace(roleHome(data.role)), 0);

      return { ok: true, role: data.role };
    } catch (error) {
      return {
        ok: false,
        message: isCredentialError(error)
          ? INVALID_CREDENTIALS_MESSAGE
          : GENERIC_ERROR_MESSAGE,
      };
    }
  };

  const register = async (
    payload: RegisterPayload
  ): Promise<AuthResult> => {
    try {
      const data = await authService.register(payload);

      if (!data.status) {
        return {
          ok: false,
          message: data.message || "Pendaftaran gagal",
        };
      }

      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message: getApiErrorMessage(
          error,
          "Pendaftaran gagal. Periksa kembali data Anda."
        ),
      };
    }
  };

  const logout = () => {
    const role = session?.role ?? null;

    clearSession();
    setSession(null);
    setStatus("unauthenticated");

    setTimeout(() => router.replace(loginPath(role)), 0);
  };

  return {
    login,
    register,
    logout,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
    authToken: session?.token ?? null,
    userRole: session?.role ?? null,
    userId: session?.userId ?? null,
  };
}
