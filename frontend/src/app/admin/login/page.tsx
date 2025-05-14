"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [errors, setErrors] = useState<{
    username?: string
    password?: string
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: {
      username?: string
      password?: string
    } = {}
    let valid = true

    if (!username.trim()) {
      newErrors.username = "Username diperlukan"
      valid = false
    }

    if (!password) {
      newErrors.password = "Kata sandi diperlukan"
      valid = false
    } else if (password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const result = await response.json()

      if (result.success) {
        router.push("/")
      } else {
        setError(result.message || "Login gagal")
      }
    } catch (err) {
      console.error(err)
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen md:bg-gradient-to-br from-white to-blue-200 flex items-center justify-center p-4">
      <div className="hidden md:block w-[448px] bg-white rounded-[16px] shadow-lg overflow-hidden">
        <div className="p-10">
          <div className="space-y-8">
            <div className="text-start">
              <h1 className="text-[32px] font-medium text-[#3b4f81]">Halo Admin,</h1>
              <h2 className="text-[32px] font-medium text-[#3b4f81]">Selamat datang kembali!</h2>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[10px]" role="alert">
                <p>{error}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="username" className="block text-[#3b4f81] font-medium text-base">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] text-base"
                />
                {errors.username && <p className="text-red-500 text-sm font-medium">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-[#3b4f81] font-medium text-base">
                  Kata sandi
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Kata sandi"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] text-base"
                />
                {errors.password && <p className="text-red-500 text-sm font-medium">{errors.password}</p>}
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-[116px] bg-[#3b4f81] hover:bg-[#2d3e6a] text-white py-2 rounded-[20px] mt-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-base"
                >
                  {isLoading ? "Memproses..." : "Masuk"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="w-[380px]">
          <div className="p-10">
            <div className="space-y-8">
              <div className="text-start">
                <h1 className="text-[25px] font-medium text-[#3b4f81]">Selamat datang</h1>
                <h2 className="text-[25px] font-medium text-[#3b4f81]">Kembali!</h2>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-[10px]" role="alert">
                  <p>{error}</p>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label htmlFor="mobile-username" className="block text-[#3b4f81] font-medium text-[14px]">
                    Email
                  </label>
                  <input
                    id="mobile-username"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] text-[14px]"
                  />
                  {errors.username && <p className="text-red-500 text-sm font-medium">{errors.username}</p>}
                </div>

                <div className="space-y-2">
                  <label htmlFor="mobile-password" className="block text-[#3b4f81] font-medium text-[14px]">
                    Kata sandi
                  </label>
                  <input
                    id="mobile-password"
                    type="password"
                    placeholder="Kata sandi"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#3b4f81] text-[14px]"
                  />
                  {errors.password && <p className="text-red-500 text-sm font-medium">{errors.password}</p>}
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#3b4f81] hover:bg-[#2d3e6a] text-white py-2 rounded-[20px] mt-4 transition-colors disabled:opacity-70 disabled:cursor-not-allowed text-[14px]"
                  >
                    {isLoading ? "Memproses..." : "Masuk"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
