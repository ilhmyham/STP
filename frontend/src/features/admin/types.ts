export type PendaftarStatus =
  | "uncheck"
  | "diterima"
  | "ditolak";

export interface ApiPendaftar {
  id_pendaftar: number;
  created_at: string;
  nama: string;
  status: PendaftarStatus;
  bidang_peminatan: { nama_bidang: string };
}

export interface PendaftarRow {
  id: number;
  no: number;
  tanggal: string;
  nama: string;
  status: PendaftarStatus;
  divisi: string;
}

export type PesertaStatus = "On Going" | "Finished";

export interface PesertaRow {
  id: number;
  status: PesertaStatus;
  mentor: string;
  bidang_peminatan_id: number;
  bidang_peminatan: { nama_bidang: string } | null;
  pendaftar: { nama: string } | null;
}
