"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from 'next/navigation';
import { useAuth } from "@/features/auth/components/AuthProvider";
import { usePendaftarStatus } from "@/features/pendaftaran/hooks/usePendaftarStatus";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();
  const { status } = usePendaftarStatus();

  // Helper function to check active path
  const isActive = (path: string) => pathname === `/user/${path}`;
  const isProfileActive = isActive('profile') || isActive('editprofile');

  // Menu yang membutuhkan data form pendaftaran hanya tampil bila user
  // sudah mengisi form. Saat status masih dimuat, menu disembunyikan agar
  // pendaftar baru tidak sempat mengklik halaman yang belum bisa diakses.
  const showDataMenu =
    status === 'registered' || status === 'error';
  const showCompleteCta =
    status === 'unregistered' &&
    pathname !== '/user/datadiri';
  // Sidebar profil (satu-satunya tombol keluar lama) tidak tampil untuk
  // pendaftar baru, jadi sediakan akses keluar di navbar.
  const showLogout = status === 'unregistered';

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
          {showDataMenu && (
            <>
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
            </>
          )}
          {showCompleteCta && (
            <Link
              href="/user/datadiri"
              className="text-base font-semibold px-4 py-2 rounded-xl bg-[#60A1FA] text-white hover:bg-[#4a8de6]"
            >
              Lengkapi Pendaftaran
            </Link>
          )}
          {showLogout && (
            <button
              type="button"
              onClick={logout}
              className="text-base font-semibold text-[#DC2626] hover:underline"
            >
              Keluar
            </button>
          )}
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
          {showDataMenu && (
            <>
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
            </>
          )}
          {showCompleteCta && (
            <Link
              href="/user/datadiri"
              className="text-white text-base font-semibold rounded-xl bg-[#60A1FA] px-4 py-2 text-center"
              onClick={() => setIsOpen(false)}
            >
              Lengkapi Pendaftaran
            </Link>
          )}
          {showLogout && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="text-[#DC2626] text-base font-semibold text-left"
            >
              Keluar
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
