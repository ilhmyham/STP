"use client";

import { useEffect, useState } from "react";
import { PendaftarService } from "@/service/api";
import type {
  PendaftarInfo,
  PendaftarUploadedFiles,
} from "../types";
import { storageFileUrl } from "@/lib/storage";

const emptyFiles = (): PendaftarUploadedFiles => ({
  cv: { name: "", size: "" },
  proposal: { name: "", size: "" },
  suratPermohonan: { name: "", size: "" },
  dokumenPendukung: { name: "", size: "" },
});

const toUploadedFiles = (
  data: PendaftarInfo
): PendaftarUploadedFiles => ({
  cv: {
    name: "CV.pdf",
    size: "2.5 MB",
    url: storageFileUrl(data.berkas?.cv),
  },
  proposal: {
    name: "Proposal.pdf",
    size: "1.8 MB",
    url: storageFileUrl(data.berkas?.proposal),
  },
  suratPermohonan: {
    name: "Surat Permohonan.pdf",
    size: "1.2 MB",
    url: storageFileUrl(data.berkas?.surat_rekomendasi),
  },
  dokumenPendukung: {
    name: "Dokumen Pendukung.zip",
    size: "4.7 MB",
    url: storageFileUrl(data.berkas?.dok_pendukung),
  },
});

export function usePendaftarDetail(id: string | undefined) {
  const [data, setData] = useState<PendaftarInfo | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(
    null
  );
  const [uploadedFiles, setUploadedFiles] =
    useState<PendaftarUploadedFiles>(emptyFiles);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!id) return;

        const fetchedData =
          await PendaftarService.getById<PendaftarInfo>(
            Number(id)
          );
        setData(fetchedData);
        setUploadedFiles(toUploadedFiles(fetchedData));
      } catch (err) {
        setError("Gagal memuat detail data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const updateStatus = async (
    actionType: "accept" | "reject"
  ) => {
    try {
      await PendaftarService.updateStatus(
        Number(id),
        actionType === "accept"
          ? "diterima"
          : "ditolak"
      );

      const fetchedData =
        await PendaftarService.getById<PendaftarInfo>(
          Number(id)
        );
      setData(fetchedData);
    } catch (err) {
      console.error("Gagal mengupdate status:", err);
      setError("Gagal mengupdate status");
    }
  };

  return {
    data,
    loading,
    error,
    uploadedFiles,
    updateStatus,
  };
}
