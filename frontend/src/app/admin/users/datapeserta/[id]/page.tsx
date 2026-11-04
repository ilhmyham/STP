"use client";

import { useParams } from "next/navigation";
import { AdminDetailShell } from "@/features/admin/shared/components/AdminShell";
import { DetailBreadcrumb } from "@/features/admin/shared/components/AdminBreadcrumb";
import {
  PesertaMagangSection,
  PesertaPersonalSection,
} from "@/features/admin/peserta/components/PesertaDetailSections";
import { PesertaInfoSection } from "@/features/admin/peserta/components/PesertaInfoSection";
import { PesertaBerkasSection } from "@/features/admin/peserta/components/PesertaBerkasSection";
import { usePesertaDetail } from "@/features/admin/peserta/hooks/usePesertaDetail";
import { usePesertaBerkas } from "@/features/admin/peserta/hooks/usePesertaBerkas";

export default function InternshipDetail() {
  const params = useParams();
  const idPeserta = params?.id as string;
  const { data, loading, uploadedFiles } =
    usePesertaDetail(idPeserta);
  const berkas = usePesertaBerkas({
    idPeserta,
    data,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminDetailShell>
      <DetailBreadcrumb />

      <PesertaPersonalSection data={data} />
      <PesertaMagangSection
        data={data}
        uploadedFiles={uploadedFiles}
      />
      <PesertaInfoSection data={data} />
      <PesertaBerkasSection
        data={data}
        uploadedFiles={uploadedFiles}
        berkas={berkas}
      />
    </AdminDetailShell>
  );
}
