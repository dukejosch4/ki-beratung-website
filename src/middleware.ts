import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "veqtis-intern-auth";
const secret = new TextEncoder().encode(
  process.env.INTERN_JWT_SECRET || "veqtis-dev-secret-change-in-prod"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip login page, auth API, and mockup preview (for Playwright access)
  if (
    pathname === "/intern/login" ||
    pathname === "/api/intern/auth" ||
    pathname.startsWith("/intern/mockup-preview")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/intern/login", request.url));
  }

  try {
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/intern/login", request.url));
  }
}

export const config = {
  matcher: ["/intern/:path*", "/api/intern/:path*"],
};
