"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  actionType: "accept" | "reject";
}

export default function ConfirmationModal({
  onClose,
  onConfirm,
  actionType,
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<
    "initial" | "accepted" | "rejected"
  >("initial");
  const [shouldRedirect, setShouldRedirect] =
    useState(false);
  const router = useRouter();

  // Fungsi handleClose untuk override onClose + redirect jika perlu
  const handleClose = () => {
    onClose();
    if (shouldRedirect) {
      router.push(
        `/admin/infopendaftar/tambahdata/sunting/$[id]`
      ); // Ganti dengan path tujuanmu
    }
  };

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent
    ) {
      if (
        modalRef.current &&
        !modalRef.current.contains(
          event.target as Node
        )
      ) {
        handleClose();
      }
    }

    function handleEscapeKey(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    document.addEventListener(
      "keydown",
      handleEscapeKey
    );
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener(
        "keydown",
        handleEscapeKey
      );
      document.body.style.overflow = "auto";
    };
  }, [handleClose]);

  const renderContent = () => {
    switch (status) {
      case "accepted":
        return (
          <>
            <div className='flex justify-center mb-6'>
              <Image
                src='/icons/check.svg'
                alt='Success Icon'
                width={48}
                height={48}
              />
            </div>
            <h2 className='text-xl font-semibold mb-2 text-black'>
              Berhasil Tersimpan!
            </h2>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Silakan lihat data peserta pada
              halaman{" "}
              <span className='font-bold'>
                users
              </span>
            </p>
          </>
        );

      default:
        return (
          <>
            <div className='flex justify-center mb-4'>
              <Image
                src='/icons/alert.svg'
                alt='Warning Icon'
                width={54}
                height={54}
              />
            </div>
            <h2 className='text-xl font-semibold mb-2'>
              {actionType === "accept"
                ? "Simpan?"
                : "Tolak?"}
            </h2>
            <p className='text-sm text-gray-600 mb-6 leading-relaxed max-w-md mx-auto'>
              {actionType === "accept"
                ? "Pastikan anda yakin sudah memasukkan data dengan benar!"
                : "Apakah Anda yakin ingin menolak pendaftar ini? Tindakan ini tidak dapat dibatalkan."}
            </p>

            <div className='flex justify-center gap-8'>
              <button
                onClick={handleClose}
                className='font-semibold bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 text-sm'
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  setStatus("accepted");
                  setShouldRedirect(true);
                }}
                className='font-semibold bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 text-sm'
              >
                Simpan
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
      <div
        ref={modalRef}
        className='bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 relative p-10 text-center'
      >
        <button
          onClick={handleClose}
          className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold'
        >
          ×
        </button>
        {renderContent()}
      </div>
    </div>
  );
}
