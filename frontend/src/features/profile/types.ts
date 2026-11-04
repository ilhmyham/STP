export interface ProfileSummary {
  nama: string;
  status: string;
  divisi: string;
  profilePicture: string | null;
}

export interface ProfileDetail {
  namalengkap: string;
  jeniskelamin: string;
  email: string;
  nohandphone: string;
  instansi: string;
  tempatlahir: string;
  tanggalLahir: string;
  alamatasal: string;
  alamatdomisili: string;
  jurusan: string;
}

export interface ProfileFormValues {
  namaLengkap: string;
  tempatLahir: string;
  jenisKelamin: string;
  tanggalLahir: string;
  email: string;
  alamatAsal: string;
  noHandphone: string;
  alamatDomisili: string;
  asalUniversitas: string;
  jurusan: string;
}
