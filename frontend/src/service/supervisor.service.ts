export interface SupervisorData {
  name: string;
  phone: string;
  email: string;
}

/**
 * Data supervisor masih mock/placeholder.
 * TODO: ganti ke endpoint Laravel (lihat docs/todo-backend.md).
 */
export const supervisorService = {
  async getByPeserta(
    id: string
  ): Promise<SupervisorData> {
    const response = await fetch(
      `/api/supervisor/${id}`
    );
    return (await response.json()) as SupervisorData;
  },
};
