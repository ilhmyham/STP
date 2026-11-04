export interface BidangPeminatanRef {
  id: number;
  nama_bidang: string;
}

export interface JenjangPendidikanRef {
  id: number;
  pendidikan: string;
}

export type StatusPendaftar =
  | "uncheck"
  | "diterima"
  | "ditolak";

/**
 * Bentuk data pendaftar dari endpoint `GET /api/me/pendaftar`.
 *
 * Catatan: relasi `bidangPeminatan`/`jenjangPendidikan` diserialisasi Eloquent
 * dengan nama snake_case sehingga bertabrakan dengan kolom FK bernama sama.
 * Karena itu tipenya digabung (objek relasi atau id numerik).
 */
export interface PendaftarRecord {
  id_pendaftar: number;
  user_id: number;
  nama: string;
  tempat_lahir: string | null;
  tanggal_lahir: string | null;
  jenis_kelamin: string | null;
  email: string | null;
  // Relasi dapat muncul dengan nama camelCase tergantung serialisasi Eloquent.
  bidangPeminatan?: BidangPeminatanRef | null;
  jenjangPendidikan?: JenjangPendidikanRef | null;
  noHP: string | null;
  alamat_asal: string | null;
  alamat_domisili: string | null;
  asal_instansi: string | null;
  jenjang_pendidikan:
    | number
    | JenjangPendidikanRef
    | null;
  fakultas: string | null;
  program_studi: string | null;
  nim: string | null;
  semester: string | null;
  durasi: string | null;
  periodic_mulai: string | null;
  bidang_peminatan:
    | number
    | BidangPeminatanRef
    | null;
  id_berkas_pendaftar: number | null;
  status: StatusPendaftar | string;
  berkas?: unknown;
  peserta?: unknown;
}

/** Status data pendaftar milik user yang sedang login. */
export type PendaftarState =
  | "loading"
  | "registered"
  | "unregistered"
  | "error";
