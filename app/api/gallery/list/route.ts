import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getBlobMetadata, prettifyName } from "@/lib/gallery-metadata";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { blobs } = await list({ prefix: "gallery/" });

    const metadata = await getBlobMetadata();

    // Filter out metadata.json and other non-image files, and enrich with titles & captions
    const imageBlobs = blobs
      .filter((b) => b.pathname !== "gallery/metadata.json" && !b.pathname.endsWith(".meta.json"))
      .map((b) => ({
        ...b,
        title: metadata[b.url]?.title || prettifyName(b.pathname),
        caption: metadata[b.url]?.caption || "",
        category: metadata[b.url]?.category || "",
      }));

    return NextResponse.json({ blobs: imageBlobs });
  } catch (error: any) {
    console.error("Failed to list gallery images:", error);
    return NextResponse.json(
      { error: error.message || "Failed to list gallery images. Make sure BLOB_READ_WRITE_TOKEN is set in your environment variables." },
      { status: 500 }
    );
  }
}
