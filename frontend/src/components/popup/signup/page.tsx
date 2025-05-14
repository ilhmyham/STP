"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className="bg-white rounded-[20px] sm:rounded-lg shadow-lg sm:w-full sm:max-w-md mx-4 relative"
      >
        <button
          onClick={() => {
            onClose();
            router.push("login");
          }}
          className="absolute right-4 top-4 text-red-500 hover:text-red-600"
          aria-label="Close"
        >
          <Image
            src="/icons/close.svg"
            alt="Close Icon"
            width={34}
            height={34}
            className="sm:w-[54px] sm:h-[54px]"
          />
        </button>

        <div className="p-6 pt-8 pb-8 text-center flex flex-col">
          <div className="flex justify-center mb-4">
            <Image
              src="/icons/check.svg"
              alt="Check Icon"
              width={34}
              height={34}
              className="sm:w-[54px] sm:h-[54px]"
            />
          </div>

          <h2 className="text-xl font-medium text-[16px] sm:text[20px] mb-2">
            Pendaftaran Berhasil!
          </h2>

          <p className="text-gray-600 text-[14px] sm:text[20px]">
            Silakan login untuk bergabung ke
            <br />
            website Kerja Praktik Solo Technopark
          </p>
        </div>
      </div>
    </div>
  );
}
