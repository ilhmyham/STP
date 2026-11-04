import type { ProfileFormFieldConfig } from "../components/ProfileFormField";
import type { ProfileFormValues } from "../types";

export const LEFT_FIELDS: readonly ProfileFormFieldConfig[] = [
  {
    name: "namaLengkap",
    label: "Nama Lengkap",
    placeholder: "Nama Lengkap Anda",
  },
  {
    name: "jenisKelamin",
    label: "Jenis Kelamin",
    kind: "select",
    placeholder: "Pilih jenis kelamin",
    options: [
      { value: "perempuan", label: "Perempuan" },
      { value: "laki-laki", label: "Laki-laki" },
    ],
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "EmailAnda@gmail.com",
  },
  {
    name: "noHandphone",
    label: "No Handphone",
    placeholder: "+62 8xxxxxxxx",
  },
  {
    name: "asalUniversitas",
    label: "Asal Universitas/Sekolah",
    placeholder: "Asal Universitas/Sekolah",
  },
];

export const RIGHT_FIELDS: readonly ProfileFormFieldConfig[] =
  [
    {
      name: "tempatLahir",
      label: "Tempat Lahir",
      placeholder: "Indonesia",
      labelClassName: "text-[#29334D] font-semibold",
    },
    {
      name: "tanggalLahir",
      label: "Tanggal Lahir",
      type: "date",
    },
    {
      name: "alamatAsal",
      label: "Alamat Asal",
      placeholder:
        "Perumahan A, Kel. A, Kec. A, Batam",
    },
    {
      name: "alamatDomisili",
      label: "Alamat Domisili",
      placeholder:
        "Jl. aabb, Kel. A, Kec A, Surakarta",
    },
    {
      name: "jurusan",
      label: "Jurusan",
      placeholder: "Teknik Informatika",
    },
  ];

export const createEmptyForm = (): ProfileFormValues => ({
  namaLengkap: "",
  tempatLahir: "",
  jenisKelamin: "",
  tanggalLahir: "",
  email: "",
  alamatAsal: "",
  noHandphone: "",
  alamatDomisili: "",
  asalUniversitas: "",
  jurusan: "",
});
