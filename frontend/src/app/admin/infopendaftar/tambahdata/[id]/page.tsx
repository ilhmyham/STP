"use client";
import React, {
  useState,
  useEffect,
} from "react";
import { Button } from "@/components/ui/button/page";
import {
  useRouter,
  useParams,
} from "next/navigation";
import ConfirmationModal from "@/components/popup/simpan/page";
import { PendaftarService } from "@/service/api";
import { Sidebar } from "@/app/admin/sidebar/page";
import axios from "axios";

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

interface FormData {
  pendaftar_id: number;
  tanggal: string;
  tanggal_selesai: string;
  mentor: string;
  mentor_kedua: string;
  noHp: string;
  noHp_kedua: string;
  email: string;
  email_kedua: string;
  bidang_peminatan_id: string;
  status: string;
}

const InternshipInfoCard: React.FC<{
  formData: FormData;
  setFormData: React.Dispatch<
    React.SetStateAction<FormData>
  >;
}> = ({ formData, setFormData }) => {
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [bidangPeminatan, setBidangPeminatan] =
    useState<
      { id: number; nama_bidang: string }[] | []
    >([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/bidangPeminatans`
      )
      .then((response) => {
        setBidangPeminatan(response.data); // Menyimpan data bidang peminatan
      })
      .catch((error) => {
        console.error(
          "Error fetching bidang peminatan data:",
          error
        );
      });
  }, []);

  return (
    <div className='bg-white shadow-md rounded-2xl p-6 max-w-4x mb-6'>
      <h2 className='text-lg font-semibold text-red-600 mb-6'>
        Data Informasi Magang
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
              value={formData.bidang_peminatan_id}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded-md border-gray-300 text-gray-400'
            >
              <option value=''>
                Masukkan Divisi Penempatan Magang
              </option>
              {bidangPeminatan.map((bidang) => (
                <option
                  key={bidang.id}
                  value={bidang.id}
                >
                  {bidang.nama_bidang}
                </option>
              ))}
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
              name='tanggal_selesai'
              value={formData.tanggal_selesai}
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
  );
};

export default function Home() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [pendaftar, setPendaftar] =
    useState<PendaftarDetail | null>(null);
  const [showModal, setShowModal] =
    useState(false);
  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");

  const [formData, setFormData] =
    useState<FormData>({
      pendaftar_id: 0,
      tanggal: "",
      tanggal_selesai: "",
      mentor: "",
      mentor_kedua: "",
      noHp: "",
      noHp_kedua: "",
      email: "",
      email_kedua: "",
      bidang_peminatan_id: "",
      status: "onGoing",
    });

  useEffect(() => {
    if (id) {
      PendaftarService.getById(Number(id))
        .then((data) => {
          setPendaftar(data);
          setFormData((prev) => ({
            ...prev,
            pendaftar_id: data.id_pendaftar,
          }));
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pesertas`,
        formData
      );
      console.log(
        "Data berhasil dikirim:",
        response.data
      );
      alert("Data berhasil disimpan!");
      router.push(
        `/admin/infopendaftar/tambahdata/sunting/${response.data.data.id}`
      );
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response
      ) {
        console.error(
          "Detail error:",
          error.response.data
        );
        alert(
          `Error: ${JSON.stringify(
            error.response.data.errors
          )}`
        );
      } else {
        console.error(
          "Gagal mengirim data:",
          error
        );
        alert(
          "Terjadi kesalahan saat menyimpan data."
        );
      }
    }
  };

  if (!pendaftar) {
    return (
      <div className='ml-64 p-10'>Loading...</div>
    );
  }

  return (
    <div className='flex min-h-screen bg-[#F5F4F7]'>
      <Sidebar />
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
                {pendaftar.nama}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Tempat Lahir
              </p>
              <br />
              <p className='font-semibold'>
                {pendaftar.tempat_lahir}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Jenis Kelamin
              </p>
              <br />
              <p className='font-semibold'>
                {pendaftar.jenis_kelamin}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Tanggal Lahir
              </p>
              <br />
              <p className='font-semibold'>
                {pendaftar.tanggal_lahir}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Email
              </p>
              <br />
              <p className='font-semibold'>
                {pendaftar.email}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Alamat Asal
              </p>
              <br />
              <p className='font-semibold'>
                {pendaftar.alamat_asal}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                No Handphone
              </p>
              <br />
              <p className='font-semibold'>
                {pendaftar.noHP}
              </p>
            </div>
            <div>
              <p className='text-[#636D7C]'>
                Alamat Domisili
              </p>
              <br />
              <p className='font-semibold'>
                {pendaftar.alamat_domisili}
              </p>
            </div>
          </div>
        </section>

        <InternshipInfoCard
          formData={formData}
          setFormData={setFormData}
        />

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

          {showModal && (
            <ConfirmationModal
              onClose={() => setShowModal(false)}
              onConfirm={handleSubmit}
              actionType={actionType}
            />
          )}
        </div>
      </main>
    </div>
  );
}
