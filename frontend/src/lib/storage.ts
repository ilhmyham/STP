/**
 * URL publik untuk file yang disimpan di disk `public` backend
 * (`storage/app/public`, diakses lewat symlink `/storage`).
 *
 * Default mengikuti `NEXT_PUBLIC_API_URL` (buang akhiran `/api`) agar cukup
 * satu variabel environment untuk development. `NEXT_PUBLIC_STORAGE_URL`
 * dapat dipakai bila file disajikan dari host/CDN berbeda.
 */
function resolveStorageUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_STORAGE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (apiUrl) {
    return `${apiUrl.replace(/\/api\/?$/, "").replace(/\/+$/, "")}/storage`;
  }

  return "http://127.0.0.1:8000/storage";
}

export const STORAGE_URL = resolveStorageUrl();

/** Bangun URL file dari path relatif yang disimpan backend. */
export function storageFileUrl(
  path?: string | null
): string | undefined {
  if (!path) return undefined;
  return `${STORAGE_URL}/${path.replace(/^\/+/, "")}`;
}
