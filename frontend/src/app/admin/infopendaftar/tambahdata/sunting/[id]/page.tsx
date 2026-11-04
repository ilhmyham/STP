"use client";

import { use } from "react";
import { Button } from "@/components/ui/button/page";
import Sidebar from "@/components/Sidebar";
import { PendaftarPersonalData } from "@/features/admin/infopendaftar/components/PendaftarPersonalData";
import { InternshipInfoFields } from "@/features/admin/infopendaftar/components/InternshipInfoFields";
import { InternshipInfoSummary } from "@/features/admin/infopendaftar/components/InternshipInfoSummary";
import { usePesertaEditForm } from "@/features/admin/infopendaftar/hooks/usePesertaEditForm";
import { FormBreadcrumb } from "@/features/admin/shared/components/AdminBreadcrumb";
import { AdminFormShell } from "@/features/admin/shared/components/AdminShell";

const EDIT_BIDANG_OPTIONS = [
  { id: 1, nama_bidang: "Divisi 1" },
  { id: 2, nama_bidang: "Divisi 2" },
] as const;

export default function Home({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    pendaftar,
    peserta,
    loading,
    formData,
    handleChange,
    handleSubmit,
  } = usePesertaEditForm(id);

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

  return (
    <AdminFormShell>
      <FormBreadcrumb />

      <PendaftarPersonalData data={pendaftar ?? {}} fallback />

      <InternshipInfoSummary peserta={peserta} />

      <form onSubmit={handleSubmit}>
        <InternshipInfoFields
          title='Edit Informasi Magang'
          formData={formData}
          onChange={handleChange}
          bidangOptions={EDIT_BIDANG_OPTIONS}
          tanggalSelesaiName='tanggal_selesai}'
        />

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
    </AdminFormShell>
  );
}
