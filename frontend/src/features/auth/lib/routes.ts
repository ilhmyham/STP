export const USER_LOGIN_PATH = "/user/auth";
export const ADMIN_LOGIN_PATH = "/admin/login";
export const LEGACY_USER_LOGIN_PATH = "/user/login";

const ROLE_HOME: Record<string, string> = {
  admin: "/admin",
  user: "/user/beranda",
};

/** Halaman login yang sesuai dengan role saat ini. */
export function loginPath(role?: string | null): string {
  return role === "admin" ? ADMIN_LOGIN_PATH : USER_LOGIN_PATH;
}

/**
 * Halaman login untuk guard. Jika role belum diketahui (mis. sesi baru
 * dihapus saat logout di area admin), infer dari path saat ini agar admin
 * tetap diarahkan ke /admin/login.
 */
export function loginPathFor(
  pathname: string,
  role?: string | null
): string {
  if (role) return loginPath(role);
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return ADMIN_LOGIN_PATH;
  }
  return USER_LOGIN_PATH;
}

/** Halaman utama setelah login, mengikuti perilaku sebelumnya. */
export function roleHome(role?: string | null): string {
  return (role && ROLE_HOME[role]) || "/";
}

/** Halaman auth harus selalu publik agar tidak terjadi redirect loop. */
export function isAuthPage(pathname: string): boolean {
  return (
    pathname === USER_LOGIN_PATH ||
    pathname.startsWith(`${USER_LOGIN_PATH}/`) ||
    pathname === ADMIN_LOGIN_PATH ||
    pathname.startsWith(`${ADMIN_LOGIN_PATH}/`) ||
    pathname === LEGACY_USER_LOGIN_PATH ||
    pathname.startsWith(`${LEGACY_USER_LOGIN_PATH}/`)
  );
}

/**
 * Role yang dibutuhkan sebuah path.
 * `null` berarti publik (termasuk halaman auth dan path yang tidak dikenal).
 */
export function requiredRoles(pathname: string): readonly string[] | null {
  if (isAuthPage(pathname) || pathname === "/") return null;

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return ["admin"];
  }

  if (pathname === "/user" || pathname.startsWith("/user/")) {
    return ["user"];
  }

  return null;
}
