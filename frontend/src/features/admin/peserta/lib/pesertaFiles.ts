import type {
  PesertaDetail,
  PesertaUploadedFiles,
} from "../types";
import { storageFileUrl } from "@/lib/storage";

export const emptyPesertaUploadedFiles =
  (): PesertaUploadedFiles => ({
    cv: { name: "", size: "" },
    proposal: { name: "", size: "" },
    suratPermohonan: { name: "", size: "" },
    dokumenPendukung: { name: "", size: "" },
    surat_balasan: { name: "", size: "" },
    surat_penilaian: { name: "", size: "" },
    sertifikat_magang: { name: "", size: "" },
  });

export const buildPesertaUploadedFiles = (
  data: PesertaDetail
): PesertaUploadedFiles => ({
  cv: {
    name: "CV.pdf",
    size: "2.5 MB",
    url: storageFileUrl(data.pendaftar.berkas?.cv),
  },
  proposal: {
    name: "Proposal.pdf",
    size: "1.8 MB",
    url: storageFileUrl(data.pendaftar?.berkas?.proposal),
  },
  suratPermohonan: {
    name: "Surat Permohonan.pdf",
    size: "1.2 MB",
    url: storageFileUrl(
      data.pendaftar?.berkas?.surat_rekomendasi
    ),
  },
  dokumenPendukung: {
    name: "Dokumen Pendukung.zip",
    size: "4.7 MB",
    url: storageFileUrl(
      data.pendaftar?.berkas?.dok_pendukung
    ),
  },
  surat_balasan: {
    name: "Surat Balasan.pdf",
    size: "1.5 MB",
    url: storageFileUrl(
      data.surat_balasan?.surat_balasan
    ),
  },
  surat_penilaian: {
    name: "Surat Penilaian.pdf",
    size: "1.5 MB",
    url: storageFileUrl(
      data.surat_penilaian?.surat_penilaian
    ),
  },
  sertifikat_magang: {
    name: "Sertifikat Magang.pdf",
    size: "1.5 MB",
    url: storageFileUrl(
      data.sertifikat_magang?.sertifikat_magang
    ),
  },
});
