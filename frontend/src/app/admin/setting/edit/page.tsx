"use client";
import React, { useState } from "react";
import { Sidebar } from "../../sidebar/page";
import { useRouter } from "next/navigation";
import Link from 'next/link';

export const Edit = () => {
  const [formData, setFormData] = useState({
    name: "Theresia Pasingki Sollu",
    email: "aabb@gmail.com",
    phone: "+62 8xxxxxxxx",
    currentPassword: "",
    newPassword: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-[#F5F4F7]">
    <Sidebar />

    <div className="flex-1 p-10 ml-70">
        <h2 className="text-2xl font-bold mb-6 text-black">Pengaturan Akun</h2>
    </div>

    <div className="ml-80 mr-20 bg-white rounded-2xl p-10 shadow-md">
      <form className="space-y-5">
        <div>
          <label className="block mb-1">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-500"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-500"
          />
        </div>

        <div>
          <label className="block mb-1">No Handphone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-500"
          />
        </div>

        <div>
          <label className="block mb-1">Password Saat ini</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-500"
          />
        </div>

        <div>
          <label className="block mb-1">Password Baru</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-500"
          />
        </div>

        <div className="flex justify-left gap-4 pt-4">
           
            <button
              type="button"
              onClick={() => router.back()} // <- kembali ke halaman sebelumnya
              className="border border-red-500 text-red-500 px-6 py-2 rounded-full hover:bg-red-100 transition"
            >
              Batal
            </button>
            
          <button
            type="submit"
            className="bg-[#2658AC] text-white px-6 py-2 rounded-full hover:bg-[#183B73] transition"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
    </div> 
  );
};

export default Edit;