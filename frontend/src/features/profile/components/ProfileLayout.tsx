"use client";

"use client";

import Image from "next/image";
import Footer from "@/components/footer/page";
import Navbar from "@/components/navbar/page";
import { PendaftarGate } from "@/features/pendaftaran/components/PendaftarGate";
import { ProfileSidebar } from "./ProfileSidebar";

/**
 * Layout bersama halaman profil & edit profil.
 * `onMobileLogout` dipertahankan per halaman agar perilaku lama tidak berubah.
 */
export const ProfileLayout = ({
  children,
  onMobileLogout,
}: {
  children: React.ReactNode;
  onMobileLogout?: () => void;
}) => (
  <div>
    <Navbar />

    <div className='flex justify-center items-center lg:items-start flex-col lg:flex-row gap-[30px] pt-[70px] pb-[225px] mx-25'>
      <PendaftarGate>
        <ProfileSidebar />
        {children}

        <div className='bg-white border-[0.5px] border-[#BDCED5] rounded-[12px] shadow-sm lg:hidden flex justify-start px-4 py-2'>
          <div
            className='flex flex-row gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors'
            onClick={onMobileLogout}
          >
            <Image
              src='/icons/logoutUser.svg'
              alt='logout icon'
              width={20}
              height={20}
            />
            <p className='text-[#DC2626] text-base font-medium'>
              Keluar
            </p>
          </div>
        </div>
      </PendaftarGate>
    </div>

    <Footer />
  </div>
);
