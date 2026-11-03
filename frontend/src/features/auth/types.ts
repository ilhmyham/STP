import type { ChangeEvent, FormEvent } from "react";

export interface Session {
  token: string;
  role: string;
  userId: string;
}

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export interface LoginResponse {
  status: boolean;
  message?: string;
  token?: string;
  role?: string;
  user_id?: number | string;
}

export interface RegisterResponse {
  status: boolean;
  message?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginOptions {
  /** Tolak sesi jika role hasil login tidak sesuai (mis. halaman admin). */
  requiredRole?: string;
}

export interface AuthResult {
  ok: boolean;
  role?: string;
  message?: string;
}

export interface AuthFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthFormErrors {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  general: string;
}

export interface AuthFormViewProps {
  isLogin: boolean;
  formData: AuthFormValues;
  errors: AuthFormErrors;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleMode: () => void;
}

export interface AppProviderType {
  isLoading: boolean;
  isAuthenticated: boolean;
  userId: string | null;
  authToken: string | null;
  userRole: string | null;
  login: (
    email: string,
    password: string,
    options?: LoginOptions
  ) => Promise<AuthResult>;
  register: (payload: RegisterPayload) => Promise<AuthResult>;
  logout: () => void;
}
