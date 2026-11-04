"use client";

import { useRef } from "react";
import {
  berkasPesertaService,
  getBerkasPesertaErrorMessage,
  isBerkasPesertaType,
} from "@/service/berkasPeserta.service";
import type { PesertaDetail } from "../types";

/** Batas ukuran file harus sama dengan validasi backend (`max:10240` KB). */
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
  "jpg",
  "jpeg",
  "png",
];

/**
 * Validasi ringan di sisi klien agar pengguna langsung mendapat pesan
 * dalam bahasa Indonesia sebelum request dikirim.
 */
function validateFile(file: File): string | null {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (!extension || !ALLOWED_EXTENSIONS.includes(extension)) {
    return "Format file harus PDF, DOC, DOCX, JPG, JPEG, atau PNG.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Ukuran file maksimal 10 MB.";
  }

  return null;
}

/** Ref input & aksi unggah/ubah berkas peserta. */
export function usePesertaBerkas({
  idPeserta,
  data,
}: {
  idPeserta: string;
  data: PesertaDetail | null;
}) {
  const suratBalasanInputRef =
    useRef<HTMLInputElement | null>(null);
  const suratPenilaianInputRef =
    useRef<HTMLInputElement | null>(null);
  const sertifikatMagangInputRef =
    useRef<HTMLInputElement | null>(null);

  const suratBalasanUpdateInputRef =
    useRef<HTMLInputElement | null>(null);
  const suratPenilaianUpdateInputRef =
    useRef<HTMLInputElement | null>(null);
  const sertifikatMagangUpdateInputRef =
    useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    if (!file || !isBerkasPesertaType(type)) return;

    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      event.target.value = "";
      return;
    }

    try {
      const response =
        await berkasPesertaService.upload(
          type,
          idPeserta,
          file
        );
      console.log(
        `${type} uploaded successfully:`,
        response
      );
      alert("Dokumen berhasil diunggah.");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
      alert(getBerkasPesertaErrorMessage(error));
    } finally {
      // Agar file yang sama bisa dipilih ulang setelah gagal.
      event.target.value = "";
    }
  };

  const handleUpdateFile = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const file = event.target.files?.[0];
    if (!file || !isBerkasPesertaType(type)) return;

    const validationError = validateFile(file);
    if (validationError) {
      alert(validationError);
      event.target.value = "";
      return;
    }

    const berkasId =
      type === "surat_balasan"
        ? data?.surat_balasan?.id
        : type === "surat_penilaian"
          ? data?.surat_penilaian?.id
          : data?.sertifikat_magang?.id;

    if (!berkasId) {
      alert("Gagal memperbarui dokumen.");
      return;
    }

    try {
      const response =
        await berkasPesertaService.update(
          type,
          berkasId,
          file
        );

      alert("Dokumen berhasil diperbarui.");
      console.log("Respon update:", response);
      window.location.reload();
    } catch (error) {
      console.error(
        "Gagal memperbarui dokumen:",
        error
      );
      alert(getBerkasPesertaErrorMessage(error));
    } finally {
      event.target.value = "";
    }
  };

  const handleUploadClick = (type: string) => {
    if (type === "surat_balasan") {
      suratBalasanInputRef.current?.click();
    } else if (type === "surat_penilaian") {
      suratPenilaianInputRef.current?.click();
    } else if (type === "sertifikat_magang") {
      sertifikatMagangInputRef.current?.click();
    }
  };

  return {
    suratBalasanInputRef,
    suratPenilaianInputRef,
    sertifikatMagangInputRef,
    suratBalasanUpdateInputRef,
    suratPenilaianUpdateInputRef,
    sertifikatMagangUpdateInputRef,
    handleFileChange,
    handleUpdateFile,
    handleUploadClick,
  };
}

export type PesertaBerkasController = ReturnType<
  typeof usePesertaBerkas
>;
