export type ApplicationStatus =
  | "diterima"
  | "ditolak"
  | "diproses"
  | "loading";

export interface StatusPenerimaanResponse {
  status: ApplicationStatus;
}

/**
 * Status penerimaan masih memakai route internal Next
 * (`/api/statuspenerimaan/{id}`) yang belum tersedia.
 * TODO: ganti ke endpoint Laravel (lihat docs/todo-backend.md).
 */
export const statusPenerimaanService = {
  async getStatus(
    id: string
  ): Promise<ApplicationStatus> {
    const response = await fetch(
      `/api/statuspenerimaan/${id}`
    );
    const data =
      (await response.json()) as StatusPenerimaanResponse;
    return data.status;
  },
};
