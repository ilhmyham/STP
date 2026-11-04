"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/page";
import ConfirmationModal from "@/components/popup/simpan/page";
import { AdminFormShell } from "@/features/admin/shared/components/AdminShell";
import { FormBreadcrumb } from "@/features/admin/shared/components/AdminBreadcrumb";
import { StaticPersonalData } from "@/features/admin/infopendaftar/components/StaticPersonalData";
import { InternshipInfoPlaceholderForm } from "@/features/admin/infopendaftar/components/InternshipInfoPlaceholderForm";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");

  return (
    <AdminFormShell>
      <FormBreadcrumb />

      <StaticPersonalData />

      <InternshipInfoPlaceholderForm />

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
            onConfirm={() => {
              console.log("Confirmed");
            }}
            actionType={actionType}
          />
        )}
      </div>
    </AdminFormShell>
  );
}
