"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { usePendaftarStatus } from "../hooks/usePendaftarStatus";

const WRAPPER_CLASS =
  "flex w-full flex-col items-center justify-center px-4 py-16";

/**
 * Menahan halaman yang membutuhkan data pendaftaran.
 * User yang belum mengisi form melihat ajakan melengkapi form, bukan error.
 */
export function PendaftarGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status, error, refresh } =
    usePendaftarStatus();

  if (status === "loading") {
    return (
      <div className={WRAPPER_CLASS}>
        <p className='flex items-center gap-2 text-[#737F92]'>
          <Loader2 className='h-5 w-5 animate-spin' />
          Memuat data pendaftaran...
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={WRAPPER_CLASS}>
        <div className='flex w-full max-w-[560px] flex-col items-center gap-4 rounded-[16px] border-[0.5px] border-[#BDCED5] bg-white px-8 py-10 text-center shadow-sm'>
          <h2 className='text-[18px] font-semibold text-[#29334D] md:text-[20px]'>
            Data pendaftaran tidak dapat dimuat
          </h2>
          <p className='text-[14px] text-[#737F92] md:text-base'>
            {error ??
              "Terjadi kesalahan saat mengambil data pendaftaran."}
          </p>
          <button
            type='button'
            onClick={() => void refresh()}
            className='inline-flex items-center justify-center rounded-xl bg-[#2658AC] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800'
          >
            Coba lagi
          </button>
        </div>
      </div>
    );
  }

  if (status === "unregistered") {
    return (
      <div className={WRAPPER_CLASS}>
        <div className='flex w-full max-w-[560px] flex-col items-center gap-4 rounded-[16px] border-[0.5px] border-[#BDCED5] bg-white px-8 py-10 text-center shadow-sm'>
          <h2 className='text-[18px] font-semibold text-[#29334D] md:text-[20px]'>
            Anda belum mengisi form pendaftaran
          </h2>
          <p className='text-[14px] text-[#737F92] md:text-base'>
            Lengkapi form pendaftaran magang terlebih
            dahulu untuk melihat profil, informasi,
            dan berkas magang Anda.
          </p>
          <Link
            href='/user/datadiri'
            className='inline-flex items-center justify-center rounded-xl bg-[#2658AC] px-5 py-2 text-sm font-semibold text-white hover:bg-blue-800'
          >
            Lengkapi Pendaftaran
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
