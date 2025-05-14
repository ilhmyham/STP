"use client";

import Loader from "@/components/Loader";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";


interface AppProviderType {
  isLoading: boolean;
  authToken: string | null;
  userRole: string | null; // TAMBAH
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  logout: () => void;
}

const AppContext = createContext<AppProviderType | undefined>(undefined);
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/", "/user/auth"];

  useEffect(() => {
  const token = Cookies.get("authToken");
  const role = Cookies.get("userRole");
  const isPublicRoute = publicRoutes.includes(pathname);

  if (!token && !isPublicRoute) {
    router.push("/user/auth");
  } else if (token && role) {
    // Jika user mencoba akses admin tapi rolenya bukan admin
    if (pathname.startsWith("/admin") && role !== "admin") {
      router.push("/user/auth"); // atau arahkan ke halaman unauthorized
    }
    setAuthToken(token);
    setUserRole(role);
  }
  setIsLoading(false);
}, [pathname]);

  const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });

    if (response.data.status) {
      console.log(response.data)
      Cookies.set("authToken", response.data.token, { expires: 7 });
      Cookies.set("userRole", response.data.role, { expires: 7 });

      setAuthToken(response.data.token);
      setUserRole(response.data.role);

      // ➡️ Tambahkan delay sedikit sebelum push router
      setTimeout(() => {
        if (response.data.role === 'admin') {
          router.push("/admin");
        } else if (response.data.role === 'user') {
          router.push("/user/beranda");
        } else {
          router.push("/");
        }
      }, 100); // 100ms delay
    } else {
      console.error("Login gagal:", response.data);
    }
  } catch (error) {
    console.error("Error saat login:", error);
  }
};


  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password, password_confirmation });
      console.log("Register sukses:", response.data);
    } catch (error) {
      console.error("Error saat register:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUserRole(null); // ⬅️
    Cookies.remove("authToken");
    Cookies.remove("userRole");
    router.push("/user/auth");
  };

  return (
    <AppContext.Provider value={{ login, register, isLoading, authToken, logout, userRole }}>
      {isLoading ? <Loader /> : children}
    </AppContext.Provider>
  );
};

export const myAppHook = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Context harus dibungkus dalam AppProvider.");
  }
  return context;
};
