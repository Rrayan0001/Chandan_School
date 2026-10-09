import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import {
  capStream,
  jsonError,
  parseAllowedBlobUrl,
  proxyTimeout,
  sanitizeFilename,
} from "@/lib/api-security";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const allowed = parseAllowedBlobUrl(searchParams.get("url"));
  if (!allowed.ok) return allowed.response;

  try {
    const result = await proxyTimeout(get(allowed.url, { access: "private" }));

    if (!result) {
      return jsonError("PDF not found.", 404);
    }

    // Force attachment headers so it initiates a browser download instead of rendering in-browser
    const { header } = sanitizeFilename(
      searchParams.get("filename") || "circular.pdf",
      "circular.pdf",
      ".pdf"
    );

    return new Response(capStream(result.stream), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": header,
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Error proxying PDF download:", error);
    return jsonError("Failed to download PDF.", 500);
  }
}
