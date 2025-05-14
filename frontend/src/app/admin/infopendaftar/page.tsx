"use client"; // karena menggunakan hooks dan komponen client-side

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button/page";
import { Sidebar } from "../sidebar/page"; // pastikan path-nya sesuai struktur proyekmu
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/popup/confirm/page";
import { PendaftarService } from "@/service/api";
import { useParams } from "next/navigation";

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

interface PendaftarDetail {
  id_pendaftar: number;
  nama: string;
  email: string;
  nomor_hp: string;
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
  universitas: string;
  fakultas: string;
  jenjang: string;
  jurusan: string;
  semester: number;
  nim: string;
  durasi_magang: string;
  periode_mulai: string;
}

const getDivisiName = (
  bidangPeminatan: number
): string => {
  const divisiMap: Record<number, string> = {
    1: "Divisi Sosmed",
    2: "Divisi IT",
    3: "Divisi Marketing",
  };

  return (
    divisiMap[bidangPeminatan] ||
    `Divisi (ID: ${bidangPeminatan})`
  );
};

export const InternshipDetail = () => {
  const params = useParams();
  const id = params?.id;
  const [data, setData] =
    useState<PendaftarDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<
    string | null
  >(null);
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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!id) return;

        const fetchedData =
          await PendaftarService.getById(
            Number(id)
          );
        setData(fetchedData);
      } catch (err) {
        setError("Gagal memuat detail data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");
  const router = useRouter();
  const [showModal, setShowModal] =
    useState(false);

  const handleConfirm = () => {
    console.log("Data diterima");
  };

  const handleAccept = async () => {
    if (!data?.id_pendaftar) return;
    try {
      await PendaftarService.updateStatus(
        data.id_pendaftar,
        "terima"
      );
      alert(
        "Status berhasil diubah menjadi 'terima'"
      );
      router.push("/admin"); // redirect setelah update jika perlu
    } catch (error) {
      console.error(
        "Gagal mengubah status:",
        error
      );

      alert(
        "Terjadi kesalahan saat mengubah status"
      );
    }
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
                {data?.nama}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tempat Lahir
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.tempat_lahir}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jenis Kelamin
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.jenis_kelamin}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tanggal Lahir
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.tanggal_lahir}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Email
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.email}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Alamat Asal
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.alamat_asal}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                No Handphone
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.nomor_hp}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Alamat Domisili
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.alamat_domisili}
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
                {data?.universitas}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Fakultas:
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.fakultas}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jenjang Pendidikan:
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.jenjang}
              </p>
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
              <p className='font-semibold'>
                {data?.semester}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Nomor Induk Mahasiswa:
              </p>{" "}
              <br />
              <p className='font-semibold'>
                {data?.nim}
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
                {data?.durasi_magang}
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Periode Mulai
              </p>
              <p className='font-semibold'>
                {data?.durasi_magang}
              </p>
            </div>

            {/* Baris 2 */}
            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Bidang Penempatan
              </p>
              <p className='font-semibold'>
                {data?.bidang_peminatan}
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

        {/* Action Buttons */}
        <div className='flex flex-col md:flex-row md:justify-between gap-4'>
          <Button
            variant='outline'
            className='text-sm w-full md:w-auto bg-[#405385]'
            onClick={() =>
              (window.location.href = `/admin/infopendaftar/tambahdata/}`)
            }
          >
            Tambah Data
          </Button>
          <div className='flex gap-2 w-full md:w-auto'>
            <Button
              variant='destructive'
              className='text-sm w-full flex items-center justify-center gap-2 px-4 py-2'
              onClick={() => {
                setActionType("reject");
                setShowModal(true);
              }}
            >
              <img
                src='/icons/tolak.svg'
                alt=''
                width={24}
                height={24}
              />
              Tolak
            </Button>

            <Button
              className='text-sm w-full bg-[#2EBB62] hover:bg-green-700 flex items-center justify-center gap-2 px-4 py-2'
              onClick={() => {
                handleAccept;
                setShowModal(true);
              }}
            >
              <img
                src='/icons/centang.svg'
                alt=''
                width={24}
                height={24}
              />
              Terima
            </Button>
          </div>
        </div>

        {/* Pop Up Konfirmasi */}
        {showModal && (
          <ConfirmationModal
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              console.log("Confirmed");
              // Lakukan aksi submit / tolak sesuai actionType
            }}
            actionType={actionType} // Kirim contextnya
          />
        )}
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
