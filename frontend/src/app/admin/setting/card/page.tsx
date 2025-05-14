"use client";
import React from "react";
import Link from 'next/link';

export const Card = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-red-600 text-lg font-semibold mb-4">Data Akun</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
        <div>
          <p className="text-gray-500 mb-1">Nama Lengkap</p>
          <p className="text-black">Robert</p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Password Saat Ini</p>
          <p className="text-black">************</p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">Email</p>
          <p className="text-black">aabb@gmail.com</p>
        </div>

        <div>
          <p className="text-gray-500 mb-1">No Handphone</p>
          <p className="text-black">+62 8xxxxxxxxxx</p>
        </div>
      </div>

        <div className="mt-6">
          <Link href={"setting/edit"}>
            <button className="bg-[#2658AC] text-white  px-6 py-2 rounded-full hover:bg-[#183B73] transition">
                Edit
            </button>
            </Link>
        </div>
    </div>
  );
};
