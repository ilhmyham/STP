"use client";

import { useParams } from "next/navigation";
import { AdminDetailShell } from "@/features/admin/shared/components/AdminShell";
import { DetailBreadcrumb } from "@/features/admin/shared/components/AdminBreadcrumb";
import {
  PendaftarEducationDetailSection,
  PendaftarPersonalDetailSection,
} from "@/features/admin/infopendaftar/components/PendaftarDetailSections";
import { PendaftarMagangSection } from "@/features/admin/infopendaftar/components/PendaftarMagangSection";
import { PendaftarStatusActions } from "@/features/admin/infopendaftar/components/PendaftarStatusActions";
import { usePendaftarDetail } from "@/features/admin/infopendaftar/hooks/usePendaftarDetail";

const CENTERED =
  "flex-1 p-6 md:p-8 ml-0 md:ml-64 flex justify-center items-center";

export default function InternshipDetail() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const {
    data,
    loading,
    error,
    uploadedFiles,
    updateStatus,
  } = usePendaftarDetail(id);

  if (loading) {
    return (
      <AdminDetailShell contentClassName={CENTERED}>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </AdminDetailShell>
    );
  }

  if (error) {
    return (
      <AdminDetailShell contentClassName={CENTERED}>
        <div className='text-red-500'>{error}</div>
      </AdminDetailShell>
    );
  }

  if (!data) {
    return (
      <AdminDetailShell contentClassName={CENTERED}>
        <div>Data pendaftar tidak ditemukan</div>
      </AdminDetailShell>
    );
  }

  return (
    <AdminDetailShell>
      <DetailBreadcrumb />

      <PendaftarPersonalDetailSection data={data} />
      <PendaftarEducationDetailSection data={data} />
      <PendaftarMagangSection
        data={data}
        uploadedFiles={uploadedFiles}
      />

      <PendaftarStatusActions
        id={data.id_pendaftar}
        status={data.status}
        onConfirm={updateStatus}
      />
    </AdminDetailShell>
  );
}
