import axios from "axios";
import apiClient from "@/lib/api-client";
import type {
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../types";

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/login", {
      email,
      password,
    });
    return response.data;
  },

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await apiClient.post<RegisterResponse>(
      "/register",
      payload
    );
    return response.data;
  },
};

/** Error 401/422 dianggap gagal kredensial agar pesannya tetap generik. */
export function isCredentialError(error: unknown): boolean {
  return (
    axios.isAxiosError(error) &&
    (error.response?.status === 401 || error.response?.status === 422)
  );
}

/** Ambil pesan error Laravel jika ada, tanpa memakai `any`. */
export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: unknown } | undefined;
    if (data && typeof data.message === "string" && data.message.trim()) {
      return data.message;
    }
  }
  return fallback;
}
