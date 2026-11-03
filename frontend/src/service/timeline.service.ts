// Service data timeline magang.
// Sumber sementara: mock route /api/timeline/[id].
// TODO: ganti ke endpoint user-scoped Laravel (lihat docs/todo-backend.md).

export type StatusPendaftaran =
  | "uncheck"
  | "diterima"
  | "ditolak";

// Bentuk respons mentah, sama dengan yang kelak dikembalikan Laravel.
export interface TimelineMagangResponse {
  success: boolean;
  data: {
    status: StatusPendaftaran;
    tanggal: string | null;
    tanggal_selesai: string | null;
  };
}

// Bentuk data yang dipakai komponen TimelineMagang.
export interface TimelineMagangData {
  statusPendaftaran: boolean;
  tanggalMulai: string;
  tanggalSelesai: string | null;
}

export const timelineService = {
  async getTimeline(
    id: string
  ): Promise<TimelineMagangData> {
    // TODO: ganti ke endpoint user-scoped Laravel.
    const response = await fetch(
      `/api/timeline/${id}`
    );

    if (!response.ok) {
      throw new Error(
        `Gagal mengambil data timeline (${response.status})`
      );
    }

    const json: TimelineMagangResponse =
      await response.json();

    // Aturan konversi status -> boolean:
    // "diterima" = true, selain itu (uncheck/ditolak) = false.
    return {
      statusPendaftaran: json.data.status === "diterima",
      tanggalMulai: json.data.tanggal ?? "",
      tanggalSelesai: json.data.tanggal_selesai ?? null,
    };
  },
};
