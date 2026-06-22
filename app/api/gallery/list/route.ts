import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getBlobMetadata, prettifyName } from "@/lib/gallery-metadata";

export async function GET() {
  const { blobs } = await list({ prefix: "gallery/" });

  const metadata = await getBlobMetadata();

  // Filter out metadata.json and other non-image files, and enrich with titles & captions
  const imageBlobs = blobs
    .filter((b) => b.pathname !== "gallery/metadata.json" && !b.pathname.endsWith(".meta.json"))
    .map((b) => ({
      ...b,
      title: metadata[b.url]?.title || prettifyName(b.pathname),
      caption: metadata[b.url]?.caption || "",
    }));

  return NextResponse.json({ blobs: imageBlobs });
}
