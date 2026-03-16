import { NextRequest, NextResponse } from "next/server";
import { createToken, getPassword, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (password !== getPassword()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = await createToken();

  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
