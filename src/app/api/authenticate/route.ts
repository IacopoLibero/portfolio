import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import {
  AUTH_COOKIE_NAME,
  SESSION_DURATION_MS,
  createAuthToken,
  passwordMatches,
} from "@/lib/auth-token";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

/** Massimo 5 tentativi ogni 15 minuti per IP, contro il brute force. */
const RATE_LIMIT = {
  name: "authenticate",
  limit: 5,
  windowMs: 15 * 60 * 1000,
} as const;

export async function POST(request: NextRequest) {
  const { allowed, retryAfter } = rateLimit(getClientIp(request), RATE_LIMIT);
  if (!allowed) {
    return NextResponse.json(
      { message: "Too many attempts" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  let password: unknown;
  try {
    password = (await request.json())?.password;
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const correctPassword = process.env.PAGE_ACCESS_PASSWORD;

  if (!correctPassword) {
    console.error("PAGE_ACCESS_PASSWORD environment variable is not set");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  if (!passwordMatches(password, correctPassword)) {
    return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
  }

  const token = createAuthToken();
  if (!token) {
    console.error("Impossibile firmare il token di sessione: segreto non configurato");
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }

  const response = NextResponse.json({ success: true }, { status: 200 });

  response.headers.set(
    "Set-Cookie",
    cookie.serialize(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: SESSION_DURATION_MS / 1000,
      sameSite: "strict",
      path: "/",
    }),
  );

  return response;
}
