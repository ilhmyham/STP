"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/page";
import ConfirmationModal from "@/components/popup/simpan/page";
import { AdminFormShell } from "@/features/admin/shared/components/AdminShell";
import { FormBreadcrumb } from "@/features/admin/shared/components/AdminBreadcrumb";
import { StaticPersonalData } from "@/features/admin/infopendaftar/components/StaticPersonalData";
import { InternshipInfoPlaceholderSummary } from "@/features/admin/infopendaftar/components/InternshipInfoPlaceholderSummary";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [actionType] = useState<"accept" | "reject">(
    "accept"
  );

  return (
    <AdminFormShell>
      <FormBreadcrumb />

      <StaticPersonalData />

      <InternshipInfoPlaceholderSummary />

      <div className='flex gap-2 w-full md:w-auto flex-row-reverse'>
        <Button
          variant='sunting'
          className='text-sm w-full md:w-auto bg-[#405385]'
          onClick={() =>
            (window.location.href =
              `/admin/infopendaftar/tambahdata`)
          }
        >
          sunting
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
