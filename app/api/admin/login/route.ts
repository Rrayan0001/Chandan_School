import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, jsonError, safeEqual } from "@/lib/api-security";

export const dynamic = "force-dynamic";

// Simple in-memory rate limit for password guessing (per runtime instance).
const attempts = new Map<string, { count: number; resetAt: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

function clientKey(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const apiToken = process.env.ADMIN_API_TOKEN;
  if (!adminPassword || !apiToken) {
    console.error("Admin login attempted but ADMIN_PASSWORD/ADMIN_API_TOKEN are not configured.");
    return jsonError(
      "Admin login is not configured. Set ADMIN_PASSWORD and ADMIN_API_TOKEN in the server environment.",
      503
    );
  }

  const key = clientKey(request);
  const now = Date.now();
  const record = attempts.get(key);
  if (record && record.resetAt > now && record.count >= MAX_ATTEMPTS) {
    return jsonError("Too many login attempts. Try again later.", 429);
  }
  if (!record || record.resetAt <= now) {
    attempts.set(key, { count: 0, resetAt: now + WINDOW_MS });
  }

  let password: unknown;
  try {
    const body = (await request.json()) as { password?: unknown };
    password = body?.password;
  } catch {
    return jsonError("Invalid JSON body.", 400);
  }
  if (typeof password !== "string" || password === "") {
    return jsonError("Password is required.", 400);
  }

  if (!safeEqual(password, adminPassword)) {
    const entry = attempts.get(key);
    if (entry) entry.count += 1;
    // Same delay shape as success path to avoid timing oracles.
    await new Promise((r) => setTimeout(r, 400));
    return jsonError("Incorrect password.", 401);
  }

  attempts.delete(key);

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, apiToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 12 * 60 * 60,
  });
  return response;
}
