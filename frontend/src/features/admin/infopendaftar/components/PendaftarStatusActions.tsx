"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button/page";
import ConfirmationModal from "@/components/popup/confirm/page";

export const PendaftarStatusActions = ({
  id,
  status,
  onConfirm,
}: {
  id: number;
  status: string;
  onConfirm: (
    actionType: "accept" | "reject"
  ) => Promise<void>;
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<
    "accept" | "reject"
  >("accept");

  return (
    <>
      <div className='flex flex-col md:flex-row md:justify-between gap-4'>
        <Button
          variant='outline'
          className={`text-sm w-full md:w-auto ${
            status === "diterima"
              ? "bg-[#405385] hover:bg-[#344971] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() =>
            status === "diterima" &&
            router.push(
              `/admin/infopendaftar/tambahdata/${id}`
            )
          }
          disabled={status !== "diterima"}
        >
          Tambah Data
        </Button>
        <div className='flex gap-2 w-full md:w-auto'>
          <Button
            variant='destructive'
            className={`text-sm w-full flex items-center justify-center gap-2 px-4 py-2 ${
              status === "ditolak"
                ? "opacity-50 bg-gray-400 hover:bg-gray-400"
                : ""
            }`}
            onClick={() => {
              setActionType("reject");
              setShowModal(true);
            }}
            disabled={status === "ditolak"}
          >
            <Image
              src='/icons/tolak.svg'
              alt='Tolak'
              width={24}
              height={24}
              className={
                status === "ditolak"
                  ? "opacity-70"
                  : ""
              }
            />
            Tolak
          </Button>

          <Button
            className={`text-sm w-full ${
              status === "diterima"
                ? "bg-gray-400 hover:bg-gray-400 opacity-50"
                : "bg-[#2EBB62] hover:bg-green-700"
            } flex items-center justify-center gap-2 px-4 py-2`}
            onClick={() => {
              setActionType("accept");
              setShowModal(true);
            }}
            disabled={status === "diterima"}
          >
            <Image
              src='/icons/centang.svg'
              alt='Terima'
              width={24}
              height={24}
              className={
                status === "diterima"
                  ? "opacity-70"
                  : ""
              }
            />
            Terima
          </Button>
        </div>
      </div>

      {showModal && (
        <ConfirmationModal
          onClose={() => setShowModal(false)}
          onConfirm={() => {
            void onConfirm(actionType).finally(() =>
              setShowModal(false)
            );
          }}
          actionType={actionType}
        />
      )}
    </>
  );
};
