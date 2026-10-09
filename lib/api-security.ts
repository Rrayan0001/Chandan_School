import { NextResponse } from "next/server";

/**
 * Shared server-side security helpers for all /api routes.
 *
 * - Mutating routes require admin auth (Bearer ADMIN_API_TOKEN or the
 *   httpOnly `admin_session` cookie set by POST /api/admin/login).
 * - Blob proxy URLs are parsed with `new URL()` (https-only, exact
 *   *.blob.vercel-storage.com hostname) — never substring checks.
 * - Error responses use generic messages; details stay in server logs.
 */

export const ADMIN_SESSION_COOKIE = "admin_session";

/** Max items returned by any public list GET. */
export const MAX_LIST_ITEMS = 500;

/** Max bytes streamed through any blob proxy (uploads cap at 15 MB). */
export const MAX_PROXY_BYTES = 25 * 1024 * 1024;

/** Raster image types we accept/store. SVG/HTML are never allowed. */
export const SAFE_IMAGE_TYPES = new Set([
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const BLOB_HOST_SUFFIX = ".blob.vercel-storage.com";

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

/**
 * Constant-time string comparison (length-guarded). Pure TypeScript so it
 * runs in Node route handlers and the Edge middleware alike.
 */
export function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length || a.length === 0) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Gate for POST/DELETE routes. Returns an error response when the caller
 * is not an authenticated admin, or null when the request may proceed.
 * Accepts `Authorization: Bearer <token>` or the admin session cookie.
 * Also rejects cross-origin browser mutations via the Origin header.
 */
export function requireAdmin(request: Request): NextResponse | null {
  const token = process.env.ADMIN_API_TOKEN;
  if (!token) {
    console.error("ADMIN_API_TOKEN is not configured; rejecting mutation.");
    return jsonError("Admin API is not configured.", 503);
  }

  const origin = request.headers.get("origin");
  if (origin) {
    let originHost: string;
    try {
      originHost = new URL(origin).host;
    } catch {
      return jsonError("Forbidden.", 403);
    }
    const host =
      request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
      request.headers.get("host") ||
      "";
    if (!host || originHost !== host) {
      return jsonError("Forbidden.", 403);
    }
  }

  const authHeader = request.headers.get("authorization") || "";
  const bearer = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length).trim()
    : "";

  const cookieHeader = request.headers.get("cookie") || "";
  const cookieToken = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.slice(ADMIN_SESSION_COOKIE.length + 1)
    .trim();
  let decodedCookie = "";
  if (cookieToken) {
    try {
      decodedCookie = decodeURIComponent(cookieToken);
    } catch {
      decodedCookie = "";
    }
  }

  const ok =
    (bearer !== "" && safeEqual(bearer, token)) ||
    (decodedCookie !== "" && safeEqual(decodedCookie, token));

  if (!ok) {
    return jsonError("Unauthorized.", 401);
  }
  return null;
}

/** Parse + validate a caller-supplied Blob URL for proxying/deletion. */
export function parseAllowedBlobUrl(
  raw: unknown
): { ok: true; url: string } | { ok: false; response: NextResponse } {
  if (!raw || typeof raw !== "string") {
    return { ok: false, response: jsonError("Missing url parameter.", 400) };
  }
  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    return { ok: false, response: jsonError("Invalid URL.", 400) };
  }
  if (parsed.protocol !== "https:") {
    return { ok: false, response: jsonError("Invalid URL.", 400) };
  }
  if (parsed.username !== "" || parsed.password !== "") {
    return { ok: false, response: jsonError("Invalid URL.", 400) };
  }
  if (!parsed.hostname.endsWith(BLOB_HOST_SUFFIX)) {
    return { ok: false, response: jsonError("Invalid URL.", 400) };
  }
  return { ok: true, url: parsed.toString() };
}

/** Same as above, but also requires the Blob path to start with `prefix`. */
export function parsePrefixedBlobUrl(
  raw: unknown,
  prefix: string
): { ok: true; url: string } | { ok: false; response: NextResponse } {
  const parsed = parseAllowedBlobUrl(raw);
  if (!parsed.ok) return parsed;
  let pathname: string;
  try {
    pathname = decodeURIComponent(new URL(parsed.url).pathname);
  } catch {
    return { ok: false, response: jsonError("Invalid URL.", 400) };
  }
  // Strip the leading "/" for prefix comparison.
  if (!pathname.replace(/^\//, "").startsWith(prefix)) {
    return { ok: false, response: jsonError("Invalid URL.", 400) };
  }
  return parsed;
}

/**
 * Map a stored content type to a safe response content type.
 * Anything outside the raster-image allowlist is forced to download
 * as application/octet-stream (kills stored SVG/HTML XSS).
 */
export function safeProxyContentType(
  stored: string | undefined | null,
  fallback: string
): { contentType: string; forceDownload: boolean } {
  const normalized = (stored || "").split(";")[0]?.trim().toLowerCase() || "";
  if (SAFE_IMAGE_TYPES.has(normalized)) {
    return { contentType: normalized, forceDownload: false };
  }
  if (normalized === "application/pdf") {
    return { contentType: normalized, forceDownload: false };
  }
  return { contentType: fallback, forceDownload: true };
}

/** Cap a proxied byte stream; errors past `MAX_PROXY_BYTES`. */
export function capStream(
  stream: ReadableStream<Uint8Array> | null,
  maxBytes = MAX_PROXY_BYTES
): ReadableStream<Uint8Array> {
  if (!stream) {
    throw new Error("Proxy upstream returned no content.");
  }
  let seen = 0;
  return stream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        seen += chunk.byteLength;
        if (seen > maxBytes) {
          controller.error(new Error("Proxied response exceeds size limit."));
        } else {
          controller.enqueue(chunk);
        }
      },
    })
  );
}

/** Reject oversized responses with a timeout so proxies can't hang. */
export function proxyTimeout<T>(promise: Promise<T>, ms = 20000): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Proxy upstream timed out.")), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * Sanitize a user-supplied download filename: allowlist chars, length cap,
 * guaranteed extension. Returns both header-safe variants.
 */
export function sanitizeFilename(
  raw: unknown,
  fallback: string,
  extension: string
): { header: string } {
  let name = typeof raw === "string" && raw.trim() !== "" ? raw.trim() : fallback;
  // Strip path components and keep a conservative charset.
  name = name.split(/[\\/]/).pop() || fallback;
  name = name.replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/_+/g, "_");
  const lowerExt = extension.toLowerCase();
  if (!name.toLowerCase().endsWith(lowerExt)) {
    name = `${name}${lowerExt}`;
  }
  // Cap length (leave room for the extension).
  const maxBase = 80;
  if (name.length > maxBase + lowerExt.length) {
    name = `${name.slice(0, maxBase)}${lowerExt}`;
  }
  const encoded = encodeURIComponent(name);
  return {
    header: `attachment; filename="${encoded}"; filename*=UTF-8''${encoded}`,
  };
}

/** True for non-empty strings that parse to a real date. */
export function isValidDateString(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    !Number.isNaN(new Date(value).getTime())
  );
}

/** Validate an id coming from a DELETE body. */
export function isValidId(value: unknown): value is string {
  return typeof value === "string" && value.length >= 1 && value.length <= 128;
}

/** Collision-proof ids. */
export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

/** Safely parse a JSON body; 400 on malformed payloads. */
export async function parseJsonBody(
  request: Request
): Promise<{ ok: true; body: unknown } | { ok: false; response: NextResponse }> {
  try {
    const body: unknown = await request.json();
    if (body === null || typeof body !== "object") {
      return { ok: false, response: jsonError("Invalid JSON body.", 400) };
    }
    return { ok: true, body };
  } catch {
    return { ok: false, response: jsonError("Invalid JSON body.", 400) };
  }
}

/** Sort newest-first; unparseable dates sink to the end (never NaN). */
export function sortByDateDesc<T>(items: T[], pick: (item: T) => unknown): T[] {
  const time = (item: T): number => {
    const value = pick(item);
    if (typeof value !== "string" || value === "") return Number.NEGATIVE_INFINITY;
    const t = new Date(value).getTime();
    return Number.isNaN(t) ? Number.NEGATIVE_INFINITY : t;
  };
  return [...items].sort((a, b) => time(b) - time(a));
}

/**
 * Validate an uploaded file against an allowlist. Returns the canonical
 * content type to store, or an error response. `allowedExts` is checked
 * against the original filename as a second signal.
 */
export function validateUpload(
  file: File,
  allowedTypes: Set<string>,
  allowedExts: string[],
  maxBytes: number,
  kind: string
): { ok: true; contentType: string } | { ok: false; response: NextResponse } {
  const claimed = (file.type || "").split(";")[0]?.trim().toLowerCase() || "";
  const lowerName = file.name.toLowerCase();
  const extOk = allowedExts.some((ext) => lowerName.endsWith(ext));
  if (!allowedTypes.has(claimed) || !extOk) {
    return {
      ok: false,
      response: jsonError(`Only ${kind} files are allowed.`, 400),
    };
  }
  if (file.size <= 0) {
    return { ok: false, response: jsonError("Uploaded file is empty.", 400) };
  }
  if (file.size > maxBytes) {
    const mb = Math.round(maxBytes / (1024 * 1024));
    return {
      ok: false,
      response: jsonError(`File size must be under ${mb} MB.`, 400),
    };
  }
  return { ok: true, contentType: claimed };
}

/** Check the magic bytes of a File (e.g. "%PDF-" for PDFs). */
export async function fileStartsWith(
  file: File,
  prefix: string
): Promise<boolean> {
  try {
    const head = await file.slice(0, prefix.length).text();
    return head === prefix;
  } catch {
    return false;
  }
}

/** Cap a text field; 400 when missing (if required) or too long. */
export function checkText(
  value: unknown,
  field: string,
  max: number,
  required: boolean
): { ok: true; value: string } | { ok: false; response: NextResponse } {
  const text = typeof value === "string" ? value.trim() : "";
  if (required && text === "") {
    return { ok: false, response: jsonError(`${field} is required.`, 400) };
  }
  if (text.length > max) {
    return {
      ok: false,
      response: jsonError(`${field} must be under ${max} characters.`, 400),
    };
  }
  return { ok: true, value: text };
}
