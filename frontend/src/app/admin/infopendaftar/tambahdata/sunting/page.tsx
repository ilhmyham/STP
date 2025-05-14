"use client";
import { Sidebar } from "../../../sidebar/page";
import React, { useState } from "react";
import { Button } from "@/components/ui/button/page";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/popup/simpan/page";

// Komponen InternshipInfoCard dipindah ke luar
const InternshipInfoCard: React.FC = () => {
  return (
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
          <p className='font-semibold'>Robert</p>
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
          <p className='text-[#636D7C]'>Email</p>{" "}
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

        <InternshipInfoCard />

        {/* button */}
        <div className='flex gap-2 w-full md:w-auto flex-row-reverse'>
          <Button
            variant='sunting'
            className='text-sm w-full md:w-auto bg-[#405385]'
            onClick={() =>
              (window.location.href = `/admin/infopendaftar/tambahdata`)
            }
          >
            sunting
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
