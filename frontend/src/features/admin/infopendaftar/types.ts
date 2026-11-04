export interface BidangPeminatanOption {
  id: number;
  nama_bidang: string;
}

export interface PendaftarInfo {
  id_pendaftar: number;
  nama: string;
  email: string;
  noHP: string;
  status: string;
  bidang_peminatan: number;
  created_at: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  alamat_asal: string;
  alamat_domisili: string;
  asal_instansi: string;
  fakultas: string;
  jenjang_pendidikan: string;
  program_studi?: string;
  jurusan: string;
  semester: number;
  nim: string;
  durasi: string;
  periodic_mulai: string;
  berkas?: {
    cv?: string;
    proposal?: string;
    surat_rekomendasi?: string;
    dok_pendukung?: string;
  };
}

export interface InternshipInfoValues {
  tanggal: string;
  tanggal_selesai: string;
  mentor: string;
  mentor_kedua: string;
  noHp: string;
  noHp_kedua: string;
  email: string;
  email_kedua: string;
  bidang_peminatan_id: string;
}

export interface PesertaFormValues
  extends InternshipInfoValues {
  pendaftar_id: number;
  status: string;
}

export type PesertaEditValues = InternshipInfoValues;

export interface PesertaEditData
  extends InternshipInfoValues {
  pendaftar?: PendaftarInfo;
}

export interface UploadedFile {
  name: string;
  size: string;
  url?: string;
}

export interface PendaftarUploadedFiles {
  cv: UploadedFile;
  proposal: UploadedFile;
  suratPermohonan: UploadedFile;
  dokumenPendukung: UploadedFile;
}
