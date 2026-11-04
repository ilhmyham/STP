import axios from "axios";
import apiClient from "@/lib/api-client";
import type {
  BerkasPesertaResponse,
  BerkasPesertaType,
} from "./types";

/**
 * Nama field di form mengikuti nama kolom backend, sedangkan path endpoint
 * untuk sertifikat memakai nama tunggal `sertifikat`.
 */
const ENDPOINT: Record<BerkasPesertaType, string> = {
  surat_balasan: "surat-balasan",
  surat_penilaian: "surat-penilaian",
  sertifikat_magang: "sertifikat",
};

export function isBerkasPesertaType(
  value: string
): value is BerkasPesertaType {
  return (
    value === "surat_balasan" ||
    value === "surat_penilaian" ||
    value === "sertifikat_magang"
  );
}

/**
 * Ambil pesan error yang bisa ditampilkan ke pengguna. Laravel mengirim
 * `errors` untuk 422 dan `message` untuk error lain; tanpa respons (server
 * mati) tampilkan pesan koneksi.
 */
export function getBerkasPesertaErrorMessage(
  error: unknown
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as
      | {
          message?: unknown;
          errors?: Record<string, string[]>;
        }
      | undefined;

    const firstValidationError = data?.errors
      ? Object.values(data.errors)[0]?.[0]
      : undefined;

    if (
      typeof firstValidationError === "string" &&
      firstValidationError.trim()
    ) {
      return firstValidationError;
    }

    if (
      typeof data?.message === "string" &&
      data.message.trim()
    ) {
      return data.message;
    }

    if (error.response?.status === 413) {
      return "Ukuran file terlalu besar.";
    }

    if (!error.response) {
      return "Tidak dapat terhubung ke server. Pastikan backend berjalan.";
    }
  }

  return "Gagal mengunggah dokumen.";
}

export const berkasPesertaService = {
  async upload(
    type: BerkasPesertaType,
    idPeserta: string | number,
    file: File
  ): Promise<BerkasPesertaResponse> {
    const formData = new FormData();
    formData.append(type, file);
    formData.append("id_peserta", String(idPeserta));

    const response = await apiClient.post<
      BerkasPesertaResponse
    >(`/${ENDPOINT[type]}`, formData);

    return response.data;
  },

  /**
   * Backend hanya menyediakan `PUT`, sedangkan upload file memakai
   * `multipart/form-data`. Method diemulasikan lewat `_method=PUT`.
   */
  async update(
    type: BerkasPesertaType,
    idBerkas: number,
    file: File
  ): Promise<BerkasPesertaResponse> {
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append(type, file);

    const response = await apiClient.post<
      BerkasPesertaResponse
    >(`/${ENDPOINT[type]}/${idBerkas}`, formData);

    return response.data;
  },
};
