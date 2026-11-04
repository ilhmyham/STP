import { DataSection } from "../../shared/components/DataSection";
import { formatDate } from "../lib/formatDate";
import { PesertaFileDisplay } from "./PesertaFileDisplay";
import type {
  PesertaDetail,
  PesertaUploadedFiles,
} from "../types";

export const PesertaPersonalSection = ({
  data,
}: {
  data: PesertaDetail | null;
}) => (
  <DataSection
    title='Data Pribadi'
    withBreak
    fields={[
      {
        label: "Nama Lengkap",
        value: data?.pendaftar.nama,
      },
      {
        label: "Tempat Lahir",
        value: data?.pendaftar.tempat_lahir,
      },
      {
        label: "Jenis Kelamin",
        value: data?.pendaftar.jenis_kelamin,
      },
      {
        label: "Tanggal Lahir",
        value: data?.pendaftar.tanggal_lahir
          ? formatDate(data.pendaftar.tanggal_lahir)
          : "Tanggal tidak tersedia",
      },
      {
        label: "Email",
        value: data?.pendaftar.email,
      },
      {
        label: "Alamat Asal",
        value: data?.pendaftar.alamat_asal,
      },
      {
        label: "No Handphone",
        value: data?.pendaftar.noHP,
      },
      {
        label: "Alamat Domisili",
        value: data?.pendaftar.alamat_domisili,
      },
    ]}
  />
);

export const PesertaMagangSection = ({
  data,
  uploadedFiles,
}: {
  data: PesertaDetail | null;
  uploadedFiles: PesertaUploadedFiles;
}) => (
  <section className='bg-white rounded-2xl shadow p-6 mb-6'>
    <h2 className='text-[#F53838] font-semibold mb-4 text-[22px]'>
      Data Magang
    </h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm'>
      <div className='flex flex-col gap-y-5'>
        <p className='text-[#636D7C]'>Durasi Magang</p>
        <p className='font-semibold'>
          {data?.pendaftar.durasi}
        </p>
      </div>
      <div className='flex flex-col gap-y-5'>
        <p className='text-[#636D7C]'>Periode Mulai</p>
        <p className='font-semibold'>
          {data?.pendaftar.periodic_mulai
            ? formatDate(data.pendaftar.periodic_mulai)
            : "Tanggal tidak tersedia"}
        </p>
      </div>

      <div className='flex flex-col gap-y-5'>
        <p className='text-[#636D7C]'>
          Bidang Penempatan
        </p>
        <p className='font-semibold'>
          {data?.bidang_peminatan?.nama_bidang}
        </p>
      </div>

      <div>{/* kosong untuk baris sejajar */}</div>

      <div>
        <PesertaFileDisplay
          label='CV/Portofolio'
          file={uploadedFiles.cv}
        />
      </div>
      <div>
        <PesertaFileDisplay
          label='Surat Permohonan/Rekomendasi Magang'
          file={uploadedFiles.suratPermohonan}
        />
      </div>

      <div>
        <PesertaFileDisplay
          label='Proposal Magang'
          file={uploadedFiles.proposal}
        />
      </div>
      <div>
        <PesertaFileDisplay
          label='Dokumen Pendukung Lainnya'
          file={uploadedFiles.dokumenPendukung}
        />
      </div>
    </div>
  </section>
);

