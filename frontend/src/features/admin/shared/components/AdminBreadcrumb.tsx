"use client";

import { useRouter } from "next/navigation";

export const FormBreadcrumb = () => {
  const router = useRouter();

  return (
    <h2 className='text-2xl font-semibold text-[#000] mb-6'>
      Data Masuk &gt;{" "}
      <span
        onClick={() => router.back()}
        className='hover:text-gray-400 cursor-pointer'
      >
        Data Pendaftar
      </span>{" "}
      &gt; Tambah Data
    </h2>
  );
};

export const DetailBreadcrumb = () => {
  const router = useRouter();

  return (
    <h1 className='text-2xl font-semibold text-[#000] mb-6'>
      <span
        onClick={() => router.back()}
        className='hover:text-gray-400 cursor-pointer'
      >
        Data Masuk
      </span>{" "}
      &gt; Data Pendaftar
    </h1>
  );
};
