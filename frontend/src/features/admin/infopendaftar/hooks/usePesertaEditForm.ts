"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { pesertaService } from "@/service/servicePerserta";
import type {
  PendaftarInfo,
  PesertaEditData,
  PesertaEditValues,
} from "../types";

const toDateInput = (value: string) =>
  value
    ? new Date(value).toISOString().split("T")[0]
    : "";

const toFormValues = (
  data: PesertaEditData
): PesertaEditValues => ({
  mentor: data.mentor || "",
  mentor_kedua: data.mentor_kedua || "",
  noHp: data.noHp || "",
  noHp_kedua: data.noHp_kedua || "",
  email: data.email || "",
  email_kedua: data.email_kedua || "",
  bidang_peminatan_id: data.bidang_peminatan_id || "",
  tanggal: toDateInput(data.tanggal),
  tanggal_selesai: toDateInput(data.tanggal_selesai),
});

const createEmptyForm = (): PesertaEditValues => ({
  mentor: "",
  mentor_kedua: "",
  noHp: "",
  noHp_kedua: "",
  email: "",
  email_kedua: "",
  bidang_peminatan_id: "",
  tanggal: "",
  tanggal_selesai: "",
});

/** Data peserta + form sunting informasi magang. */
export function usePesertaEditForm(id: string) {
  const router = useRouter();
  const [pendaftar, setPendaftar] =
    useState<PendaftarInfo | null>(null);
  const [peserta, setPeserta] =
    useState<PesertaEditData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] =
    useState<PesertaEditValues>(createEmptyForm);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pesertaData =
          await pesertaService.getById<PesertaEditData>(
            id
          );
        setPeserta(pesertaData);
        setPendaftar(pesertaData.pendaftar ?? null);
        setFormData(toFormValues(pesertaData));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
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

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    try {
      const response = await pesertaService.update(
        id,
        formData
      );
      console.log(
        "Data successfully updated:",
        response
      );
      alert("Data successfully updated!");
      router.push("/admin/users");
    } catch (error) {
      console.error("Error during update:", error);
      alert(
        "There was an error updating the data."
      );
    }
  };

  return {
    pendaftar,
    peserta,
    loading,
    formData,
    handleChange,
    handleSubmit,
  };
}
