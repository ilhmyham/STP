export interface PenempatanData {
  divisi: string;
  tanggalMulai: string;
}

/**
 * Data penempatan masih mock/placeholder.
 * TODO: ganti ke endpoint Laravel (lihat docs/todo-backend.md).
 */
export const penempatanService = {
  async getByPeserta(
    id: string
  ): Promise<PenempatanData> {
    const response = await fetch(
      `/api/penempatan/${id}`
    );
    return (await response.json()) as PenempatanData;
  },
};
