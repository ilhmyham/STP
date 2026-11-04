export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

export interface JenjangPendidikan {
  id: number;
  pendidikan: string;
}

export interface BidangPeminatan {
  id: number;
  nama_bidang: string;
}

export interface PesertaCreatePayload {
  pendaftar_id: number;
  tanggal: string;
  tanggal_selesai: string;
  mentor: string;
  mentor_kedua?: string;
  noHp: string;
  noHp_kedua?: string;
  email: string;
  email_kedua?: string;
  bidang_peminatan_id: string | number;
  status?: string;
}

export interface PesertaUpdatePayload {
  mentor?: string;
  mentor_kedua?: string;
  noHp?: string;
  noHp_kedua?: string;
  email?: string;
  email_kedua?: string;
  bidang_peminatan_id?: string | number;
  tanggal?: string;
  tanggal_selesai?: string;
}

export type BerkasPesertaType =
  | "surat_balasan"
  | "surat_penilaian"
  | "sertifikat_magang";

export interface BerkasPesertaResponse {
  message?: string;
  data?: unknown;
}
