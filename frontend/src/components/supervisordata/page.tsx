"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

interface SupervisorData {
  name: string;
  phone: string;
  email: string;
}

export default function Supervisor() {
  const [data, setData] = useState<SupervisorData>({
    name: "Nama supervisor/mentor disini",
    phone: "+62 xxxxxxxxxx",
    email: "aabb@gmail.com",
  });
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "1";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/supervisor/${id}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Gagal ambil data supervisor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="w-full p-6 lg:py-[22px] lg:px-[44px] bg-white border-[0.5px] border-[#BDCED5] rounded-[16px] shadow-sm">
      <h2 className="md:text-[20px] font-semibold font-Fustat text-[#29334D]">
        Supervisor/Mentor
      </h2>
      <p className="text-gray-600 mt-1 font-Poppins text-[14px] md:text-base">
        {loading ? "Memuat data..." : data.name}
      </p>

      <div className="mt-6 gap-1">
        <h3 className="font-medium md:text-[18px] font-Fustat text-[#29334D] mb-2">
          Info Kontak
        </h3>
        <div className="flex items-center gap-2 text-[16px] md:text-base text-gray-600 mb-1 font-Poppins">
          <Image
            src="/icons/phone.svg"
            alt="phone"
            width={16} 
            height={16}
            className="md:w-[20px] md:h-[20px]"
          />
          <span>{data.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-[16px] md:text-base text-gray-600 font-Poppins">
          <Image
            src="/icons/mail.svg"
            alt="mail"
            width={16} 
            height={16}
            className="md:w-[20px] md:h-[20px]"
          />
          <span>{data.email}</span>
        </div>
      </div>
    </div>
  );
}
