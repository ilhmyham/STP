import Cookies from "js-cookie";
import type { Session } from "../types";

/**
 * Satu-satunya modul yang boleh membaca/menulis cookie sesi.
 * Nama cookie, masa berlaku (7 hari), dan path dipertahankan dari implementasi
 * sebelumnya agar sesi yang sudah ada tetap terbaca.
 */
export const AUTH_TOKEN_COOKIE = "authToken";
export const AUTH_ROLE_COOKIE = "userRole";
export const AUTH_USER_ID_COOKIE = "userId";

const COOKIE_OPTIONS = {
  expires: 7,
  path: "/",
};

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;

  const token = Cookies.get(AUTH_TOKEN_COOKIE);
  if (!token) return null;

  return {
    token,
    role: Cookies.get(AUTH_ROLE_COOKIE) ?? "",
    userId: Cookies.get(AUTH_USER_ID_COOKIE) ?? "",
  };
}

export function getSessionRole(): string | null {
  if (typeof window === "undefined") return null;
  return Cookies.get(AUTH_ROLE_COOKIE) ?? null;
}

export function saveSession(session: Session): void {
  if (typeof window === "undefined") return;

  Cookies.set(AUTH_TOKEN_COOKIE, session.token, COOKIE_OPTIONS);
  Cookies.set(AUTH_ROLE_COOKIE, session.role, COOKIE_OPTIONS);
  Cookies.set(AUTH_USER_ID_COOKIE, session.userId, COOKIE_OPTIONS);
}

export function clearSession(): void {
  if (typeof window === "undefined") return;

  Cookies.remove(AUTH_TOKEN_COOKIE, { path: "/" });
  Cookies.remove(AUTH_ROLE_COOKIE, { path: "/" });
  Cookies.remove(AUTH_USER_ID_COOKIE, { path: "/" });
}
