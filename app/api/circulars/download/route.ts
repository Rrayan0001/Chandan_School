import { get } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const filename = searchParams.get("filename") || "circular.pdf";

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  if (!url.includes(".blob.vercel-storage.com")) {
    return NextResponse.json({ error: "Invalid URL domain" }, { status: 400 });
  }

  try {
    const result = await get(url, {
      access: "private",
    });

    if (!result) {
      return NextResponse.json({ error: "PDF not found" }, { status: 404 });
    }

    // Force attachment headers so it initiates a browser download instead of rendering in-browser
    const safeFilename = filename.toLowerCase().endsWith(".pdf") ? filename : `${filename}.pdf`;

    return new Response(result.stream, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(safeFilename)}"`,
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("Error proxying PDF download:", error);
    return NextResponse.json({ error: error.message || "Error proxying PDF download" }, { status: 500 });
  }
}
