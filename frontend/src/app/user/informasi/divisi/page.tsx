"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface PenempatanData {
  divisi: string;
  tanggalMulai: string;
}

function formatTanggalIndo(tanggal: string): string {
  const bulanIndo = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  const date = new Date(tanggal);
  const tgl = date.getDate().toString().padStart(2, "0");
  const bln = bulanIndo[date.getMonth()];
  const thn = date.getFullYear();

  return `${tgl} ${bln} ${thn}`;
}

export default function Divisi() {
  const [data, setData] = useState<PenempatanData>({
    divisi: "Nama divisi disini",
    tanggalMulai: "01-01-2001"
  });
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/penempatan/${id}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Gagal ambil data penempatan:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="w-full md:h-[218.33px] lg:h-[214.33px] p-6 lg:py-[22px] lg:px-[44px] bg-white border-[0.5px] border-[#BDCED5] rounded-[16px] shadow-sm">
      <h2 className="text-base md:text-[20px] font-semibold text-[#29334D]">Penempatan Magang</h2>
      <p className="text-gray-600 font-Poppins text-[14px] md:text-base mt-1">{loading ? "Memuat data..." : data.divisi}</p>
      <p className="mt-[26px] text-[14px] md:text-base text-[#29334D] font-medium font-Poppins">
        Tanggal Mulai:{" "}
        <span className="text-[#29334D] font-medium">
          {formatTanggalIndo(data.tanggalMulai)}
        </span>
      </p>
    </div>
  );
}
