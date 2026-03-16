import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "veqtis-intern-auth";
const secret = new TextEncoder().encode(
  process.env.INTERN_JWT_SECRET || "veqtis-dev-secret-change-in-prod"
);

export async function createToken(): Promise<string> {
  return new SignJWT({ role: "intern" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyToken(token);
}

export function getPassword(): string {
  return process.env.INTERN_PASSWORD || "veqtis2024";
}

export { COOKIE_NAME };
