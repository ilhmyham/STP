import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    // Tambahkan header lain jika diperlukan (seperti Authorization)
  },
});

export const PendaftarService = {
  async getAll() {
    try {
      const response = await api.get(
        "/pendaftars"
      );
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching pendaftars:",
        error
      );
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(
        `/pendaftars/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error(
        `Error fetching pendaftar with id ${id}:`,
        error
      );
      throw error;
    }
  },

  async updateStatus(id: number, status: string) {
    try {
      const response = await api.put(
        `/pendaftars/${id}/update-status`,
        { status }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error(
        `Error updating status for pendaftar ${id}:`,
        error
      );

      throw error;
    }
  },

  async getPesertaById(id: number) {
    try {
      const response = await api.get(
        `/pesertas/${id}`
      );
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
