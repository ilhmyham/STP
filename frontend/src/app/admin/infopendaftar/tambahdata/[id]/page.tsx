"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button/page";
import ConfirmationModal from "@/components/popup/simpan/page";
import { AdminFormShell } from "@/features/admin/shared/components/AdminShell";
import { FormBreadcrumb } from "@/features/admin/shared/components/AdminBreadcrumb";
import { PendaftarPersonalData } from "@/features/admin/infopendaftar/components/PendaftarPersonalData";
import { InternshipInfoFields } from "@/features/admin/infopendaftar/components/InternshipInfoFields";
import { useCreatePesertaForm } from "@/features/admin/infopendaftar/hooks/useCreatePesertaForm";
import { useBidangPeminatanOptions } from "@/features/admin/infopendaftar/hooks/useBidangPeminatanOptions";

export default function Home() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const {
    pendaftar,
    formData,
    handleChange,
    handleSubmit,
  } = useCreatePesertaForm(id);
  const bidangOptions = useBidangPeminatanOptions();
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");

  if (!pendaftar) {
    return (
      <div className='ml-64 p-10'>Loading...</div>
    );
  }

  return (
    <AdminFormShell>
      <FormBreadcrumb />

      <PendaftarPersonalData data={pendaftar} />

      <InternshipInfoFields
        formData={formData}
        onChange={handleChange}
        bidangOptions={bidangOptions}
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
    </AdminFormShell>
  );
}
