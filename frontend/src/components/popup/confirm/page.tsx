"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  actionType: "accept" | "reject";
}

export default function ConfirmationModal({
  onClose,
  onConfirm,
  actionType,
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<
    "initial" | "success" | "error"
  >("initial");
  const [isLoading, setIsLoading] =
    useState(false);

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
        onClose();
      }
    }

    function handleEscapeKey(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onClose();
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
  }, [onClose]);

  const handleAction = async () => {
    try {
      setIsLoading(true);
      await onConfirm();
      setStatus("success");
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    switch (status) {
      case "success":
        return (
          <>
            <div className='flex justify-center mb-6'>
              <Image
                src={
                  actionType === "accept"
                    ? "/icons/check.svg"
                    : "/icons/check(merah).svg"
                }
                alt={
                  actionType === "accept"
                    ? "Success Icon"
                    : "Rejected Icon"
                }
                width={48}
                height={48}
              />
            </div>
            <h2 className='text-xl font-semibold mb-2 text-black'>
              {actionType === "accept"
                ? "Pendaftar berhasil diterima!"
                : "Pendaftar berhasil ditolak!"}
            </h2>
            <p className='text-sm text-gray-600 leading-relaxed'>
              {actionType === "accept"
                ? "Silakan pindah ke halaman memasukkan data dengan klik tombol tambah data."
                : "Silakan tutup pop up ini untuk melakukan aksi lainnya."}
            </p>
            <div className='mt-6'>
              <button
                onClick={onClose}
                className='bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 text-sm'
              >
                Tutup
              </button>
            </div>
          </>
        );
      case "error":
        return (
          <>
            <div className='flex justify-center mb-6'>
              <Image
                src='/icons/error.svg'
                alt='Error Icon'
                width={48}
                height={48}
              />
            </div>
            <h2 className='text-xl font-semibold mb-2 text-black'>
              Gagal memproses!
            </h2>
            <p className='text-sm text-gray-600 leading-relaxed'>
              Terjadi kesalahan saat memproses
              permintaan. Silakan coba lagi.
            </p>
            <div className='mt-6'>
              <button
                onClick={() =>
                  setStatus("initial")
                }
                className='bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 text-sm'
              >
                Coba Lagi
              </button>
            </div>
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
                ? "Terima Pendaftar?"
                : "Tolak Pendaftar?"}
            </h2>
            <p className='text-sm text-gray-600 mb-6 leading-relaxed max-w-md mx-auto'>
              {actionType === "accept"
                ? "Pastikan anda yakin sudah memeriksa data pendaftar secara seksama!"
                : "Apakah Anda yakin ingin menolak pendaftar ini? Tindakan ini tidak dapat dibatalkan."}
            </p>

            <div className='flex justify-center gap-8'>
              <button
                onClick={onClose}
                disabled={isLoading}
                className='bg-gray-300 text-gray-800 px-5 py-2 rounded-xl hover:bg-gray-400 text-sm disabled:opacity-50'
              >
                Batal
              </button>
              <button
                onClick={handleAction}
                disabled={isLoading}
                className={`${
                  actionType === "accept"
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-600 hover:bg-red-700"
                } text-white px-5 py-2 rounded-xl text-sm disabled:opacity-50`}
              >
                {isLoading ? (
                  <span className='flex items-center justify-center'>
                    <span className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></span>
                    Memproses...
                  </span>
                ) : actionType === "accept" ? (
                  "Terima"
                ) : (
                  "Tolak"
                )}
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
        {status === "initial" && (
          <button
            onClick={onClose}
            className='absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold'
            disabled={isLoading}
          >
            ×
          </button>
        )}
        {renderContent()}
      </div>
    </div>
  );
}
