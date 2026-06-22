import { NextResponse } from "next/server";
import { getBlobMetadata, saveBlobMetadata } from "@/lib/gallery-metadata";

export async function POST(request: Request) {
  try {
    const { url, title, caption } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    const metadata = await getBlobMetadata();
    metadata[url] = {
      title: title?.trim() || "",
      caption: caption?.trim() || "",
    };

    await saveBlobMetadata(metadata);

    return NextResponse.json({ success: true, metadata: metadata[url] });
  } catch {
    return NextResponse.json({ error: "Failed to edit image details" }, { status: 500 });
  }
}
