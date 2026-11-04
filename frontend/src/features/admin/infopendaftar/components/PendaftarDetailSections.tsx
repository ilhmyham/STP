import { DataSection } from "../../shared/components/DataSection";
import type { PendaftarInfo } from "../types";

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const PendaftarPersonalDetailSection = ({
  data,
}: {
  data: PendaftarInfo;
}) => (
  <DataSection
    title='Data Pribadi'
    fields={[
      { label: "Nama Lengkap", value: data.nama },
      { label: "Tempat Lahir", value: data.tempat_lahir },
      {
        label: "Jenis Kelamin",
        value:
          data.jenis_kelamin === "pria"
            ? "Laki-laki"
            : "Perempuan",
      },
      {
        label: "Tanggal Lahir",
        value: formatDate(data.tanggal_lahir),
      },
      { label: "Email", value: data.email },
      { label: "Alamat Asal", value: data.alamat_asal },
      { label: "No Handphone", value: data.noHP },
      {
        label: "Alamat Domisili",
        value: data.alamat_domisili,
      },
    ]}
  />
);

export const PendaftarEducationDetailSection = ({
  data,
}: {
  data: PendaftarInfo;
}) => (
  <DataSection
    title='Data Pendidikan'
    gridClassName='grid grid-cols-1 md:grid-cols-2 text-sm text-black gap-y-5'
    fields={[
      {
        label: "Asal Universitas:",
        value: data.asal_instansi,
      },
      {
        label: "Fakultas:",
        value: data.fakultas || "-",
      },
      {
        label: "Jenjang Pendidikan:",
        value:
          data.jenjang_pendidikan === "1"
            ? "S1"
            : data.jenjang_pendidikan === "2"
              ? "S2"
              : data.jenjang_pendidikan === "3"
                ? "S3"
                : data.jenjang_pendidikan,
      },
      { label: "Jurusan:", value: data.jurusan },
      {
        label: "Semester Saat Ini:",
        value: data.semester,
      },
      {
        label: "Nomor Induk Mahasiswa:",
        value: data.nim,
      },
    ]}
  />
);
