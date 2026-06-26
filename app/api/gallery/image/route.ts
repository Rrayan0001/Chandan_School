import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  // Security check: Only allow URLs from vercel blob storage domain to prevent SSRF
  if (!url.includes(".blob.vercel-storage.com")) {
    return NextResponse.json({ error: "Invalid URL domain" }, { status: 400 });
  }

  try {
    const result = await get(url, {
      access: "private",
    });

    const contentType = result.blob.contentType || "image/png";

    return new Response(result.stream, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Error proxying private blob image:", error);
    return NextResponse.json({ error: error.message || "Error proxying private blob image" }, { status: 500 });
  }
}
