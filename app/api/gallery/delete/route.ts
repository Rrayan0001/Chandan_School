import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getBlobMetadata, saveBlobMetadata } from "@/lib/gallery-metadata";

export async function DELETE(request: Request) {
  const { url } = await request.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 });
  }

  await del(url);

  // Clean up deleted URL key from Vercel Blob store metadata
  try {
    const metadata = await getBlobMetadata();
    if (metadata[url]) {
      delete metadata[url];
      await saveBlobMetadata(metadata);
    }
  } catch (err) {
    console.error("Failed to delete image metadata from store:", err);
  }

  return NextResponse.json({ deleted: true });
}
