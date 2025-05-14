"use client";

import { useEffect, useState } from "react";

interface TimelineMagangProps {
  statusPendaftaran: boolean;  
  tanggalMulai: string;  
  tanggalSelesai: string | null; 
}

export default function TimelineMagang({
  statusPendaftaran,
  tanggalMulai,
  tanggalSelesai,
}: TimelineMagangProps) {
  const [statusMulai, setStatusMulai] = useState(false);
  const [statusSelesai, setStatusSelesai] = useState(false);

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (tanggalMulai) {
      const startDate = new Date(tanggalMulai);
      startDate.setHours(0, 0, 0, 0);
      setStatusMulai(today >= startDate);
    }

    if (tanggalSelesai) {
      const endDate = new Date(tanggalSelesai);
      endDate.setHours(0, 0, 0, 0);
      setStatusSelesai(today >= endDate);
    }
  }, [tanggalMulai, tanggalSelesai]);

  // Format tanggal ke format Indonesia (DD Bulan YYYY)
  const formatTanggal = (dateString: string | null) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <div className="w-[300px] md:w-[600px] lg:w-[900px] bg-white p-6 lg:px-[44px] lg:py-[22px] border-[0.5px] border-[#BDCED5] rounded-[16px] shadow-sm">
      <h2 className="text-base md:text-[20px] font-semibold text-[#29334D] mb-6">Timeline Magang</h2>

      <div className="relative">
        <div className="absolute left-4 top-1 w-0.5 h-[calc(100%-8px)] bg-gray-200"></div>

        <div className="flex mb-8 relative">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 text-[14px] md:text-base ${
              statusPendaftaran
                ? "bg-blue-500 text-white"
                : "bg-blue-100 text-blue-500"
            }`}
          >
            <span className="font-semibold">1</span>
          </div>
          <div className="ml-4">
            <h3 className="font-medium text-base md:text-lg text-[#29334D]">Pendaftaran Diterima</h3>
            <p className="text-gray-600 text-[14px] md:text-base">
              {statusPendaftaran
                ? "Pendaftaran magang Anda telah diterima"
                : "Menunggu persetujuan admin"}
            </p>
          </div>
        </div>

        <div className="flex mb-8 relative">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 text-[14px] md:text-base ${
              statusMulai
                ? "bg-blue-500 text-white"
                : "bg-blue-100 text-blue-500"
            }`}
          >
            <span className="font-semibold">2</span>
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-base md:text-lg text-[#29334D]">Magang Dimulai</h3>
            <p className="text-gray-600 text-[14px] md:text-base">
              Tanggal Mulai: {formatTanggal(tanggalMulai)}
            </p>
          </div>
        </div>

        <div className="flex relative">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 text-[14px] md:text-base ${
              statusSelesai
                ? "bg-blue-500 text-white"
                : "bg-blue-100 text-blue-500"
            }`}
          >
            <span className="font-semibold">3</span>
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-base md:text-lg text-[#29334D]">Magang Selesai</h3>
            <p className="text-gray-600 text-[14px] md:text-base">
              Tanggal Selesai: {formatTanggal(tanggalSelesai)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
