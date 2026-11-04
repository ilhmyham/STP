import { DataSection } from "../../shared/components/DataSection";

export const StaticPersonalData = () => (
  <DataSection
    title='Data Pribadi'
    withBreak
    fields={[
      {
        label: "Nama Lengkap",
        value: "Theresia Pasingki Sollu",
      },
      { label: "Tempat Lahir", value: "Indonesia" },
      { label: "Jenis Kelamin", value: "Perempuan" },
      { label: "Tanggal Lahir", value: "17 Maret 2005" },
      { label: "Email", value: "aabb@gmail.com" },
      {
        label: "Alamat Asal",
        value:
          "Perum. Aabb, Kel. A, Kec. A, Batam, Indonesia",
      },
      {
        label: "No Handphone",
        value: "+62 8xxxxxxxxxxx",
      },
      {
        label: "Alamat Domisili",
        value:
          "Jl. aabb, Kel. A, Kec. A, Surakarta, Indonesia",
      },
    ]}
  />
);
