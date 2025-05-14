"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button/page";
import { Sidebar } from "../../sidebar/page";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/popup/confirm/page";
import { PendaftarService } from "@/service/api";
import { useParams } from "next/navigation";

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
};

// interface Persertas {
//   id: number;
// }

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
  const [isAccepted, setIsAccepted] =
    useState(false);
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFiles>({
      cv: { name: "", size: "" },
      proposal: { name: "", size: "" },
      suratPermohonan: { name: "", size: "" },
      dokumenPendukung: { name: "", size: "" },
    });

  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");
  const router = useRouter();
  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        if (!id) return;

        const fetchedData =
          await PendaftarService.getById(
            Number(id)
          );
        setData(fetchedData);
        setIsAccepted(
          fetchedData.status === "diterima"
        );

        const baseUrl =
          "http://127.0.0.1:8000/storage";
        // Set uploaded files from API data
        setUploadedFiles({
          cv: {
            name: "CV.pdf",
            size: "2.5 MB",
            url: fetchedData.berkas?.cv
              ? `${baseUrl}/${fetchedData.berkas.cv}`
              : undefined,
          },
          proposal: {
            name: "Proposal.pdf",
            size: "1.8 MB",
            url: fetchedData.berkas?.proposal
              ? `${baseUrl}/${fetchedData.berkas.proposal}`
              : undefined,
          },
          suratPermohonan: {
            name: "Surat Permohonan.pdf",
            size: "1.2 MB",
            url: fetchedData.berkas
              ?.surat_rekomendasi
              ? `${baseUrl}/${fetchedData.berkas.surat_rekomendasi}`
              : undefined,
          },
          dokumenPendukung: {
            name: "Dokumen Pendukung.zip",
            size: "4.7 MB",
            url: fetchedData.berkas?.dok_pendukung
              ? `${baseUrl}/${fetchedData.berkas.dok_pendukung}`
              : undefined,
          },
        });
      } catch (err) {
        setError("Gagal memuat detail data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const handleConfirm = async () => {
    try {
      const newStatus =
        actionType === "accept"
          ? "diterima"
          : "ditolak";
      await PendaftarService.updateStatus(
        Number(id),
        newStatus
      );

      if (actionType === "accept") {
        setIsAccepted(true);
      } else {
        setIsAccepted(false);
      }

      // Refresh data after status update
      const fetchedData =
        await PendaftarService.getById(
          Number(id)
        );
      setData(fetchedData);
    } catch (err) {
      console.error(
        "Gagal mengupdate status:",
        err
      );
      setError("Gagal mengupdate status");
    } finally {
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className='bg-[#F4F3F6] min-h-screen flex'>
        <Sidebar />
        <div className='flex-1 p-6 md:p-8 ml-0 md:ml-64 flex justify-center items-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-[#F4F3F6] min-h-screen flex'>
        <Sidebar />
        <div className='flex-1 p-6 md:p-8 ml-0 md:ml-64 flex justify-center items-center'>
          <div className='text-red-500'>
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='bg-[#F4F3F6] min-h-screen flex'>
        <Sidebar />
        <div className='flex-1 p-6 md:p-8 ml-0 md:ml-64 flex justify-center items-center'>
          <div>
            Data pendaftar tidak ditemukan
          </div>
        </div>
      </div>
    );
  }

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
              </p>
              <p className='font-semibold'>
                {data.nama}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tempat Lahir
              </p>
              <p className='font-semibold'>
                {data.tempat_lahir}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jenis Kelamin
              </p>
              <p className='font-semibold'>
                {data.jenis_kelamin === "pria"
                  ? "Laki-laki"
                  : "Perempuan"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Tanggal Lahir
              </p>
              <p className='font-semibold'>
                {new Date(
                  data.tanggal_lahir
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Email
              </p>
              <p className='font-semibold'>
                {data.email}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Alamat Asal
              </p>
              <p className='font-semibold'>
                {data.alamat_asal}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                No Handphone
              </p>
              <p className='font-semibold'>
                {data.noHP}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Alamat Domisili
              </p>
              <p className='font-semibold'>
                {data.alamat_domisili}
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
              </p>
              <p className='font-semibold'>
                {data.asal_instansi}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Fakultas:
              </p>
              <p className='font-semibold'>
                {data.fakultas || "-"}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jenjang Pendidikan:
              </p>
              <p className='font-semibold'>
                {data.jenjang_pendidikan === "1"
                  ? "S1"
                  : data.jenjang_pendidikan ===
                    "2"
                  ? "S2"
                  : data.jenjang_pendidikan ===
                    "3"
                  ? "S3"
                  : data.jenjang_pendidikan}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Jurusan:
              </p>
              <p className='font-semibold'>
                {data.jurusan}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Semester Saat Ini:
              </p>
              <p className='font-semibold'>
                {data.semester}
              </p>
            </div>

            <div>
              <p className='text-[#636D7C]'>
                Nomor Induk Mahasiswa:
              </p>
              <p className='font-semibold'>
                {data.nim}
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
                {data.durasi}
              </p>
            </div>
            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Periode Mulai
              </p>
              <p className='font-semibold'>
                {new Date(
                  data.periodic_mulai
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className='flex flex-col gap-y-5'>
              <p className='text-[#636D7C]'>
                Bidang Penempatan
              </p>
              <p className='font-semibold'>
                {getDivisiName(
                  data.bidang_peminatan
                )}
              </p>
            </div>

            <div>{/* empty for alignment */}</div>

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
            className={`text-sm w-full md:w-auto ${
              data.status === "diterima"
                ? "bg-[#405385] hover:bg-[#344971] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() =>
              data.status === "diterima" &&
              router.push(
                `/admin/infopendaftar/tambahdata/${data.id_pendaftar}`
              )
            }
            disabled={data.status !== "diterima"}
          >
            Tambah Data
          </Button>
          <div className='flex gap-2 w-full md:w-auto'>
            <Button
              variant='destructive'
              className={`text-sm w-full flex items-center justify-center gap-2 px-4 py-2 ${
                data.status === "ditolak"
                  ? "opacity-50 bg-gray-400 hover:bg-gray-400"
                  : ""
              }`}
              onClick={() => {
                setActionType("reject");
                setShowModal(true);
              }}
              disabled={data.status === "ditolak"}
            >
              <Image
                src='/icons/tolak.svg'
                alt='Tolak'
                width={24}
                height={24}
                className={
                  data.status === "ditolak"
                    ? "opacity-70"
                    : ""
                }
              />
              Tolak
            </Button>

            <Button
              className={`text-sm w-full ${
                data.status === "diterima"
                  ? "bg-gray-400 hover:bg-gray-400 opacity-50"
                  : "bg-[#2EBB62] hover:bg-green-700"
              } flex items-center justify-center gap-2 px-4 py-2`}
              onClick={() => {
                setActionType("accept");
                setShowModal(true);
              }}
              disabled={
                data.status === "diterima"
              }
            >
              <Image
                src='/icons/centang.svg'
                alt='Terima'
                width={24}
                height={24}
                className={
                  data.status === "diterima"
                    ? "opacity-70"
                    : ""
                }
              />
              Terima
            </Button>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <ConfirmationModal
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirm}
            actionType={actionType}
          />
        )}
      </div>
    </div>
  );
};

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
        className={`bg-gray-300 hover:bg-gray-400 text-sm text-black px-4 py-2 rounded-r-md ${
          !file.url
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
        onClick={() =>
          file.url &&
          window.open(file.url, "_blank")
        }
        disabled={!file.url}
      >
        Lihat
      </button>
    </div>
  </div>
);

export default InternshipDetail;
