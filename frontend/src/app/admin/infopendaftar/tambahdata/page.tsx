"use client";
import { Sidebar } from "../../sidebar/page";
import React, { useState } from "react";
import { Button } from "@/components/ui/button/page";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/popup/simpan/page";
// import { PendaftarService } from "@/service/api";

interface PendaftarDetail {
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

// Komponen InternshipInfoCard dipindah ke luar
const InternshipInfoCard: React.FC = () => {
  return (
    <div className='bg-white shadow-md rounded-2xl p-6 max-w-4x mb-6'>
      <h2 className='text-lg font-semibold text-red-600 mb-6'>
        Data Informasi Magang
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Kolom Kiri */}
        <div className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Supervisor/Mentor
            </label>
            <input
              type='text'
              placeholder='Masukkan Nama Supervisor/Mentor'
              className='w-full px-4 py-2 border rounded-md border-gray-300'
            />
            <input
              type='text'
              placeholder='Masukkan Nama Supervisor/Mentor'
              className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Penempatan Magang
            </label>
            <select className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'>
              <option className='text-gray-400'>
                Masukkan Divisi Penempatan Magang
              </option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Tanggal Mulai Magang
            </label>
            <input
              type='date'
              className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'
            />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className='flex flex-col gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              No Handphone
            </label>
            <input
              type='text'
              placeholder='+62 8xxxxxxxxx'
              className='w-full px-4 py-2 border rounded-md border-gray-300'
            />
            <input
              type='text'
              placeholder='+62 8xxxxxxxxx'
              className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email
            </label>
            <input
              type='email'
              placeholder='Masukkan Email Supervisor/Mentor'
              className='w-full px-4 py-2 border rounded-md border-gray-300'
            />
            <input
              type='email'
              placeholder='Masukkan Email Supervisor/Mentor'
              className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] =
    useState(false);
  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");
  return (
    <div className='flex min-h-screen bg-[#F5F4F7]'>
      <Sidebar />

      {/* Main Content */}
      <main className='flex-1 p-10 ml-64'>
        <h2 className='text-2xl font-semibold text-[#000] mb-6'>
          Data Masuk &gt;{" "}
          <span
            onClick={() => router.back()}
            className='hover:text-gray-400 cursor-pointer'
          >
            Data Pendaftar
          </span>{" "}
          &gt; Tambah Data
        </h2>

        {/* data pribadi */}
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

        {/* data informasi magang */}
        <InternshipInfoCard />

        {/* button */}
        <div className='flex gap-2 w-full md:w-auto flex-row-reverse'>
          <Button
            variant='outline'
            className='text-sm w-full md:w-auto bg-[#405385]'
            onClick={() => {
              setActionType("accept");
              setShowModal(true);
            }}
          >
            Simpan
          </Button>

          {/* Pop Up Konfirmasi */}
          {showModal && (
            <ConfirmationModal
              onClose={() => setShowModal(false)}
              onConfirm={() => {
                console.log("Confirmed");
              }}
              actionType={actionType}
            />
          )}
        </div>
      </main>
    </div>
  );
}
