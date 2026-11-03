import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { clearSession, getSession } from "@/features/auth/lib/session";
import { isAuthPage, loginPath } from "@/features/auth/lib/routes";

/**
 * Instance axios tunggal untuk seluruh aplikasi.
 *
 * - `baseURL` diambil dari `NEXT_PUBLIC_API_URL` (backend Laravel `/api`).
 * - Request interceptor menambahkan bearer token dari modul sesi auth.
 * - Response interceptor menangani 401: bersihkan sesi lalu arahkan ke login
 *   sesuai role (admin -> /admin/login, user -> /user/auth).
 *
 * Catatan: `Content-Type` sengaja tidak di-set di sini agar axios otomatis
 * memakai `multipart/form-data` (beserta boundary) saat body berupa FormData.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Cookie hanya tersedia di browser; request dari server tetap berjalan
    // tanpa header Authorization.
    const token = getSession()?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized && typeof window !== "undefined") {
      const role = getSession()?.role ?? null;
      clearSession();

      // Hindari redirect berulang saat sudah berada di halaman login.
      if (!isAuthPage(window.location.pathname)) {
        window.location.href = loginPath(role);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
