import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET() {
  const { blobs } = await list({ prefix: "gallery/" });

  // Parse title and caption from the JSON metadata file that was stored alongside the blob.
  // Since Vercel Blob doesn't support custom metadata directly, we store a parallel
  // metadata JSON file for each image (gallery/<timestamp>-<name>.meta.json).
  // Here we just return all non-meta blobs with their pathname-derived titles.
  const imageBlobs = blobs.filter((b) => !b.pathname.endsWith(".meta.json"));

  return NextResponse.json({ blobs: imageBlobs });
}
