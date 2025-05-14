"use client";

import type React from "react";
import { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    tempatLahir: "",
    jenisKelamin: "",
    tanggalLahir: "",
    email: "",
    alamatAsal: "",
    noHandphone: "",
    alamatDomisili: "",
    asalUniversitas: "",
    jurusan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <div className="flex flex-col bg-white border-[0.5px] border-[#BDCED5] rounded-[12px] shadow-sm px-[36px] py-[30px] md:px-[44px] gap-[34px] w-[300px] sm:w-auto">
      <h1 className="text-[18px] md:text-[20px] text-[#29334D] font-semibold">
        Informasi Pribadi
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-6 md:gap-18">
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="namaLengkap"
                className="text-[#29334D] text-[14px] md:text-base font-semibold"
              >
                Nama Lengkap
              </label>
              <input
                id="namaLengkap"
                name="namaLengkap"
                value={formData.namaLengkap}
                onChange={handleChange}
                placeholder="Nama Lengkap Anda"
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="jenisKelamin"
                className="text-[#29334D] text-[14px] md:text-base font-semibold"
              >
                Jenis Kelamin
              </label>
              <select
                id="jenisKelamin"
                name="jenisKelamin"
                value={formData.jenisKelamin}
                onChange={handleChange}
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              >
                <option value="">Pilih jenis kelamin</option>
                <option value="perempuan">Perempuan</option>
                <option value="laki-laki">Laki-laki</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[#29334D] text-[14px] md:text-base font-semibold">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="EmailAnda@gmail.com"
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="noHandphone" className="text-[#29334D] text-[14px] md:text-base font-semibold">No Handphone</label>
              <input
                id="noHandphone"
                name="noHandphone"
                value={formData.noHandphone}
                onChange={handleChange}
                placeholder="+62 8xxxxxxxx"
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="asalUniversitas" className="text-[#29334D] text-[14px] md:text-base font-semibold">Asal Universitas/Sekolah</label>
              <input
                id="asalUniversitas"
                name="asalUniversitas"
                value={formData.asalUniversitas}
                onChange={handleChange}
                placeholder="Asal Universitas/Sekolah"
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="tempatLahir" className="text-[#29334D] font-semibold">Tempat Lahir</label>
              <input
                id="tempatLahir"
                name="tempatLahir"
                value={formData.tempatLahir}
                onChange={handleChange}
                placeholder="Indonesia"
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="tanggalLahir" className="text-[#29334D] text-[14px] md:text-base font-semibold">Tanggal Lahir</label>
              <input
                id="tanggalLahir"
                name="tanggalLahir"
                type="date"
                value={formData.tanggalLahir}
                onChange={handleChange}
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="alamatAsal" className="text-[#29334D] text-[14px] md:text-base font-semibold">Alamat Asal</label>
              <input
                id="alamatAsal"
                name="alamatAsal"
                value={formData.alamatAsal}
                onChange={handleChange}
                placeholder="Perumahan A, Kel. A, Kec. A, Batam"
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="alamatDomisili" className="text-[#29334D] text-[14px] md:text-base font-semibold">Alamat Domisili</label>
              <input
                id="alamatDomisili"
                name="alamatDomisili"
                value={formData.alamatDomisili}
                onChange={handleChange}
                placeholder="Jl. aabb, Kel. A, Kec A, Surakarta"
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="jurusan" className="text-[#29334D] text-[14px] md:text-base font-semibold">Jurusan</label>
              <input
                id="jurusan"
                name="jurusan"
                value={formData.jurusan}
                onChange={handleChange}
                placeholder="Teknik Informatika"
                className="w-full lg:w-[194px] xl:w-[280px] px-3 py-2 border text-sm border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md"
              />
            </div>
          </div>
        </div>
      </form>

      <div className="flex justify-start gap-4">
          <button
            type="button"
            className="bg-white hover:bg-red-600 text-red-600 hover:text-white outline-1 outline-offset-[-1px] outline-red-600 w-20 px-7 py-[5px] rounded-lg inline-flex justify-center items-center gap-2.5"
            onClick={() =>
              setFormData({
                namaLengkap: "",
                tempatLahir: "",
                jenisKelamin: "",
                tanggalLahir: "",
                email: "",
                alamatAsal: "",
                noHandphone: "",
                alamatDomisili: "",
                asalUniversitas: "",
                jurusan: "",
              })
            }
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-[#2658AC] hover:bg-blue-800 text-white w-20 px-7 py-[5px] rounded-lg inline-flex justify-center items-center gap-2.5"
          >
            Simpan
          </button>
        </div>
    </div>
  );
}
