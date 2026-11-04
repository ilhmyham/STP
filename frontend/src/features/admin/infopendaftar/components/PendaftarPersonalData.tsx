import { DataSection } from "../../shared/components/DataSection";

export interface PendaftarPersonalValues {
  nama?: string;
  tempat_lahir?: string;
  jenis_kelamin?: string;
  tanggal_lahir?: string;
  email?: string;
  alamat_asal?: string;
  noHP?: string;
  alamat_domisili?: string;
}

export const PendaftarPersonalData = ({
  data,
  fallback = false,
}: {
  data: PendaftarPersonalValues;
  fallback?: boolean;
}) => {
  const display = (value?: string) =>
    fallback ? value || "-" : value;

  return (
    <DataSection
      title='Data Pribadi'
      fields={[
        {
          label: "Nama Lengkap",
          value: display(data.nama),
        },
        {
          label: "Tempat Lahir",
          value: display(data.tempat_lahir),
        },
        {
          label: "Jenis Kelamin",
          value: display(data.jenis_kelamin),
        },
        {
          label: "Tanggal Lahir",
          value: display(data.tanggal_lahir),
        },
        { label: "Email", value: display(data.email) },
        {
          label: "Alamat Asal",
          value: display(data.alamat_asal),
        },
        {
          label: "No Handphone",
          value: display(data.noHP),
        },
        {
          label: "Alamat Domisili",
          value: display(data.alamat_domisili),
        },
      ]}
    />
  );
};
