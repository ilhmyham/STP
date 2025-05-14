import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    // Tambahkan header lain jika diperlukan (seperti Authorization)
  },
});

export const pesertaService = {
  async getAll() {
    try {
      const response = await api.get("/pesertas");
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching pesertas:",
        error
      );
      throw error;
    }
  },

  async getById(id: number) {
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

  async updateStatus(id: number, status: string) {
    try {
      const response = await api.post(
        `/pesertas/${id}/update-status`,
        { status }
      );
      console.log(response);
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
