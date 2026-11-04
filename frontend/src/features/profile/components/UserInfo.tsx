"use client";

import Link from "next/link";
import { useProfileDetail } from "../hooks/useProfileDetail";
import { ProfileInfoItem } from "./ProfileInfoItem";

export const UserInfo = () => {
  const { userData, isLoading } = useProfileDetail();

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
          <ProfileInfoItem
            label='Nama Lengkap'
            value={displayValue(
              userData?.namalengkap
            )}
            className='md:w-[200px]'
          />
          <ProfileInfoItem
            label='Jenis Kelamin'
            value={displayValue(
              userData?.jeniskelamin
            )}
          />
          <ProfileInfoItem
            label='Email'
            value={displayValue(userData?.email)}
          />
          <ProfileInfoItem
            label='No handphone'
            value={displayValue(
              userData?.nohandphone
            )}
          />
          <ProfileInfoItem
            label='Asal Universitas/Sekolah'
            value={displayValue(userData?.instansi)}
          />
        </div>

        <div className='space-y-[28px]'>
          <ProfileInfoItem
            label='Tempat Lahir'
            value={displayValue(
              userData?.tempatlahir
            )}
            className='md:w-[200px]'
          />
          <ProfileInfoItem
            label='Tanggal Lahir'
            value={displayValue(
              userData?.tanggalLahir
            )}
          />
          <ProfileInfoItem
            label='Alamat Asal'
            value={displayValue(
              userData?.alamatasal
            )}
          />
          <ProfileInfoItem
            label='Alamat Domisili'
            value={displayValue(
              userData?.alamatdomisili
            )}
          />
          <ProfileInfoItem
            label='Jurusan'
            value={displayValue(userData?.jurusan)}
          />
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
};
