import { NextRequest, NextResponse } from "next/server";
import * as cookie from "cookie";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "@/lib/auth-token";

export async function GET(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookie.parse(cookieHeader);

  if (verifyAuthToken(cookies[AUTH_COOKIE_NAME])) {
    return NextResponse.json({ authenticated: true }, { status: 200 });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
