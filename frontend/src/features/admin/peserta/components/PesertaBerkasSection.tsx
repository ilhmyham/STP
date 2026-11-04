import { formatDate } from "../lib/formatDate";
import type { PesertaBerkasController } from "../hooks/usePesertaBerkas";
import { PesertaBerkasCard } from "./PesertaBerkasCard";
import type {
  PesertaBerkasRecord,
  PesertaDetail,
  PesertaUploadedFiles,
} from "../types";

const publishedDate = (
  record?: PesertaBerkasRecord
): React.ReactNode => {
  if (!record) return "-";
  return record.created_at
    ? formatDate(record.created_at)
    : "Tanggal tidak tersedia";
};

export const PesertaBerkasSection = ({
  data,
  uploadedFiles,
  berkas,
}: {
  data: PesertaDetail | null;
  uploadedFiles: PesertaUploadedFiles;
  berkas: PesertaBerkasController;
}) => (
  <section>
    <h2 className='text-2xl font-semibold mb-4'>
      Berkas Perserta Magang
    </h2>

    <PesertaBerkasCard
      title='Surat Balasan Magang'
      publishedLabel='Diterbitkan: '
      publishedAt={publishedDate(data?.surat_balasan)}
      file={uploadedFiles.surat_balasan}
      type='surat_balasan'
      uploadInputRef={berkas.suratBalasanInputRef}
      updateInputRef={berkas.suratBalasanUpdateInputRef}
      onUploadClick={berkas.handleUploadClick}
      onFileChange={berkas.handleFileChange}
      onUpdateFile={berkas.handleUpdateFile}
    />

    <PesertaBerkasCard
      title='Surat Penilaian Magang'
      publishedLabel='Diterbitkan:'
      publishedAt={publishedDate(data?.surat_penilaian)}
      file={uploadedFiles.surat_penilaian}
      type='surat_penilaian'
      uploadInputRef={berkas.suratPenilaianInputRef}
      updateInputRef={berkas.suratPenilaianUpdateInputRef}
      onUploadClick={berkas.handleUploadClick}
      onFileChange={berkas.handleFileChange}
      onUpdateFile={berkas.handleUpdateFile}
    />

    <PesertaBerkasCard
      title='Sertifikat Magang'
      publishedLabel='Diterbitkan :'
      publishedAt={publishedDate(data?.sertifikat_magang)}
      file={uploadedFiles.sertifikat_magang}
      type='sertifikat_magang'
      editLabel='Ubah Dokumen perbaikan'
      uploadInputRef={berkas.sertifikatMagangInputRef}
      updateInputRef={berkas.sertifikatMagangUpdateInputRef}
      onUploadClick={berkas.handleUploadClick}
      onFileChange={berkas.handleFileChange}
      onUpdateFile={berkas.handleUpdateFile}
    />
  </section>
);
