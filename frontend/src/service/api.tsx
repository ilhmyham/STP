import apiClient from "@/lib/api-client";
import type { ApiEnvelope } from "./types";

export const PendaftarService = {
  async getAll<T>(): Promise<T[]> {
    try {
      const response = await apiClient.get<
        ApiEnvelope<T[]>
      >("/pendaftars");
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching pendaftars:",
        error
      );
      throw error;
    }
  },

  async getById<T>(id: number): Promise<T> {
    try {
      const response = await apiClient.get<
        ApiEnvelope<T>
      >(`/pendaftars/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(
        `Error fetching pendaftar with id ${id}:`,
        error
      );
      throw error;
    }
  },

  async create<T>(
    payload: FormData
  ): Promise<ApiEnvelope<T>> {
    const response = await apiClient.post<
      ApiEnvelope<T>
    >("/pendaftars", payload);
    return response.data;
  },

  async updateStatus<T>(
    id: number,
    status: string
  ): Promise<T> {
    try {
      const response = await apiClient.put<
        ApiEnvelope<T>
      >(`/pendaftars/${id}/update-status`, {
        status,
      });
      return response.data.data;
    } catch (error) {
      console.error(
        `Error updating status for pendaftar ${id}:`,
        error
      );

      throw error;
    }
  },

  async getPesertaById<T>(id: number): Promise<T> {
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
};

export const PersertasService = {};
