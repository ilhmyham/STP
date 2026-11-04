import apiClient from "@/lib/api-client";
import type {
  ApiEnvelope,
  PesertaCreatePayload,
  PesertaUpdatePayload,
} from "./types";

export const pesertaService = {
  async getAll<T>(): Promise<T[]> {
    try {
      const response = await apiClient.get<
        ApiEnvelope<T[]>
      >("/pesertas");
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching pesertas:",
        error
      );
      throw error;
    }
  },

  async getById<T>(
    id: number | string
  ): Promise<T> {
    try {
      const response = await apiClient.get<
        ApiEnvelope<T>
      >(`/pesertas/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(
        `Error fetching peserta with id ${id}:`,
        error
      );
      throw error;
    }
  },

  async create<T>(
    payload: PesertaCreatePayload
  ): Promise<T> {
    const response = await apiClient.post<
      ApiEnvelope<T>
    >("/pesertas", payload);
    return response.data.data;
  },

  async update<T = unknown>(
    id: number | string,
    payload: PesertaUpdatePayload
  ): Promise<T> {
    const response = await apiClient.put<
      ApiEnvelope<T>
    >(`/pesertas/${id}`, payload);
    return response.data.data;
  },

  async updateStatus<T>(
    id: number,
    status: string
  ): Promise<T> {
    try {
      const response = await apiClient.post<
        ApiEnvelope<T>
      >(`/pesertas/${id}/update-status`, {
        status,
      });
      return response.data.data;
    } catch (error) {
      console.error(
        `Error updating status for peserta ${id}:`,
        error
      );

      throw error;
    }
  },
};

export const PersertaService = {};
