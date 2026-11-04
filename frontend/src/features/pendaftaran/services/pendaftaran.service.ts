import apiClient from "@/lib/api-client";
import type { ApiEnvelope } from "@/service/types";
import type { PendaftarRecord } from "../types";

/**
 * Data pendaftar milik user yang sedang login.
 * Backend mengembalikan `data: null` bila user belum mengisi form.
 */
export const pendaftaranService = {
  async getMine(): Promise<PendaftarRecord | null> {
    const response = await apiClient.get<
      ApiEnvelope<PendaftarRecord | null>
    >("/me/pendaftar");

    return response.data.data ?? null;
  },
};
