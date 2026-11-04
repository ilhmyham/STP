import type {
  BidangPeminatanRef,
  PendaftarRecord,
} from "@/features/pendaftaran/types";
import type {
  ProfileDetail,
  ProfileSummary,
} from "../types";

const GENDER_LABEL: Record<string, string> = {
  pria: "Pria",
  wanita: "Wanita",
};

const STATUS_LABEL: Record<string, string> = {
  uncheck: "Belum Dicek",
  diterima: "Diterima",
  ditolak: "Ditolak",
};

function formatTanggal(value: string | null): string {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getBidang(
  pendaftar: PendaftarRecord
): BidangPeminatanRef | null {
  const bidang =
    pendaftar.bidang_peminatan ??
    pendaftar.bidangPeminatan;

  return bidang && typeof bidang === "object"
    ? bidang
    : null;
}

/** Data pendaftar -> bentuk yang dipakai halaman profil. */
export function toProfileDetail(
  pendaftar: PendaftarRecord
): ProfileDetail {
  return {
    namalengkap: pendaftar.nama ?? "",
    jeniskelamin:
      GENDER_LABEL[pendaftar.jenis_kelamin ?? ""] ??
      pendaftar.jenis_kelamin ??
      "",
    email: pendaftar.email ?? "",
    nohandphone: pendaftar.noHP ?? "",
    instansi: pendaftar.asal_instansi ?? "",
    tempatlahir: pendaftar.tempat_lahir ?? "",
    tanggalLahir: formatTanggal(
      pendaftar.tanggal_lahir
    ),
    alamatasal: pendaftar.alamat_asal ?? "",
    alamatdomisili:
      pendaftar.alamat_domisili ?? "",
    jurusan: pendaftar.program_studi ?? "",
  };
}

/** Data pendaftar -> ringkasan sidebar profil. */
export function toProfileSummary(
  pendaftar: PendaftarRecord
): ProfileSummary {
  return {
    nama: pendaftar.nama ?? "",
    status:
      STATUS_LABEL[pendaftar.status] ??
      pendaftar.status ??
      "",
    divisi: getBidang(pendaftar)?.nama_bidang ?? "",
    profilePicture: null,
  };
}
