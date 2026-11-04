import { PendaftarFileDisplay } from "./PendaftarFileDisplay";
import type {
  PendaftarInfo,
  PendaftarUploadedFiles,
} from "../types";

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

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const PendaftarMagangSection = ({
  data,
  uploadedFiles,
}: {
  data: PendaftarInfo;
  uploadedFiles: PendaftarUploadedFiles;
}) => (
  <section className='bg-white rounded-2xl shadow p-6 mb-6'>
    <h2 className='text-[#F53838] font-semibold mb-4 text-[22px]'>
      Data Magang
    </h2>

    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm'>
      <div className='flex flex-col gap-y-5'>
        <p className='text-[#636D7C]'>Durasi Magang</p>
        <p className='font-semibold'>{data.durasi}</p>
      </div>
      <div className='flex flex-col gap-y-5'>
        <p className='text-[#636D7C]'>Periode Mulai</p>
        <p className='font-semibold'>
          {formatDate(data.periodic_mulai)}
        </p>
      </div>

      <div className='flex flex-col gap-y-5'>
        <p className='text-[#636D7C]'>
          Bidang Penempatan
        </p>
        <p className='font-semibold'>
          {getDivisiName(data.bidang_peminatan)}
        </p>
      </div>

      <div>{/* empty for alignment */}</div>

      <div>
        <PendaftarFileDisplay
          label='CV/Portofolio'
          file={uploadedFiles.cv}
        />
      </div>
      <div>
        <PendaftarFileDisplay
          label='Surat Permohonan/Rekomendasi Magang'
          file={uploadedFiles.suratPermohonan}
        />
      </div>

      <div>
        <PendaftarFileDisplay
          label='Proposal Magang'
          file={uploadedFiles.proposal}
        />
      </div>
      <div>
        <PendaftarFileDisplay
          label='Dokumen Pendukung Lainnya'
          file={uploadedFiles.dokumenPendukung}
        />
      </div>
    </div>
  </section>
);
