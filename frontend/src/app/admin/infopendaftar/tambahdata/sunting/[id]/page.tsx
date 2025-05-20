"use client";
import React, {
  useState,
  useEffect,
} from "react";
import { use } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button/page";
import {
  useRouter,
  useParams,
} from "next/navigation";
import ConfirmationModal from "@/components/popup/simpan/page";
import { Sidebar } from "@/app/admin/sidebar/page";

export interface PendaftarData {
  id_pendaftar: number;
  nama: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  email: string;
  noHP: string;
  alamat_asal: string;
  alamat_domisili: string;
  asal_instansi: string;
  jenjang_pendidikan: number;
  fakultas: string;
  program_studi: string;
  nim: string;
  semester: string;
  durasi: string;
  periodic_mulai: string;
  bidang_peminatan: number;
  id_berkas_pendaftar: number;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PesertaData {
  mentor: string;
  mentor_kedua: string;
  noHp: string;
  noHp_kedua: string;
  bidang_peminatan_id: string;
  email: string;
  email_kedua: string;
  tanggal: string;
  tanggal_selesai: string;

  pendaftar?: PendaftarData;
}

const InternshipInfoCard: React.FC<{
  peserta: PesertaData | null;
}> = ({ peserta }) => {
  return (
    <section className='bg-white rounded-2xl shadow p-6 mb-6'>
      <h2 className='text-[#F53838] font-semibold mb-4 text-[22px]'>
        Data Informasi Magang
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 text-sm text-black gap-y-5'>
        <div>
          <p className='text-[#636D7C]'>
            Supervisor/Mentor
          </p>
          <p className='font-semibold'>
            {peserta?.mentor || "-"}
          </p>
        </div>

        <div>
          <p className='text-[#636D7C]'>
            No Handphone
          </p>
          <p className='font-semibold'>
            {peserta?.noHp || "-"}
          </p>
        </div>

        <div>
          <p className='text-[#636D7C]'>
            Penempatan Magang
          </p>
          <p className='font-semibold'>
            {peserta?.bidang_peminatan_id || "-"}
          </p>
        </div>

        <div>
          <p className='text-[#636D7C]'>Email</p>
          <p className='font-semibold'>
            {peserta?.email || "-"}
          </p>
        </div>

        <div>
          <p className='text-[#636D7C]'>
            Tanggal Mulai Magang
          </p>
          <p className='font-semibold'>
            {peserta?.tanggal || "-"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [showModal, setShowModal] =
    useState(false);
  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");
  const [pendaftar, setPendaftar] =
    useState<PendaftarData | null>(null);
  const [peserta, setPeserta] =
    useState<PesertaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] =
    useState<PesertaData>({
      mentor: "",
      mentor_kedua: "",
      noHp: "",
      noHp_kedua: "",
      email: "",
      email_kedua: "",
      bidang_peminatan_id: "",
      tanggal: "",
      tanggal_selesai: "",
    });

  // Unwrap params dengan use()
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/pesertas/${id}`
        );
        const pesertaData = response.data.data;
        setPeserta(pesertaData);
        setPendaftar(pesertaData.pendaftar);

        // Inisialisasi formData dengan data dari API
        setFormData({
          mentor: pesertaData.mentor || "",
          mentor_kedua:
            pesertaData.mentor_kedua || "",
          noHp: pesertaData.noHp || "",
          noHp_kedua:
            pesertaData.noHp_kedua || "",
          email: pesertaData.email || "",
          email_kedua:
            pesertaData.email_kedua || "",
          bidang_peminatan_id:
            pesertaData.bidang_peminatan_id || "",
          tanggal: pesertaData.tanggal
            ? new Date(pesertaData.tanggal)
                .toISOString()
                .split("T")[0]
            : "",
          tanggal_selesai:
            pesertaData.tanggal_selesai
              ? new Date(
                  pesertaData.tanggal_selesai
                )
                  .toISOString()
                  .split("T")[0]
              : "",
        });
      } catch (error) {
        console.error(
          "Error fetching data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className='flex min-h-screen bg-[#F5F4F7]'>
        <Sidebar />
        <main className='flex-1 p-10 ml-64 flex items-center justify-center'>
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Perbarui formData dengan nilai input
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault(); // Mencegah refresh halaman

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/pesertas/${id}`, // API endpoint untuk update data
        formData // data yang akan dikirim
      );
      console.log(
        "Data successfully updated:",
        response.data
      );
      alert("Data successfully updated!");
      router.push("/admin/users");
    } catch (error) {
      console.error(
        "Error during update:",
        error
      );
      alert(
        "There was an error updating the data."
      );
    }
  };

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
              </p>
              <p className='font-semibold'>
                {peserta?.pendaftar?.nama || "-"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tempat Lahir
              </p>
              <p className='font-semibold'>
                {pendaftar?.tempat_lahir || "-"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jenis Kelamin
              </p>
              <p className='font-semibold'>
                {pendaftar?.jenis_kelamin || "-"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tanggal Lahir
              </p>
              <p className='font-semibold'>
                {pendaftar?.tanggal_lahir || "-"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Email
              </p>
              <p className='font-semibold'>
                {pendaftar?.email || "-"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Alamat Asal
              </p>
              <p className='font-semibold'>
                {pendaftar?.alamat_asal || "-"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                No Handphone
              </p>
              <p className='font-semibold'>
                {peserta?.pendaftar?.noHP || "-"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Alamat Domisili
              </p>
              <p className='font-semibold'>
                {pendaftar?.alamat_domisili ||
                  "-"}
              </p>
            </div>
          </div>
        </section>
        <InternshipInfoCard peserta={peserta} />
        <form onSubmit={handleSubmit}>
          <div className='bg-white shadow-md rounded-2xl p-6 max-w-4x mb-6'>
            <h2 className='text-lg font-semibold text-red-600 mb-6'>
              Edit Informasi Magang
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='flex flex-col gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Supervisor/Mentor
                  </label>
                  <input
                    type='text'
                    name='mentor'
                    value={formData.mentor}
                    onChange={handleChange}
                    placeholder='Masukkan Nama Supervisor/Mentor'
                    className='w-full px-4 py-2 border rounded-md border-gray-300'
                  />
                  <input
                    type='text'
                    name='mentor_kedua'
                    value={formData.mentor_kedua}
                    onChange={handleChange}
                    placeholder='Masukkan Nama Supervisor/Mentor Kedua'
                    className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Penempatan Magang
                  </label>
                  <select
                    name='bidang_peminatan_id'
                    value={
                      formData.bidang_peminatan_id
                    }
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'
                  >
                    <option value=''>
                      Masukkan Divisi Penempatan
                      Magang
                    </option>
                    <option value='1'>
                      Divisi 1
                    </option>
                    <option value='2'>
                      Divisi 2
                    </option>
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Tanggal Mulai Magang
                  </label>
                  <input
                    type='date'
                    name='tanggal'
                    value={formData.tanggal}
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Tanggal Selesai Magang
                  </label>
                  <input
                    type='date'
                    name='tanggal_selesai}'
                    value={
                      formData.tanggal_selesai
                    }
                    onChange={handleChange}
                    className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'
                  />
                </div>
              </div>

              <div className='flex flex-col gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    No Handphone
                  </label>
                  <input
                    type='text'
                    name='noHp'
                    value={formData.noHp}
                    onChange={handleChange}
                    placeholder='+62 8xxxxxxxxx'
                    className='w-full px-4 py-2 border rounded-md border-gray-300'
                  />
                  <input
                    type='text'
                    name='noHp_kedua'
                    value={formData.noHp_kedua}
                    onChange={handleChange}
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
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Masukkan Email Supervisor/Mentor'
                    className='w-full px-4 py-2 border rounded-md border-gray-300'
                  />
                  <input
                    type='email'
                    name='email_kedua'
                    value={formData.email_kedua}
                    onChange={handleChange}
                    placeholder='Masukkan Email Supervisor/Mentor Kedua'
                    className='w-full mt-2 px-4 py-2 border rounded-md border-gray-300'
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tombol submit */}
          <div className='flex gap-2 w-full md:w-auto flex-row-reverse'>
            <Button
              variant='sunting'
              className='text-sm w-full md:w-auto bg-[#405385]'
              type='submit'
            >
              Simpan
            </Button>
          </div>
        </form>
        ;
      </main>
    </div>
  );
}
