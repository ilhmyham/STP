import { AuthInput } from "./AuthInput";
import type { AuthFormViewProps } from "../types";

export const AuthFormMobile = ({
  isLogin,
  formData,
  errors,
  onChange,
  onSubmit,
  onToggleMode,
}: AuthFormViewProps) => (
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

        <form onSubmit={onSubmit} className="space-y-4">
          {!isLogin && (
            <AuthInput
              label="Nama Pengguna"
              type="text"
              name="username"
              value={formData.username}
              onChange={onChange}
              error={errors.username}
            />
          )}

          <AuthInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            error={errors.email}
          />

          <AuthInput
            label="Kata Sandi"
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            error={errors.password}
          />

          {!isLogin && (
            <AuthInput
              label="Konfirmasi Kata Sandi"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
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
          <span onClick={onToggleMode} style={{ cursor: "pointer" }}>
            {isLogin ? "Daftar" : "Masuk"}
          </span>
        </div>
      </div>
    </div>
  </div>
);
