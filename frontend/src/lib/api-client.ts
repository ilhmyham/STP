import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

/**
 * Instance axios tunggal untuk seluruh aplikasi.
 *
 * - `baseURL` diambil dari `NEXT_PUBLIC_API_URL` (backend Laravel `/api`).
 * - Request interceptor menambahkan bearer token dari cookie `authToken`.
 * - Response interceptor menangani 401: bersihkan sesi lalu arahkan ke login.
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

const TOKEN_COOKIE = "authToken";
const ROLE_COOKIE = "userRole";
const USER_ID_COOKIE = "userId";
const LOGIN_PATH = "/user/auth";

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Cookie hanya tersedia di browser; request dari server tetap berjalan
    // tanpa header Authorization.
    if (typeof window !== "undefined") {
      const token = Cookies.get(TOKEN_COOKIE);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const isUnauthorized = error.response?.status === 401;

    if (isUnauthorized && typeof window !== "undefined") {
      Cookies.remove(TOKEN_COOKIE);
      Cookies.remove(ROLE_COOKIE);
      Cookies.remove(USER_ID_COOKIE);

      // Hindari redirect berulang saat halaman login memanggil endpoint yang
      // juga mengembalikan 401.
      if (window.location.pathname !== LOGIN_PATH) {
        window.location.href = LOGIN_PATH;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
