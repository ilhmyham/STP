"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Helper function to check active path
  const isActive = (path: string) => pathname === `/user/${path}`;
  const isProfileActive = isActive('profile') || isActive('editprofile');

  return (
    <header className="w-full bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.25)]">
      <div className="max-w-[1440px] h-20 px-4 md:px-16 py-4 mx-auto flex justify-between items-center">
        <Link href="/">
          <Image
            src="/icons/stp.svg"
            alt="Logo Solo Technopark"
            width={120}
            height={40}
          />
        </Link>

        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex gap-6">
          <Link
            href="beranda"
            className={`text-base font-semibold pb-2 ${
              isActive('beranda')
                ? 'text-[#60A1FA] border-b-2 border-[#60A1FA]'
                : 'text-slate-700'
            }`}
          >
            Beranda
          </Link>
          <Link
            href="informasi"
            className={`text-base font-semibold pb-2 ${
              isActive('informasi')
                ? 'text-[#60A1FA] border-b-2 border-[#60A1FA]'
                : 'text-slate-700'
            }`}
          >
            Informasi Magang
          </Link>
          <Link
            href="dokumen"
            className={`text-base font-semibold pb-2 ${
              isActive('dokumen')
                ? 'text-[#60A1FA] border-b-2 border-[#60A1FA]'
                : 'text-slate-700'
            }`}
          >
            Berkas Magang
          </Link>
          <Link
            href="profile"
            className={`text-base font-semibold flex flex-row items-start gap-2 ${
              isProfileActive? 'text-[#60A1FA]' : 'text-slate-700'
            }`}
          >
            Halo, User!
            <Image
              src={
                isProfileActive
                  ? '/icons/bluenavprofile.svg'
                  : '/icons/navprofile.svg'
              }
              alt="User Icon"
              width={20}
              height={20}
            />
          </Link>
        </nav>
      </div>


      {isOpen && (
        <nav className="md:hidden px-4 pb-4 flex flex-col gap-4 bg-white shadow-sm">
          <Link
            href="beranda"
            className="text-slate-700 text-base font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Beranda
          </Link>
          <Link
            href="informasi"
            className="text-slate-700 text-base font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Informasi Magang
          </Link>
          <Link
            href="dokumen"
            className="text-slate-700 text-base font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Berkas Magang
          </Link>
          <Link
            href="profile"
            className="text-slate-700 text-base font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Profile
          </Link>
        </nav>
      )}
    </header>
  );
}
