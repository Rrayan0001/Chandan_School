import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import {
  capStream,
  jsonError,
  parseAllowedBlobUrl,
  proxyTimeout,
  safeProxyContentType,
} from "@/lib/api-security";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const allowed = parseAllowedBlobUrl(searchParams.get("url"));
  if (!allowed.ok) return allowed.response;

  try {
    const result = await proxyTimeout(get(allowed.url, { access: "private" }));

    if (!result) {
      return jsonError("Image not found.", 404);
    }

    const { contentType, forceDownload } = safeProxyContentType(
      result.blob.contentType,
      "application/octet-stream"
    );

    const headers: Record<string, string> = {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    };
    if (forceDownload) {
      headers["Content-Disposition"] = "attachment";
    }

    return new Response(capStream(result.stream), { headers });
  } catch (error) {
    console.error("Error proxying private event image:", error);
    return jsonError("Failed to load image.", 500);
  }
}
