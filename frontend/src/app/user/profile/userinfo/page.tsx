"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface UserData {
  namalengkap: string;
  jeniskelamin: string;
  email: string;
  nohandphone: string;
  instansi: string;
  tempatlahir: string;
  tanggalLahir: string;
  alamatasal: string;
  alamatdomisili: string;
  jurusan: string;
}

export default function Userinfo() {
  const [userData, setUserData] =
    useState<UserData | null>(null);
  const [isLoading, setIsLoading] =
    useState(true);
  const [error, setError] = useState<
    string | null
  >(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "/api/user/profile"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to fetch user data"
          );
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        setError(
          "Error fetching user data. Please try again later."
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Di command dulu guys biar bisa kerender UI nya
  // if (error) {
  //   return (
  //     <div className="flex flex-col bg-white border-[0.5px] border-[#BDCED5] rounded-[12px] shadow-sm py-[30px] px-[44px] gap-[34px]">
  //       <p className="text-red-500 font-Fustat">{error}</p>
  //     </div>
  //   )
  // }

  const displayValue = (
    value: string | undefined
  ) => {
    if (isLoading) return "memuat data";
    return value || "-";
  };

  return (
    <div className='flex flex-col bg-white border-[0.5px] border-[#BDCED5] rounded-[12px] shadow-sm px-[36px] py-[30px] md:px-[44px] gap-[34px] w-[300px] sm:w-auto'>
      <h1 className='text-[18px] md:text-[20px] text-[#29334D] font-semibold'>
        Informasi Pribadi
      </h1>
      <div className='flex flex-col md:flex-row gap-[34px] md:gap-[100px]'>
        <div className='space-y-[28px]'>
          <div className='space-y-[6px] md:w-[200px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Nama Lengkap
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(
                userData?.namalengkap
              )}
            </p>
          </div>

          <div className='space-y-[6px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Jenis Kelamin
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(
                userData?.jeniskelamin
              )}
            </p>
          </div>

          <div className='space-y-[6px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Email
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(userData?.email)}
            </p>
          </div>

          <div className='space-y-[6px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              No handphone
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(
                userData?.nohandphone
              )}
            </p>
          </div>

          <div className='space-y-[6px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Asal Universitas/Sekolah
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(userData?.instansi)}
            </p>
          </div>
        </div>

        <div className='space-y-[28px]'>
          <div className='space-y-[6px] md:w-[200px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Tempat Lahir
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(
                userData?.tempatlahir
              )}
            </p>
          </div>

          <div className='space-y-[6px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Tanggal Lahir
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(
                userData?.tanggalLahir
              )}
            </p>
          </div>

          <div className='space-y-[6px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Alamat Asal
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(userData?.alamatasal)}
            </p>
          </div>

          <div className='space-y-[6px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Alamat Domisili
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(
                userData?.alamatdomisili
              )}
            </p>
          </div>

          <div className='space-y-[6px]'>
            <p className='text-[14px] md:text-[15px] text-[#737F92] font-medium'>
              Jurusan
            </p>
            <p className='text-[14px] md:text-4 text-[#29334D] font-semibold'>
              {displayValue(userData?.jurusan)}
            </p>
          </div>
        </div>
      </div>

      <Link
        href='/user/editprofile'
        className='w-[74px] sm:w-[82px] h-[38px] sm:h-[29px] md:px-[28px] md:py-[5px] bg-[#2658AC] rounded-2xl inline-flex justify-center items-center text-white text-[14px] font-semibold font-Quicksand'
      >
        Edit
      </Link>
    </div>
  );
}
