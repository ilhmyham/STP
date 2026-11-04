import { DataSection } from "../../shared/components/DataSection";
import { formatDate } from "../lib/formatDate";
import type { PesertaDetail } from "../types";

export const PesertaInfoSection = ({
  data,
}: {
  data: PesertaDetail | null;
}) => (
  <DataSection
    title='Data Informasi Magang'
    withBreak
    gridClassName='grid grid-cols-1 md:grid-cols-2 text-sm text-black gap-y-5'
    fields={[
      {
        label: "Supervisor/Mentor",
        value: data?.mentor,
      },
      { label: "No Handphone", value: data?.noHp },
      {
        label: "Penempatan Magang",
        value: data?.bidang_peminatan?.nama_bidang,
      },
      { label: "Email", value: data?.email },
      {
        label: "Tanggal Mulai Magang",
        value: data?.tanggal
          ? formatDate(data.tanggal)
          : "Tanggal tidak tersedia",
      },
      {
        label: "Tanggal Selesai Magang",
        value: data?.tanggal_selesai
          ? formatDate(data.tanggal_selesai)
          : "Tanggal tidak tersedia",
      },
    ]}
  />
);
