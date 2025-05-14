"use client"; // karena menggunakan hooks dan komponen client-side

import React, { useState } from "react"; // <-- ini sudah benar
import Image from "next/image";
import { Button } from "@/components/ui/button/page";
import { Sidebar } from "../../sidebar/page"; // pastikan path-nya sesuai struktur proyekmu
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/popup/confirm/page";

type UploadedFile = {
  name: string;
  size: string;
};

type UploadedFiles = {
  cv: UploadedFile;
  proposal: UploadedFile;
  suratPermohonan: UploadedFile;
  dokumenPendukung: UploadedFile;
};

export const InternshipDetail = () => {
  const uploadedFiles: UploadedFiles = {
    cv: {
      name: "CV_Theresia.pdf",
      size: "2.5 MB",
    },
    proposal: {
      name: "Proposal_Magang.pdf",
      size: "1.8 MB",
    },
    suratPermohonan: {
      name: "Surat_Rekomendasi.pdf",
      size: "1.2 MB",
    },
    dokumenPendukung: {
      name: "Dokumen_Pendukung.zip",
      size: "4.7 MB",
    },
  };

  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");
  const router = useRouter();
  const [showModal, setShowModal] =
    useState(false);

  const handleConfirm = () => {
    console.log("Data diterima");
  };
  return (
    <div className='bg-[#F4F3F6] min-h-screen flex'>
      <Sidebar />

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
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Theresia Pasingki Sollu
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tempat Lahir
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Indonesia
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jenis Kelamin
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Perempuan
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tanggal Lahir
              </p>{" "}
              <br />
              <p className='font-semibold'>
                17 Maret 2005
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Email
              </p>{" "}
              <br />
              <p className='font-semibold'>
                aabb@gmail.com
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Alamat Asal
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Perum. Aabb, Kel. A, Kec. A,
                Batam, Indonesia
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                No Handphone
              </p>{" "}
              <br />
              <p className='font-semibold'>
                +62 8xxxxxxxxxxx
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Alamat Domisili
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Jl. aabb, Kel. A, Kec. A,
                Surakarta, Indonesia
              </p>
            </div>
          </div>
        </section>

        {/* Data Pendidikan */}
        <section className='bg-white rounded-2xl shadow p-6 mb-6'>
          <h2 className='text-[#F53838] font-semibold mb-4 text-[22px]'>
            Data Pendidikan
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 text-sm text-black gap-y-5'>
            <div>
              <p className='text-[#636D7C]'>
                Asal Universitas:
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Universitas A
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Fakultas:
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Teknik
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jenjang Pendidikan:
              </p>{" "}
              <br />
              <p className='font-semibold'>S1</p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jurusan:
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Teknik Informatika
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Semester Saat Ini:
              </p>{" "}
              <br />
              <p className='font-semibold'>5</p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Nomor Induk Mahasiswa:
              </p>{" "}
              <br />
              <p className='font-semibold'>
                A524847890
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
            {/* Baris 1 */}
            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Durasi Magang
              </p>
              <p className='font-semibold'>
                3 Bulan
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Periode Mulai
              </p>
              <p className='font-semibold'>
                25 Februari 2025
              </p>
            </div>

            {/* Baris 2 */}
            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Bidang Penempatan
              </p>
              <p className='font-semibold'>IT</p>
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
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Robert
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                No Handphone
              </p>{" "}
              <br />
              <p className='font-semibold'>
                +62 8xxxxxxxxxxx
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Penempatan Magang
              </p>{" "}
              <br />
              <p className='font-semibold'>
                Divisi IT
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Email
              </p>{" "}
              <br />
              <p className='font-semibold'>
                aabb@gmail.com
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tanggal Mulai Magang
              </p>{" "}
              <br />
              <p className='font-semibold'>
                12 Februari 2025
              </p>
            </div>
          </div>
        </section>

        {/* berkas perserta magang */}
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
              Diterbitkan: 10 Juli 2025
            </p>

            <div className='flex flex-wrap mt-4 justify-between gap-4'>
              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#49CA7B] hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  setShowModal(true);
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
                  setShowModal(true);
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
                  setShowModal(true);
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
              Diterbitkan: 10 Juli 2025
            </p>

            <div className='flex flex-wrap mt-4 justify-between gap-4'>
              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#49CA7B] hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  setShowModal(true);
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
                  setShowModal(true);
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
                  setShowModal(true);
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
            <p className='text-red-500 mt-2 mb-2 flex items-center gap-2 font-semibold'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 18 18'
                fill='none'
              >
                <path
                  d='M8.99996 15.6667C10.7681 15.6667 12.4638 14.9644 13.714 13.7141C14.9642 12.4639 15.6666 10.7682 15.6666 9.00008C15.6666 7.23197 14.9642 5.53628 13.714 4.28604C12.4638 3.03579 10.7681 2.33341 8.99996 2.33341C7.23185 2.33341 5.53616 3.03579 4.28591 4.28604C3.03567 5.53628 2.33329 7.23197 2.33329 9.00008C2.33329 10.7682 3.03567 12.4639 4.28591 13.7141C5.53616 14.9644 7.23185 15.6667 8.99996 15.6667ZM8.99996 0.666748C10.0943 0.666748 11.1779 0.882296 12.189 1.30109C13.2 1.71987 14.1187 2.3337 14.8925 3.10752C15.6663 3.88135 16.2802 4.80001 16.699 5.81105C17.1177 6.8221 17.3333 7.90573 17.3333 9.00008C17.3333 11.2102 16.4553 13.3298 14.8925 14.8926C13.3297 16.4554 11.2101 17.3334 8.99996 17.3334C4.39163 17.3334 0.666626 13.5834 0.666626 9.00008C0.666626 6.78994 1.5446 4.67033 3.1074 3.10752C4.67021 1.54472 6.78982 0.666748 8.99996 0.666748ZM9.41663 4.83341V9.20841L13.1666 11.4334L12.5416 12.4584L8.16663 9.83341V4.83341H9.41663Z'
                  fill='#EC3136'
                />
              </svg>
              Belum Diterbitkan
            </p>

            <div className='flex flex-wrap mt-4 justify-between gap-4'>
              <Button
                className='text-sm font-semibold min-w-[300px] px-6 py-2 bg-[#49CA7B] hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2'
                onClick={() => {
                  setShowModal(true);
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
                  setShowModal(true);
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
                  setShowModal(true);
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

type FileDisplayProps = {
  label: string;
  file: UploadedFile;
};

const FileDisplay: React.FC<FileDisplayProps> = ({
  label,
  file,
}) => (
  <div className='w-auto'>
    <label className='block mb-2 font-medium text-sm text-[#636D7C]'>
      {label}
    </label>
    <div className='flex'>
      <div className='flex-1 border border-gray-300 rounded-l-md px-3 py-2 text-sm bg-[#F9F9F9] flex items-center'>
        {file.name}
      </div>
      <button
        className='bg-gray-300 hover:bg-gray-400 text-sm text-black px-4 py-2 rounded-r-md'
        onClick={() =>
          alert(`Preview file: ${file.name}`)
        }
      >
        Lihat
      </button>
    </div>
  </div>
);

export default InternshipDetail;
