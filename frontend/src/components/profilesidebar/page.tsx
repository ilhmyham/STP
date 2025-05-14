"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type UserData = {
  nama: string;
  status: string;
  divisi: string;
  profilePicture: string | null;
};

export default function ProfileSidebar() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/profile");

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileClick = () => {
    router.push("profileedit");
  };

  const handleLogoutClick = () => {
    // Add any logout logic here (e.g., clearing tokens)
    // For example:
    // localStorage.removeItem('token')

    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        Memuat Data...
      </div>
    );
  }

  return (
    <div className="flex flex-row lg:flex-col gap-[28px]">
      <div className="flex flex-row items-center bg-white border-[0.5px] border-[#BDCED5] rounded-[12px] shadow-sm gap-3 py-[17px] px-[30px] w-[300px] sm:w-auto">
        {userData?.profilePicture ? (
          <Image
            src={userData.profilePicture || "/placeholder.png"}
            alt="profile picture"
            width={40}
            height={40}
            className="w-[40px] h-[40px] md:w-[70px] md:h-[70px] rounded-full object-cover"
          />
        ) : (
          <Image
            src="/icons/Ellipse.png"
            alt="default profile picture"
            width={40}
            height={40}
            className="w-[60px] h-[60px] md:w-[70px] md:h-[70px]"
          />
        )}
        <div className="font-Fustat space-y-1">
          <p className="text-[14px] md:text-base text-[#29334D] font-semibold">
            {userData?.nama || "MEMUAT NAMA..."}
          </p>
          <p className="text-[#737F92] text-[14px] font-medium">
            {userData?.status || "Memuat Status..."}
          </p>
          <p className="text-[#737F92] text-[14px] font-medium">
            {userData?.divisi || "Memuat Divisi..."}
          </p>
        </div>
      </div>

      <div className="hidden lg:block flex flex-col bg-white border-[0.5px] border-[#BDCED5] rounded-[12px] shadow-sm py-5 px-7 gap-[10px]">
        <div
          className="flex flex-row gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
          onClick={handleProfileClick}
        >
          <Image
            src="/icons/profile.svg"
            alt="profile icon"
            width={28}
            height={28}
            className=""
          />
          <p className="text-[#29334D] text-base font-medium">
            Profile
          </p>
        </div>

        <div className="w-72 h-0 outline-[0.40px] outline-offset-[-0.20px] outline-[#A8AAAD]/26"></div>

        <div
          className="flex flex-row gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
          onClick={handleLogoutClick}
        >
          <Image
            src="/icons/logoutUser.svg"
            alt="logout icon"
            width={27}
            height={27}
            className=""
          />
          <p className="text-[#DC2626] text-base font-medium">
            Keluar
          </p>
        </div>
      </div>
    </div>
  );
}
