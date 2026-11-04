import apiClient from "@/lib/api-client";
import type {
  BidangPeminatan,
  JenjangPendidikan,
} from "./types";

/**
 * Master data pendidikan & bidang peminatan.
 * Kedua endpoint mengembalikan array langsung (bukan envelope `data`).
 */
export const jenjangPendidikanService = {
  async getAll(): Promise<JenjangPendidikan[]> {
    const response = await apiClient.get<
      JenjangPendidikan[]
    >("/jenjangPendidikans");
    return response.data;
  },
};

export const bidangPeminatanService = {
  async getAll(): Promise<BidangPeminatan[]> {
    const response = await apiClient.get<
      BidangPeminatan[]
    >("/bidangPeminatans");
    return response.data;
  },
};
