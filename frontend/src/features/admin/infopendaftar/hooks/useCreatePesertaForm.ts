"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PendaftarService } from "@/service/api";
import { pesertaService } from "@/service/servicePerserta";
import { getApiError } from "@/lib/api-error";
import type {
  PendaftarInfo,
  PesertaFormValues,
} from "../types";

const createEmptyForm = (): PesertaFormValues => ({
  pendaftar_id: 0,
  tanggal: "",
  tanggal_selesai: "",
  mentor: "",
  mentor_kedua: "",
  noHp: "",
  noHp_kedua: "",
  email: "",
  email_kedua: "",
  bidang_peminatan_id: "",
  status: "onGoing",
});

/** Form tambah data peserta dari pendaftar yang sudah diterima. */
export function useCreatePesertaForm(id?: string) {
  const router = useRouter();
  const [pendaftar, setPendaftar] =
    useState<PendaftarInfo | null>(null);
  const [formData, setFormData] =
    useState<PesertaFormValues>(createEmptyForm);

  useEffect(() => {
    if (!id) return;

    PendaftarService.getById<PendaftarInfo>(Number(id))
      .then((data) => {
        setPendaftar(data);
        setFormData((prev) => ({
          ...prev,
          pendaftar_id: data.id_pendaftar,
        }));
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await pesertaService.create<{
        id: number;
      }>(formData);
      console.log("Data berhasil dikirim:", response);
      alert("Data berhasil disimpan!");
      router.push(
        `/admin/infopendaftar/tambahdata/sunting/${response.id}`
      );
    } catch (error) {
      const apiError = getApiError(error);

      if (apiError) {
        console.error("Detail error:", apiError.data);
        alert(
          `Error: ${JSON.stringify(apiError.errors)}`
        );
      } else {
        console.error(
          "Gagal mengirim data:",
          error
        );
        alert(
          "Terjadi kesalahan saat menyimpan data."
        );
      }
    }
  };

  return {
    pendaftar,
    formData,
    handleChange,
    handleSubmit,
  };
}
