import type {
  PendaftarInfo,
  PendaftarUploadedFiles,
  UploadedFile,
} from "../infopendaftar/types";

export interface PesertaBerkasRecord {
  id: number;
  created_at: string;
}

export interface SuratBalasan extends PesertaBerkasRecord {
  surat_balasan: string;
}

export interface SuratPenilaian extends PesertaBerkasRecord {
  surat_penilaian: string;
}

export interface SertifikatMagang
  extends PesertaBerkasRecord {
  sertifikat_magang: string;
}

export interface PesertaDetail {
  id: number;
  status: string;
  bidang_peminatan_id: number;
  mentor: string;
  noHp: string;
  email: string;
  tanggal: string;
  tanggal_selesai: string;
  bidang_peminatan: {
    id: number;
    nama_bidang: string;
  };
  pendaftar: PendaftarInfo;
  surat_balasan?: SuratBalasan;
  surat_penilaian?: SuratPenilaian;
  sertifikat_magang?: SertifikatMagang;
}

export interface PesertaUploadedFiles
  extends PendaftarUploadedFiles {
  surat_balasan: UploadedFile;
  surat_penilaian: UploadedFile;
  sertifikat_magang: UploadedFile;
}
