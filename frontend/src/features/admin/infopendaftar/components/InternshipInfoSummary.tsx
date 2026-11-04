import { DataSection } from "../../shared/components/DataSection";

export interface PesertaInfoSummary {
  mentor?: string;
  noHp?: string;
  bidang_peminatan_id?: string | number;
  email?: string;
  tanggal?: string;
}

export const InternshipInfoSummary = ({
  peserta,
}: {
  peserta: PesertaInfoSummary | null;
}) => (
  <DataSection
    title='Data Informasi Magang'
    gridClassName='grid grid-cols-1 md:grid-cols-2 text-sm text-black gap-y-5'
    fields={[
      {
        label: "Supervisor/Mentor",
        value: peserta?.mentor || "-",
      },
      {
        label: "No Handphone",
        value: peserta?.noHp || "-",
      },
      {
        label: "Penempatan Magang",
        value: peserta?.bidang_peminatan_id || "-",
      },
      {
        label: "Email",
        value: peserta?.email || "-",
      },
      {
        label: "Tanggal Mulai Magang",
        value: peserta?.tanggal || "-",
      },
    ]}
  />
);
