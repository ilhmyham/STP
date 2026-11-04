import axios from "axios";

export interface ApiErrorPayload {
  status?: number;
  errors?: Record<string, string[]>;
  data: unknown;
}

/**
 * Normalisasi error axios tanpa memakai `any`.
 * Mengembalikan `null` jika error bukan berasal dari request HTTP.
 */
export function getApiError(
  error: unknown
): ApiErrorPayload | null {
  if (!axios.isAxiosError(error)) return null;

  const data: unknown = error.response?.data;
  let errors: Record<string, string[]> | undefined;

  if (
    data &&
    typeof data === "object" &&
    "errors" in data &&
    (data as { errors?: unknown }).errors &&
    typeof (data as { errors?: unknown }).errors ===
      "object"
  ) {
    errors = (data as {
      errors: Record<string, string[]>;
    }).errors;
  }

  return {
    status: error.response?.status,
    errors,
    data,
  };
}
