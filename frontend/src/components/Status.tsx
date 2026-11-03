"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
} from "lucide-react";
import Link from "next/link";

type ApplicationStatus =
  | "diterima"
  | "ditolak"
  | "diproses"
  | "loading";

interface ApplicationStatusProps {
  initialStatus?: ApplicationStatus;
  applicationId?: string;
  documentUrl?: string;
}

export default function Status({
  initialStatus = "diproses",
  applicationId,
  documentUrl = "#",
}: ApplicationStatusProps) {
  const [status, setStatus] =
    useState<ApplicationStatus>(initialStatus);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!applicationId) return;

      try {
        setStatus("loading");
        const response = await fetch(
          `/api/statuspenerimaan/${applicationId}`
        );
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error(
          "Error fetching application status:",
          error
        );
        setStatus("diproses");
      }
    };

    if (applicationId) {
      fetchStatus();
    }
  }, [applicationId]);

  const renderStatusBadge = () => {
    switch (status) {
      case "diterima":
        return (
          <div className='inline-flex items-center px-3 py-1 rounded-full bg-green-500 text-white text-[12px] md:text-base'>
            <CheckCircle className='w-4 h-4 mr-1' />
            <span>Diterima</span>
          </div>
        );
      case "ditolak":
        return (
          <div className='inline-flex items-center px-3 py-1 rounded-full bg-red-500 text-white text-[12px] md:text-base'>
            <XCircle className='w-4 h-4 mr-1' />
            <span>Ditolak</span>
          </div>
        );
      case "diproses":
        return (
          <div className='inline-flex items-center px-3 py-1 rounded-full bg-yellow-500 text-white text-[12px] md:text-base'>
            <Clock className='w-4 h-4 mr-1' />
            <span>Diproses</span>
          </div>
        );
      case "loading":
        return (
          <div className='inline-flex items-center px-3 py-1 rounded-full bg-gray-400 text-white text-[12px] md:text-base'>
            <Loader2 className='w-4 h-4 mr-1 animate-spin' />
            <span>Memuat status</span>
          </div>
        );
    }
  };

  const renderStatusMessage = () => {
    switch (status) {
      case "diterima":
        return (
          <div className='p-4 mt-4 bg-green-100 border border-green-200 rounded-md text-green-800'>
            <p className='text-[14px] md:text-base'>
              Selamat! Anda telah diterima magang
              di Solo Technopark. Silakan unduh
              surat balasan permohonan magang{" "}
              <Link
                href={documentUrl}
                className='text-blue-600 underline'
              >
                disini
              </Link>
              .
            </p>
          </div>
        );
      case "ditolak":
        return (
          <div className='p-4 mt-4 bg-red-100 border border-red-200 rounded-md text-red-800'>
            <p className='text-[14px] md:text-base'>
              Mohon maaf, Anda belum diterima
              untuk program magang di Solo
              Technopark.
            </p>
          </div>
        );
      case "diproses":
        return (
          <div className='p-2 mt-4 bg-yellow-100 border border-yellow-200 rounded-[12px] text-yellow-800'>
            <p className='text-[14px] md:text-base'>
              Permohonan magang Anda sedang dalam
              proses peninjauan. Silakan cek
              kembali dalam beberapa hari.
            </p>
          </div>
        );
      case "loading":
        return (
          <div className='p-4 mt-4 bg-gray-100 border border-gray-200 rounded-md text-gray-800'>
            <p className='flex items-center text-[14px] md:text-base'>
              <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              Sedang memuat informasi status
              permohonan Anda...
            </p>
          </div>
        );
    }
  };

  return (
    <div className='w-[300px] md:w-[600px] lg:w-[900px] p-6 lg:py-[22px] lg:px-[44px] border-[0.5px] border-[#BDCED5] rounded-[16px] shadow-sm'>
      <div className='flex justify-between items-center mb-2'>
        <h2 className='md:text-xl font-semibold text-gray-800'>
          Status Proses Penerimaan
        </h2>
        <div className='inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-center text-gray-700 font-medium text-[12px] md:text-sm'>
          {status === "diproses"
            ? "Belum dimulai"
            : "Sedang Berlangsung"}
        </div>
      </div>
      <p className='text-gray-600 text-[14px] md:text-base mb-4'>
        Status terkini pendaftaran magang Anda
      </p>

      <div className='flex items-center'>
        {renderStatusBadge()}
      </div>

      {renderStatusMessage()}
    </div>
  );
}
