// middleware.ts
import {
  NextResponse,
  NextRequest,
} from "next/server";

export function middleware(
  req: NextRequest
): NextResponse {
  const token = req.cookies.get("auth-token");

  if (!token) {
    // Redirect jika tidak ada token
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  // Melanjutkan ke request berikutnya jika ada token
  return NextResponse.next();
}

export const config = {
  matcher: ["user/profile/"], // Tentukan path yang ingin dicocokkan
};
