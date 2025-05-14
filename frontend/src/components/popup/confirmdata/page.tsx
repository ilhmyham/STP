"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  actionType: "submit"; // kita anggap hanya 1 jenis yaitu submit
}

export default function ConfirmationModal({
  onClose,
  onConfirm,
  actionType
}: ConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"initial" | "submitted">("initial");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  useEffect(() => {
    if (status === "submitted") {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // otomatis menutup setelah 3 detik

      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  const renderContent = () => {
    if (status === "submitted") {
      return (
        <>
          <div className="flex justify-center mb-[85px]">
            <Image src="/icons/check.svg" alt="Success Icon" width={48} height={48} />
          </div>
          <h2 className="text-xl font-semibold text-black mb-2">Berkas Berhasil Terkirim!</h2>
          <p className="text-sm text-gray-600 mb-[85px] px-6">
            Silakan periksa bagian <span className="font-bold">Informasi Magang</span> untuk
            detail lebih lanjut.
          </p>
        </>
      );
    }

    return (
      <>
        <div className="flex justify-center mb-4">
          <Image src="/icons/alert.svg" alt="Warning Icon" width={54} height={54} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Kirim?</h2>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed max-w-md mx-auto">
          Pastikan anda yakin sudah mengisi data dengan benar dan lengkap!
        </p>
        <div className="flex justify-center gap-8">
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 text-sm"
          >
            Batalkan
          </button>
          <button
            onClick={() => {
              onConfirm();
              setStatus("submitted");
            }}
            className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 text-sm"
          >
            Kirim
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 relative p-10 text-center"
        style={{ paddingLeft: 50, paddingRight: 50 }}
      >
        {status !== "submitted" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            ×
          </button>
        )}
        {renderContent()}
      </div>
    </div>
  );
}