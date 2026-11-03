"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import { useAuth } from "./AuthProvider";
import { loginPathFor, requiredRoles, roleHome } from "../lib/routes";

/**
 * Guard tunggal yang dipasang di root layout.
 * - Path publik / halaman auth dilewatkan.
 * - Tanpa sesi pada path terlindungi -> login sesuai role.
 * - Role salah -> halaman utama role tersebut (bukan halaman login).
 * - Children tidak dirender sampai sesi valid, agar konten tidak berkedip.
 */
export const AuthGuard = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoading, isAuthenticated, userRole } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const roles = requiredRoles(pathname);
  const isUnauthorized = !isLoading && roles !== null && !isAuthenticated;
  const isForbidden =
    !isLoading &&
    roles !== null &&
    isAuthenticated &&
    (!userRole || !roles.includes(userRole));
  const shouldRedirect = isUnauthorized || isForbidden;

  useEffect(() => {
    if (!shouldRedirect) return;

    if (isForbidden) {
      router.replace(roleHome(userRole));
    } else {
      router.replace(loginPathFor(pathname, userRole));
    }
  }, [shouldRedirect, isForbidden, pathname, userRole, router]);

  if (isLoading || shouldRedirect) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
};
