"use client"; // karena menggunakan hooks dan komponen client-side

import React, {
  useState,
  useEffect,
} from "react"; // <-- ini sudah benar
import { useParams } from "next/navigation"; // Untuk mengambil ID dari URL path
import axios from "axios";
import { Button } from "@/components/ui/button/page";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/app/admin/sidebar/page"; // Pastikan path-nya sesuai dengan struktur proyekmu
import ConfirmationModal from "@/components/popup/confirm/page"; // Kalau ada modal konfirmasi

type UploadedFile = {
  name: string;
  size: string;
  url?: string;
};

type UploadedFiles = {
  cv: UploadedFile;
  proposal: UploadedFile;
  suratPermohonan: UploadedFile;
  dokumenPendukung: UploadedFile;
  surat_balasan: UploadedFile;
  surat_penilaian: UploadedFile;
  sertifikat_magang: UploadedFile;
};

// Definisikan interfaces untuk data
interface BidangPeminatan {
  id: number;
  nama_bidang: string;
}

interface suratBalasan {
  id: number;
  surat_balasan: string;
  created_at: string;
}

interface suratPenilaian {
  id: number;
  surat_penilaian: string;
  created_at: string;
}

interface sertifikat {
  id: number;
  sertifikat_magang: string;
  created_at: string;
}

interface PendaftarData {
  id_pendaftar: number;
  nama: string;
  email: string;
  noHP: string;
  status: string;
  bidang_peminatan: number;
  created_at: string;
  cv: string;
  proposal: string;
  surat_permohonan: string;
  dokumen_pendukung: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  alamat_asal: string;
  alamat_domisili: string;
  asal_instansi: string;
  fakultas: string;
  jenjang_pendidikan: string;
  jurusan: string;
  semester: number;
  nim: string;
  durasi: string;
  periodic_mulai: string;
}

interface Peserta {
  id: number;
  no: number;
  status: "On Going" | "Finished";
  bidang_peminatan_id: number;
  mentor: string;
  noHp: string;
  email: string;
  tanggal: string;
  tanggal_selesai: string;
  bidang_peminatan: BidangPeminatan;
  pendaftar: PendaftarData;
  surat_balasan: suratBalasan;
  surat_penilaian: suratPenilaian;
  sertifikat_magang: sertifikat;
}

export const InternshipDetail = () => {
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFiles>({
      cv: { name: "", size: "" },
      proposal: { name: "", size: "" },
      suratPermohonan: { name: "", size: "" },
      dokumenPendukung: { name: "", size: "" },
      surat_balasan: { name: "", size: "" },
      surat_penilaian: { name: "", size: "" },
      sertifikat_magang: { name: "", size: "" },
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric", // Tahun dalam format angka (contoh: 2025)
      month: "long", // Bulan dalam nama panjang (contoh: Mei)
      day: "numeric", // Hari dalam angka (contoh: 13)
    };

    return date.toLocaleDateString(
      "id-ID",
      options
    ); // Format dengan bahasa Indonesia
  };

  const { id } = useParams(); // Ini akan menangkap ID dari URL yang memiliki format [id].tsx
  const [data, setData] =
    useState<Peserta | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Mengambil data dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/pesertas/${id}` // Menggunakan ID yang didapat dari URL
        );
        // console.log(response.data);
        setData(response.data.data); // Menyimpan data yang diterima dari API ke dalam state
        const baseUrl =
          "http://127.0.0.1:8000/storage";
        // Set uploaded files from API data
        setUploadedFiles({
          cv: {
            name: "CV.pdf",
            size: "2.5 MB",
            url: response.data.data.pendaftar
              .berkas.cv
              ? `${baseUrl}/${response.data.data.pendaftar.berkas.cv}`
              : undefined,
          },
          proposal: {
            name: "Proposal.pdf",
            size: "1.8 MB",
            url: response.data.data.pendaftar
              ?.berkas?.proposal
              ? `${baseUrl}/${response.data.data.pendaftar.berkas.proposal}`
              : undefined,
          },
          suratPermohonan: {
            name: "Surat Permohonan.pdf",
            size: "1.2 MB",
            url: response.data.data.pendaftar
              ?.berkas?.surat_rekomendasi
              ? `${baseUrl}/${response.data.data.pendaftar.berkas.surat_rekomendasi}`
              : undefined,
          },
          dokumenPendukung: {
            name: "Dokumen Pendukung.zip",
            size: "4.7 MB",
            url: response.data.data.pendaftar
              ?.berkas?.dok_pendukung
              ? `${baseUrl}/${response.data.data.pendaftar.berkas.dok_pendukung}`
              : undefined,
          },
          surat_balasan: {
            name: "Surat Balasan.pdf",
            size: "1.5 MB",
            url: response.data.data.surat_balasan
              ?.surat_balasan
              ? `${baseUrl}/${response.data.data.surat_balasan.surat_balasan}`
              : undefined,
          },
          surat_penilaian: {
            name: "Surat Penilaian.pdf",
            size: "1.5 MB",
            url: response.data.data
              .surat_penilaian?.surat_penilaian
              ? `${baseUrl}/${response.data.data.surat_penilaian.surat_penilaian}`
              : undefined,
          },
          sertifikat_magang: {
            name: "Sertifikat Magang.pdf",
            size: "1.5 MB",
            url: response.data.data
              .sertifikat_magang
              ?.sertifikat_magang
              ? `${baseUrl}/${response.data.data.sertifikat_magang.sertifikat_magang}`
              : undefined,
          },
        });
      } catch (error) {
        console.error(
          "Error fetching data:",
          error
        );
      } finally {
        setLoading(false); // Menghentikan loading setelah data diterima
      }
    };

    fetchData(); // Panggil API saat komponen dimuat
  }, [id]); // Efek berjalan jika ID berubah

  if (loading) {
    return <div>Loading...</div>; // Tampilkan loading jika data sedang dimuat
  }

  return (
    <div className='bg-[#F4F3F6] min-h-screen flex'>
      <Sidebar />{" "}
      {/* Menampilkan sidebar di sisi kiri */}
      <div className='flex-1 p-6 md:p-8 ml-0 md:ml-64'>
        <h1 className='text-2xl font-semibold text-[#000] mb-6'>
          <span
            onClick={() => router.back()}
            className='hover:text-gray-400 cursor-pointer'
          >
            Data Masuk
          </span>{" "}
          &gt; Data Pendaftar
        </h1>

        {/* Data Pribadi */}
        <section className='bg-white rounded-2xl shadow p-6 mb-6'>
          <h2 className='text-[#F53838] font-semibold mb-4 text-[22px]'>
            Data Pribadi
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 text-sm gap-y-5'>
            <div>
              <p className='text-[#636D7C]'>
                Nama Lengkap
              </p>
              <br />
              <p className='font-semibold'>
                {data?.pendaftar.nama}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Tempat Lahir
              </p>
              <br />
              <p className='font-semibold'>
                {data?.pendaftar.tempat_lahir}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Jenis Kelamin
              </p>
              <br />
              <p className='font-semibold'>
                {data?.pendaftar.jenis_kelamin}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Tanggal Lahir
              </p>
              <br />
              <p className='font-semibold'>
                {data?.pendaftar.tanggal_lahir
                  ? formatDate(
                      data?.pendaftar
                        .tanggal_lahir
                    ) // Jika created_at ada, formatkan tanggalnya
                  : "Tanggal tidak tersedia"}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Email
              </p>
              <br />
              <p className='font-semibold'>
                {data?.pendaftar.email}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Alamat Asal
              </p>
              <br />
              <p className='font-semibold'>
                {data?.pendaftar.alamat_asal}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                No Handphone
              </p>
              <br />
              <p className='font-semibold'>
                {data?.pendaftar.noHP}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Alamat Domisili
              </p>
              <br />
              <p className='font-semibold'>
                {data?.pendaftar.alamat_domisili}
              </p>
            </div>
          </div>
        </section>

        {/* Data Magang */}
        <section className='bg-white rounded-2xl shadow p-6 mb-6'>
          <h2 className='text-[#F53838] font-semibold mb-4 text-[22px]'>
            Data Magang
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm'>
            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Durasi Magang
              </p>
              <p className='font-semibold'>
                {data?.pendaftar.durasi}
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Periode Mulai
              </p>
              <p className='font-semibold'>
                {data?.pendaftar.periodic_mulai
                  ? formatDate(
                      data?.pendaftar
                        .periodic_mulai
                    ) // Jika created_at ada, formatkan tanggalnya
                  : "Tanggal tidak tersedia"}
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Bidang Penempatan
              </p>
              <p className='font-semibold'>
                {
                  data?.bidang_peminatan
                    ?.nama_bidang
                }
              </p>
            </div>

            <div>
              {/* kosong untuk baris sejajar */}
            </div>

            {/* Baris 3 */}
            <div>
              <FileDisplay
                label='CV/Portofolio'
                file={uploadedFiles.cv}
              />
            </div>
            <div>
              <FileDisplay
                label='Surat Permohonan/Rekomendasi Magang'
                file={
                  uploadedFiles.suratPermohonan
                }
              />
            </div>

            {/* Baris 4 */}
            <div>
              <FileDisplay
                label='Proposal Magang'
                file={uploadedFiles.proposal}
              />
            </div>
            <div>
              <FileDisplay
                label='Dokumen Pendukung Lainnya'
                file={
                  uploadedFiles.dokumenPendukung
                }
              />
            </div>
          </div>
        </section>

        {/* Data Informasi Magang */}
        <section className='bg-white rounded-2xl shadow p-6 mb-6'>
          <h2 className='text-[#F53838] font-semibold mb-4 text-[22px]'>
            Data Informasi Magang
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 text-sm text-black gap-y-5'>
            <div>
              <p className='text-[#636D7C]'>
                Supervisor/Mentor
              </p>
              <br />
              <p className='font-semibold'>
                {data?.mentor}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                No Handphone
              </p>
              <br />
              <p className='font-semibold'>
                {data?.noHp}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Penempatan Magang
              </p>
              <br />
              <p className='font-semibold'>
                {
                  data?.bidang_peminatan
                    ?.nama_bidang
                }
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Email
              </p>
              <br />
              <p className='font-semibold'>
                {data?.email}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tanggal Mulai Magang
              </p>
              <br />
              <p className='font-semibold'>
                {data?.tanggal
                  ? formatDate(data?.tanggal) // Jika created_at ada, formatkan tanggalnya
                  : "Tanggal tidak tersedia"}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Tanggal Selesai Magang
              </p>
              <br />
              <p className='font-semibold'>
                {data?.tanggal_selesai
                  ? formatDate(
                      data?.tanggal_selesai
                    ) // Jika created_at ada, formatkan tanggalnya
                  : "Tanggal tidak tersedia"}
              </p>
            </div>
          </div>
        </section>
        <section>
          <h2 className='text-2xl font-semibold mb-4'>
            Berkas Perserta Magang
          </h2>
          <div className='bg-white rounded-2xl shadow p-6 mb-6'>
            <h2 className='text-[#29334D] font-semibold text-[22px]'>
              Surat Balasan Magang
            </h2>
            <p className='text-[#636D7C] mt-2 mb-2 flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
              >
                <path
                  d='M8.99996 15.6667C10.7681 15.6667 12.4638 14.9644 13.714 13.7141C14.9642 12.4639 15.6666 10.7682 15.6666 9.00008C15.6666 7.23197 14.9642 5.53628 13.714 4.28604C12.4638 3.03579 10.7681 2.33341 8.99996 2.33341C7.23185 2.33341 5.53616 3.03579 4.28591 4.28604C3.03567 5.53628 2.33329 7.23197 2.33329 9.00008C2.33329 10.7682 3.03567 12.4639 4.28591 13.7141C5.53616 14.9644 7.23185 15.6667 8.99996 15.6667ZM8.99996 0.666748C10.0943 0.666748 11.1779 0.882296 12.189 1.30109C13.2 1.71987 14.1187 2.3337 14.8925 3.10752C15.6663 3.88135 16.2802 4.80001 16.699 5.81105C17.1177 6.8221 17.3333 7.90573 17.3333 9.00008C17.3333 11.2102 16.4553 13.3298 14.8925 14.8926C13.3297 16.4554 11.2101 17.3334 8.99996 17.3334C4.39163 17.3334 0.666626 13.5834 0.666626 9.00008C0.666626 6.78994 1.5446 4.67033 3.1074 3.10752C4.67021 1.54472 6.78982 0.666748 8.99996 0.666748ZM9.41663 4.83341V9.20841L13.1666 11.4334L12.5416 12.4584L8.16663 9.83341V4.83341H9.41663Z'
                  fill='#737F92'
                />
              </svg>
              Diterbitkan:{" "}
              {data?.surat_balasan
                ? data?.surat_balasan.created_at
                  ? formatDate(
                      data?.surat_balasan
                        .created_at
                    ) // Jika created_at ada, formatkan tanggalnya
                  : "Tanggal tidak tersedia"
                : "-"}
            </p>

            <div className='flex flex-wrap mt-4 justify-between gap-4'>
              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#49CA7B] hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  console.log(
                    "URL:",
                    uploadedFiles.surat_balasan
                      .url
                  );
                  if (
                    uploadedFiles.surat_balasan
                      .url
                  ) {
                    window.open(
                      uploadedFiles.surat_balasan
                        .url,
                      "_blank"
                    );
                  }
                }}
              >
                <img
                  src='/icons/show.svg'
                  alt='lihat'
                  className='w-5 h-5'
                />
                Lihat Dokumen
              </Button>

              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#EABE4F] hover:bg-yellow-500 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  // setActionType("ubah");
                  // setShowModal(true);
                }}
              >
                <img
                  src='/icons/edit.svg'
                  alt='ubah'
                  className='w-5 h-5'
                />
                Ubah Dokumen
              </Button>

              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#2658AC] hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2'
                // onClick={}
              >
                <img
                  src='/icons/upload.svg'
                  alt='unggah'
                  className='w-5 h-5'
                />
                Unggah Dokumen
              </Button>
            </div>
          </div>
          <div className='bg-white rounded-2xl shadow p-6 mb-6'>
            <h2 className='text-[#29334D] font-semibold text-[22px]'>
              Surat Penilaian Magang
            </h2>
            <p className='text-[#636D7C] mt-2 mb-2 flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
              >
                <path
                  d='M8.99996 15.6667C10.7681 15.6667 12.4638 14.9644 13.714 13.7141C14.9642 12.4639 15.6666 10.7682 15.6666 9.00008C15.6666 7.23197 14.9642 5.53628 13.714 4.28604C12.4638 3.03579 10.7681 2.33341 8.99996 2.33341C7.23185 2.33341 5.53616 3.03579 4.28591 4.28604C3.03567 5.53628 2.33329 7.23197 2.33329 9.00008C2.33329 10.7682 3.03567 12.4639 4.28591 13.7141C5.53616 14.9644 7.23185 15.6667 8.99996 15.6667ZM8.99996 0.666748C10.0943 0.666748 11.1779 0.882296 12.189 1.30109C13.2 1.71987 14.1187 2.3337 14.8925 3.10752C15.6663 3.88135 16.2802 4.80001 16.699 5.81105C17.1177 6.8221 17.3333 7.90573 17.3333 9.00008C17.3333 11.2102 16.4553 13.3298 14.8925 14.8926C13.3297 16.4554 11.2101 17.3334 8.99996 17.3334C4.39163 17.3334 0.666626 13.5834 0.666626 9.00008C0.666626 6.78994 1.5446 4.67033 3.1074 3.10752C4.67021 1.54472 6.78982 0.666748 8.99996 0.666748ZM9.41663 4.83341V9.20841L13.1666 11.4334L12.5416 12.4584L8.16663 9.83341V4.83341H9.41663Z'
                  fill='#737F92'
                />
              </svg>
              Diterbitkan:
              {data?.surat_penilaian
                ? data?.surat_penilaian.created_at
                  ? formatDate(
                      data?.surat_penilaian
                        .created_at
                    ) // Jika created_at ada, formatkan tanggalnya
                  : "Tanggal tidak tersedia"
                : "-"}
            </p>

            <div className='flex flex-wrap mt-4 justify-between gap-4'>
              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#49CA7B] hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  console.log(
                    "URL:",
                    uploadedFiles
                      .sertifikat_magang.url
                  );
                  if (
                    uploadedFiles
                      .sertifikat_magang.url
                  ) {
                    window.open(
                      uploadedFiles
                        .sertifikat_magang.url,
                      "_blank"
                    );
                  }
                }}
              >
                <img
                  src='/icons/show.svg'
                  alt='lihat'
                  className='w-5 h-5'
                />
                Lihat Dokumen
              </Button>

              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#EABE4F] hover:bg-yellow-500 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  console.log(
                    "URL:",
                    uploadedFiles.surat_penilaian
                      .url
                  );
                  if (
                    uploadedFiles.surat_penilaian
                      .url
                  ) {
                    window.open(
                      uploadedFiles
                        .surat_penilaian.url,
                      "_blank"
                    );
                  }
                }}
              >
                <img
                  src='/icons/edit.svg'
                  alt='ubah'
                  className='w-5 h-5'
                />
                Ubah Dokumen
              </Button>

              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#2658AC] hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  // setActionType("unggah");
                  // setShowModal(true);
                }}
              >
                <img
                  src='/icons/upload.svg'
                  alt='unggah'
                  className='w-5 h-5'
                />
                Unggah Dokumen
              </Button>
            </div>
          </div>
          <div className='bg-white rounded-2xl shadow p-6 mb-6'>
            <h2 className='text-[#29334D] font-semibold text-[22px]'>
              Sertifikat Magang
            </h2>
            <p className='text-[#636D7C] mt-2 mb-2 flex items-center gap-2'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
              >
                <path
                  d='M8.99996 15.6667C10.7681 15.6667 12.4638 14.9644 13.714 13.7141C14.9642 12.4639 15.6666 10.7682 15.6666 9.00008C15.6666 7.23197 14.9642 5.53628 13.714 4.28604C12.4638 3.03579 10.7681 2.33341 8.99996 2.33341C7.23185 2.33341 5.53616 3.03579 4.28591 4.28604C3.03567 5.53628 2.33329 7.23197 2.33329 9.00008C2.33329 10.7682 3.03567 12.4639 4.28591 13.7141C5.53616 14.9644 7.23185 15.6667 8.99996 15.6667ZM8.99996 0.666748C10.0943 0.666748 11.1779 0.882296 12.189 1.30109C13.2 1.71987 14.1187 2.3337 14.8925 3.10752C15.6663 3.88135 16.2802 4.80001 16.699 5.81105C17.1177 6.8221 17.3333 7.90573 17.3333 9.00008C17.3333 11.2102 16.4553 13.3298 14.8925 14.8926C13.3297 16.4554 11.2101 17.3334 8.99996 17.3334C4.39163 17.3334 0.666626 13.5834 0.666626 9.00008C0.666626 6.78994 1.5446 4.67033 3.1074 3.10752C4.67021 1.54472 6.78982 0.666748 8.99996 0.666748ZM9.41663 4.83341V9.20841L13.1666 11.4334L12.5416 12.4584L8.16663 9.83341V4.83341H9.41663Z'
                  fill='#737F92'
                />
              </svg>
              Diterbitkan :
              {data?.sertifikat_magang
                ? data?.sertifikat_magang
                    .created_at
                  ? formatDate(
                      data?.sertifikat_magang
                        .created_at
                    ) // Jika created_at ada, formatkan tanggalnya
                  : "Tanggal tidak tersedia"
                : "-"}
            </p>

            <div className='flex flex-wrap mt-4 justify-between gap-4'>
              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#49CA7B] hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  // setShowModal(true);
                }}
              >
                <img
                  src='/icons/show.svg'
                  alt='lihat'
                  className='w-5 h-5'
                />
                Lihat Dokumen
              </Button>

              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#EABE4F] hover:bg-yellow-500 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  // setActionType("ubah");
                  // setShowModal(true);
                }}
              >
                <img
                  src='/icons/edit.svg'
                  alt='ubah'
                  className='w-5 h-5'
                />
                Ubah Dokumen
              </Button>

              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#2658AC] hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  // setActionType("unggah");
                  // setShowModal(true);
                }}
              >
                <img
                  src='/icons/upload.svg'
                  alt='unggah'
                  className='w-5 h-5'
                />
                Unggah Dokumen
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// type FileDisplayProps = {
//   label: string;
//   file: UploadedFile;
// };

const FileDisplay: React.FC<{
  label: string;
  file: UploadedFile;
}> = ({ label, file }) => (
  <div className='w-auto'>
    <label className='block mb-2 font-medium text-sm text-[#636D7C]'>
      {label}
    </label>
    <div className='flex'>
      <div className='flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-[#F9F9F9] flex items-center'>
        {file.name || "Tidak ada file"}
      </div>
      <button
        className={`${
          file.url
            ? "bg-gray-300 hover:bg-gray-200 text-gray-500"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        } text-sm px-4 py-2 rounded-r-md`}
        onClick={() =>
          file.url &&
          window.open(file.url, "_blank")
        }
        disabled={!file.url}
      >
        {file.url ? "Lihat" : "Belum Ada"}
      </button>
    </div>
  </div>
);

export default InternshipDetail;
