"use client";

import type React from "react";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StepIndicator from "@/components/stepindicator";
import CustomFileInput from "@/components/customfileinput";
import ConfirmationModal from "@/components/popup/confirmdata/page";

export default function ApplicationForm() {
  const [jenjangOptions, setJenjangOptions] =
    useState<
      { id: number; pendidikan: string }[]
    >([]);
  const [bidangOptions, setBidangOptions] =
    useState<
      { id: number; nama_bidang: string }[]
    >([]);
  const [loading, setLoading] = useState({
    jenjang: true,
    bidang: true,
  });
  const [error, setError] = useState({
    jenjang: null,
    bidang: null,
  });
  const [currentStep, setCurrentStep] =
    useState(1);
  const [showConfirmPopup, setShowConfirmPopup] =
    useState(false);
  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false);
  const [fileCV, setFileCV] =
    useState<File | null>(null);
  const [fileSurat, setFileSurat] =
    useState<File | null>(null);
  const [fileProposal, setFileProposal] =
    useState<File | null>(null);
  const [fileDokumen, setFileDokumen] =
    useState<File | null>(null);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [formData, setFormData] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: undefined as Date | undefined,
    jenis_kelamin: "",
    email: "",
    noHP: "",
    alamat_domisili: "",
    alamat_asal: "",
    asal_instansi: "",
    jenjang_pendidikan: "",
    fakultas: "",
    program_studi: "",
    nim: "",
    semester: "",
    durasi: "",
    periodic_mulai: undefined as Date | undefined,
    bidang_peminatan: "",
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [jenjangRes, bidangRes] =
          await Promise.all([
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/jenjangPendidikans`
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/bidangPeminatans`
            ),
          ]);

        setJenjangOptions(jenjangRes.data);
        setBidangOptions(bidangRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading({
          jenjang: false,
          bidang: false,
        });
      }
    };

    fetchOptions();
  }, []);

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value ? new Date(value) : undefined,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    name: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setCurrentStep((prev) =>
      Math.min(prev + 1, 4)
    );
  };

  const handlePrevious = () => {
    setCurrentStep((prev) =>
      Math.max(prev - 1, 1)
    );
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    // Sesuaikan nama field sesuai dengan Laravel controller
    formDataToSend.append("nama", formData.nama);
    formDataToSend.append(
      "tempat_lahir",
      formData.tempat_lahir
    );
    formDataToSend.append(
      "tanggal_lahir",
      formData.tanggal_lahir?.toISOString() || ""
    );
    formDataToSend.append(
      "jenis_kelamin",
      formData.jenis_kelamin
    );
    formDataToSend.append(
      "email",
      formData.email
    );
    formDataToSend.append("noHP", formData.noHP);
    formDataToSend.append(
      "alamat_asal",
      formData.alamat_asal
    );
    formDataToSend.append(
      "alamat_domisili",
      formData.alamat_domisili
    );
    formDataToSend.append(
      "asal_instansi",
      formData.asal_instansi
    );
    formDataToSend.append(
      "jenjang_pendidikan",
      formData.jenjang_pendidikan
    ); // sesuai validator
    formDataToSend.append(
      "fakultas",
      formData.fakultas
    );
    formDataToSend.append(
      "program_studi",
      formData.program_studi
    );
    formDataToSend.append("nim", formData.nim);
    formDataToSend.append(
      "semester",
      formData.semester
    );
    formDataToSend.append(
      "durasi",
      formData.durasi
    );
    formDataToSend.append(
      "periodic_mulai",
      formData.periodic_mulai?.toISOString() || ""
    );
    formDataToSend.append(
      "bidang_peminatan",
      formData.bidang_peminatan
    ); // sesuai validator

    // File upload sesuai nama field Laravel
    if (fileCV)
      formDataToSend.append("cv", fileCV);
    if (fileSurat)
      formDataToSend.append(
        "surat_rekomendasi",
        fileSurat
      );
    if (fileProposal)
      formDataToSend.append(
        "proposal",
        fileProposal
      );
    if (fileDokumen)
      formDataToSend.append(
        "dok_pendukung",
        fileDokumen
      );

    // Debugging output
    // console.log("=== Data yang akan dikirim ===");
    // for (const pair of formDataToSend.entries()) {
    //   console.log(`${pair[0]}:`, pair[1]);
    // }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/pendaftars`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json", // penting agar error Laravel dikembalikan dalam JSON
          },
        }
      );

      if (response.data.success) {
        setShowSuccessPopup(true);
      } else {
        console.error("Formulir gagal dikirim");
      }
    } catch (error: any) {
      if (
        error.response &&
        error.response.status === 422
      ) {
        console.error(
          "Validasi Gagal:",
          error.response.data.errors
        ); // TAMBAH INI
        alert(
          "Validasi gagal: " +
            JSON.stringify(
              error.response.data.errors,
              null,
              2
            )
        );
      } else {
        console.error(
          "Error saat mengirim formulir:",
          error
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmPopup(false);
    setShowSuccessPopup(true);
    console.log("Form submitted:", formData);
  };

  return (
    <div className='flex flex-col justify-center max-w-3xl mx-auto'>
      <p className='block md:hidden text-[20px] font-semibold text-[#2658AC] mt-0.5 mb-0 text-center'>
        {currentStep === 1 &&
          "Informasi Data Diri"}
        {currentStep === 2 &&
          "Informasi Pendidikan"}
        {currentStep === 3 &&
          "Bidang & Periode Magang"}
        {currentStep === 4 && "Lampiran"}
      </p>
      <StepIndicator
        currentStep={currentStep}
        className='hidden md:block'
      />
      {currentStep === 1 && (
        <div className='flex flex-col justify-center max-w-3xl mx-4 md:mx-auto mt-5 md:mt-[60px] space-y-6'>
          <div className='space-y-2'>
            <label
              htmlFor='namaLengkap'
              className='block text-sm md:text-base font-regular'
            >
              Nama Lengkap
            </label>
            <Input
              id='nama'
              name='nama'
              placeholder='Nama Lengkap Sesuai KTP'
              value={formData.nama}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='tempatLahir'
              className='block text-sm md:text-base font-regular'
            >
              Tempat Lahir
            </label>
            <Input
              id='tempat_lahir'
              name='tempat_lahir'
              placeholder='Tempat Lahir'
              value={formData.tempat_lahir}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='tanggalLahir'
              className='block text-sm md:text-base font-regular'
            >
              Tanggal Lahir
            </label>
            <input
              type='date'
              name='tanggal_lahir'
              value={
                formData.tanggal_lahir
                  ? formData.tanggal_lahir
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleDateChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md px-3 py-2'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='jenisKelamin'
              className='block text-sm md:text-base font-regular'
            >
              Jenis Kelamin
            </label>

            <Select
              value={formData.jenis_kelamin}
              onValueChange={(value) =>
                handleSelectChange(
                  "jenis_kelamin",
                  value
                )
              }
            >
              <SelectTrigger
                id='jenis_kelamin'
                className='border-[0.5px] border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
              >
                <SelectValue placeholder='Pilih Jenis Kelamin' />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                <SelectItem value='pria'>
                  Pria
                </SelectItem>
                <SelectItem value='wanita'>
                  Wanita
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='block text-sm md:text-base font-regular'
            >
              Email
            </label>
            <Input
              id='email'
              name='email'
              type='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='noHP'
              className='block text-sm md:text-base font-regular'
            >
              Nomor Handphone
            </label>
            <Input
              id='noHP'
              name='noHP'
              placeholder='+62 xxxxxxxxxx'
              value={formData.noHP}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='alamat_domisili'
              className='block text-sm md:text-base font-regular'
            >
              Alamat Domisili
            </label>
            <Input
              id='alamat_domisili'
              name='alamat_domisili'
              placeholder='Alamat Domisili'
              value={formData.alamat_domisili}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='alamat_asal'
              className='block text-sm md:text-base font-regular'
            >
              Alamat Asal
            </label>
            <Input
              id='alamat_asal'
              name='alamat_asal'
              placeholder='Alamat Sesuai KTP'
              value={formData.alamat_asal}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='flex justify-end mt-8'>
            <Button
              onClick={handleNext}
              className='text-white bg-[#2658AC]'
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className='flex flex-col justify-center max-w-3xl mx-4 md:mx-auto mt-5 md:mt-[60px] space-y-6'>
          <div className='space-y-2'>
            <label
              htmlFor='asal_instansi'
              className='block text-sm md:text-base font-regular'
            >
              Asal Universitas/Sekolah
            </label>
            <Input
              id='asal_instansi'
              name='asal_instansi'
              placeholder='Asal Universitas atau Sekolah'
              value={formData.asal_instansi}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='jenjang_pendidikan'
              className='block text-sm md:text-base font-regular'
            >
              Jenjang Pendidikan
            </label>
            <Select
              value={formData.jenjang_pendidikan}
              onValueChange={(value) =>
                handleSelectChange(
                  "jenjang_pendidikan",
                  value
                )
              }
            >
              <SelectTrigger className='border-[0.5px] border-[#999999] focus:ring-2 focus:ring-[#3b4f81] rounded-md'>
                <SelectValue placeholder='Pilih Jenjang Pendidikan' />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {jenjangOptions.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={String(item.id)}
                  >
                    {item.pendidikan}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='fakultas'
              className='block text-sm md:text-base font-regular'
            >
              Fakultas (Opsional)
            </label>
            <Input
              id='fakultas'
              name='fakultas'
              placeholder='Fakultas'
              value={formData.fakultas}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='program_studi'
              className='block text-sm md:text-base font-regular'
            >
              Program Studi
            </label>
            <Input
              id='program_studi'
              name='program_studi'
              placeholder='Program Studi'
              value={formData.program_studi}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='nim'
              className='block text-sm md:text-base font-regular'
            >
              Nomor Induk Mahasiswa
            </label>
            <Input
              id='nim'
              name='nim'
              placeholder='Nomor Induk Mahasiswa'
              value={formData.nim}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='semester'
              className='block text-sm md:text-base font-regular'
            >
              Semester Saat Ini
            </label>
            <Input
              id='semester'
              name='semester'
              placeholder='Semester Saat Ini'
              value={formData.semester}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='flex justify-between mt-8'>
            <Button
              onClick={handlePrevious}
              variant='outline'
              className='text-[#2658AC] bg-white'
            >
              Sebelumnya
            </Button>
            <Button
              onClick={handleNext}
              className='text-white bg-[#2658AC]'
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className='flex flex-col justify-center max-w-3xl mx-4 md:mx-auto mt-5 md:mt-[60px] space-y-6'>
          <div className='space-y-2'>
            <label
              htmlFor='durasi'
              className='block text-sm md:text-base font-regular'
            >
              Durasi Magang
            </label>
            <Input
              id='durasi'
              name='durasi'
              placeholder='Durasi Magang'
              value={formData.durasi}
              onChange={handleChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='periodic_mulai'
              className='block text-sm md:text-base font-regular'
            >
              Periode Mulai
            </label>
            <input
              type='date'
              name='periodic_mulai'
              value={
                formData.periodic_mulai
                  ? formData.periodic_mulai
                      .toISOString()
                      .split("T")[0]
                  : ""
              }
              onChange={handleDateChange}
              className='w-full md:w-190 h-8 md:h-12 text-sm border border-[#999999] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] rounded-md px-3 py-2'
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='bidangPeminatan'
              className='block text-sm md:text-base font-regular'
            >
              Bidang Peminatan
            </label>
            <Select
              value={formData.bidang_peminatan}
              onValueChange={(value) =>
                handleSelectChange(
                  "bidang_peminatan",
                  value
                )
              }
            >
              <SelectTrigger className='border-[0.5px] border-[#999999] focus:ring-2 focus:ring-[#3b4f81] rounded-md'>
                <SelectValue placeholder='Pilih Bidang Peminatan' />
              </SelectTrigger>
              <SelectContent className='bg-white'>
                {bidangOptions.map((item) => (
                  <SelectItem
                    key={item.id}
                    value={String(item.id)}
                  >
                    {item.nama_bidang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex justify-between mt-8'>
            <Button
              onClick={handlePrevious}
              variant='outline'
              className='text-[#2658AC] bg-white'
            >
              Sebelumnya
            </Button>
            <Button
              onClick={handleNext}
              className='text-white bg-[#2658AC]'
            >
              Selanjutnya
            </Button>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className='flex flex-col justify-center max-w-3xl mx-4 md:mx-auto mt-5 md:mt-[60px] space-y-6'>
          <form
            onSubmit={handleSubmit}
            className='mt-5 space-y-8'
          >
            <div className='space-y-4 block font-regular text-[#444444]'>
              <CustomFileInput
                id='cv'
                accept='.pdf'
                label='CV atau Portofolio Terbaru (Tipe File PDF dan Ukuran Maksimal 2 MB)'
                width='60%'
                height='34px'
                fontSize='14px'
                className='block text-sm md:text-base font-regular'
                onChange={setFileCV}
              />
              <CustomFileInput
                id='surat_rekomendasi'
                accept='.pdf,.doc,.docx'
                label='Mengirimkan Surat Permohonan/Rekomendasi Magang dari Kampus (dilengkapi dengan mencantumkan periode pelaksanaan magang), ditujukan ke Pemimpin BLUD UPTD KST Solo Technopark.'
                width='60%'
                height='34px'
                fontSize='14px'
                className='block text-sm md:text-base font-regular'
                onChange={setFileSurat}
              />
              <CustomFileInput
                id='proposal'
                accept='.pdf,.doc,.docx'
                label='Proposal Magang (Opsional)'
                width='60%'
                height='34px'
                fontSize='14px'
                className='block text-sm md:text-base font-regular'
                onChange={setFileProposal}
              />
              <CustomFileInput
                id='dok_pendukung'
                accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
                label='Dokumen Pendukung Lainnya (Opsional)'
                width='60%'
                height='34px'
                fontSize='14px'
                className='block text-sm md:text-base font-regular'
                onChange={setFileDokumen}
              />
            </div>

            <div className='flex justify-between mt-8'>
              <Button
                type='button'
                onClick={handlePrevious}
                variant='outline'
                className='text-[#2658AC] bg-white'
              >
                Sebelumnya
              </Button>
              <Button
                type='submit'
                className='bg-[#26DC54] text-white'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className='flex items-center'>
                    <svg
                      className='animate-spin h-4 w-4 mr-2 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8v8z'
                      ></path>
                    </svg>
                    Mengirim...
                  </span>
                ) : (
                  "Kirim"
                )}
              </Button>
            </div>
          </form>

          {/* Pop-up konfirmasi */}
          {showConfirmPopup && (
            <ConfirmationModal
              onClose={() =>
                setShowConfirmPopup(false)
              }
              onConfirm={handleConfirmSubmit}
              actionType='submit'
            />
          )}

          {/* Pop-up sukses */}
          {showSuccessPopup && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
              <div className='bg-white rounded-2xl shadow-lg w-full max-w-lg mx-4 relative p-10 text-center'>
                <button
                  onClick={() =>
                    setShowSuccessPopup(false)
                  }
                  className='absolute top-4 right-4 text-red-500 hover:text-red-600'
                >
                  ×
                </button>
                <div className='flex justify-center mb-4'>
                  <img
                    src='/icons/check.svg'
                    alt='Success Icon'
                    width={48}
                    height={48}
                  />
                </div>
                <h2 className='text-xl font-semibold text-black mb-2'>
                  Berkas Berhasil Terkirim!
                </h2>
                <p className='text-sm text-gray-600 mb-4 px-6'>
                  Silakan periksa bagian{" "}
                  <Link
                    href='informasi'
                    className='text-[#2658AC] font-bold'
                  >
                    Informasi Magang
                  </Link>{" "}
                  untuk detail lebih lanjut.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
