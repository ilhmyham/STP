"use client";

import { myAppHook } from "@/app/context/AppProviders";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "./Loader";

interface ProtectRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Misal ['admin'] atau ['user', 'admin']
}

export const ProtectRoute = ({ children, allowedRoles }: ProtectRouteProps) => {
  const { authToken, isLoading } = myAppHook();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const userRole = typeof window !== "undefined" ? (document.cookie.match('(^|;)\\s*userRole\\s*=\\s*([^;]+)')?.pop() || '') : '';

      if (!authToken || !allowedRoles.includes(userRole)) {
        router.push("/user/auth"); // kalau tidak sesuai, tendang ke login
      }
    }
  }, [authToken, isLoading, router, allowedRoles]);

  if (isLoading) {
    return <div><Loader /></div>;
  }

  return <>{children}</>;
};
