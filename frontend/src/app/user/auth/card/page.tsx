"use client";

import type React from "react";
import { useState, useEffect } from "react";
import SuccessModal from "@/components/popup/signup/page";
import Link from "next/link";
import { myAppHook } from "@/app/context/AppProviders";
import { useRouter, usePathname } from "next/navigation";

const FormInput = ({ label, type, name, value, onChange, error }: any) => (
  <div className="space-y-2">
    <label htmlFor={name} className="block text-[#3b4f81] font-medium">
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#3b4f81]"
    />
    {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
  </div>
);

export default function SignupForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();
  const pathname = usePathname();
  const { login, register, authToken, isLoading } = myAppHook();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!formData.email.trim()) {
      newErrors.email = "Email diperlukan";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Kata sandi diperlukan";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter";
      valid = false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Kata sandi tidak cocok";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        if (isLogin) {
          await login(formData.email, formData.password);
        } else {
          await register(
            formData.username,
            formData.email,
            formData.password,
            formData.confirmPassword
          );
          setShowSuccessModal(true);
        }
      } catch (error) {
        console.log(`auth error: ${error}`);
        setErrors((prev) => ({
          ...prev,
          general: "Terjadi kesalahan, coba lagi nanti",
        }));
      }
    }
  };

  useEffect(() => {
    const authPages = ["/login", "/signup"];

    // ✅ Tambahkan pengecekan: hanya redirect kalau di halaman login/signup
    if (!authPages.includes(pathname)) {
      return; // Tidak melakukan apa-apa jika bukan di halaman login atau signup
    }

    if (authToken) {
      router.push("/user/beranda");
    }
  }, [authToken, pathname, router]);

  return (
    <>
      <div className="hidden lg:block bg-white rounded-[16px] shadow-lg w-[473px]">
        <div className="p-10">
          <div className="space-y-8">
            <div className="text-start">
              <h1 className="text-[32px] font-medium text-[#3b4f81]">
                Selamat datang,
              </h1>
              <h2 className="text-[32px] font-medium text-[#3b4f81]">
                {isLogin ? "Kembali!" : "Silakan buat akun"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <FormInput
                  label="Nama Pengguna"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                />
              )}

              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FormInput
                label="Kata Sandi"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              {!isLogin && (
                <FormInput
                  label="Konfirmasi Kata Sandi"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-[116px] bg-[#3b4f81] hover:bg-[#2d3e6a] text-white py-2 rounded-[20px] mt-4 transition-colors"
                >
                  {isLogin ? "Masuk" : "Daftar"}
                </button>
              </div>
            </form>

            {errors.general && (
              <div className="text-center text-red-500 font-medium mt-4">
                <p>{errors.general}</p>
              </div>
            )}

            <div className="text-center text-[#3b4f81] font-medium">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                style={{ cursor: "pointer" }}
              >
                {isLogin ? "Daftar" : "Masuk"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-[380px] md:w-[473px] lg:hidden">
        <div className="p-10">
          <div className="space-y-8">
            <div className="text-start">
              <h1 className="text-[26px] sm:text-[32px] font-medium text-[#3b4f81]">
                Selamat datang,
              </h1>
              <h2 className="text-[26px] sm:text-[32px] font-medium text-[#3b4f81]">
                {isLogin ? "Kembali!" : "Silakan buat akun"}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <FormInput
                  label="Nama Pengguna"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={errors.username}
                />
              )}

              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FormInput
                label="Kata Sandi"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              {!isLogin && (
                <FormInput
                  label="Konfirmasi Kata Sandi"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                />
              )}

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full bg-[#3b4f81] hover:bg-[#2d3e6a] text-white text-[14px] sm:text-base py-2 rounded-[20px] mt-4 transition-colors"
                >
                  {isLogin ? "Masuk" : "Daftar"}
                </button>
              </div>
            </form>

            {errors.general && (
              <div className="text-center text-red-500 font-medium mt-4">
                <p>{errors.general}</p>
              </div>
            )}

            <div className="text-center text-[#3b4f81] font-medium text-[14px] sm:text-base">
              {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
              <span
                onClick={() => setIsLogin(!isLogin)}
                style={{ cursor: "pointer" }}
              >
                {isLogin ? "Daftar" : "Masuk"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal onClose={() => setShowSuccessModal(false)} />
      )}
    </>
  );
}
