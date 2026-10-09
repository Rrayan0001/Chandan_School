import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/api-security";

/**
 * Server-side gate for /admin/* pages. The login page (/admin) stays
 * public; everything else requires the httpOnly admin session cookie
 * issued by POST /api/admin/login. (Client-side sessionStorage checks
 * remain in pages as defense-in-depth only.)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  const token = process.env.ADMIN_API_TOKEN;
  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;

  if (!token || !cookie || cookie.length !== token.length || cookie !== token) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
