"use client";

import Image from "next/image";
import Footer from "@/components/footer/page";
import Navbar from "@/components/navbar/page";
import ProfileSidebar from "@/app/user/profile/profilesidebar/page";
import Form from "./form/page";

export default function Profil() {
  const handleLogoutClick = () => {
    // Add any logout logic here (e.g., clearing tokens)
    // For example:
    // localStorage.removeItem('token')
    // router.push("/");
  };

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center lg:items-start flex-col lg:flex-row gap-[30px] pt-[70px] pb-[225px] mx-25">
        <ProfileSidebar />
        <Form />

        <div className="bg-white border-[0.5px] border-[#BDCED5] rounded-[12px] shadow-sm lg:hidden flex justify-start px-4 py-2">
          <div
            className="flex flex-row gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
            onClick={handleLogoutClick}
          >
            <Image
              src="/icons/logoutUser.svg"
              alt="logout icon"
              width={20}
              height={20}
            />
            <p className="text-[#DC2626] text-base font-medium">Keluar</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
