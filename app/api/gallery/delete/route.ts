import { del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getBlobMetadata, saveBlobMetadata } from "@/lib/gallery-metadata";
import {
  jsonError,
  parseJsonBody,
  parsePrefixedBlobUrl,
  requireAdmin,
} from "@/lib/api-security";

export async function DELETE(request: Request) {
  const forbidden = requireAdmin(request);
  if (forbidden) return forbidden;

  const parsed = await parseJsonBody(request);
  if (!parsed.ok) return parsed.response;
  const { url } = parsed.body as { url?: unknown };

  // Only URLs inside our own gallery/ prefix may be deleted.
  const allowed = parsePrefixedBlobUrl(url, "gallery/");
  if (!allowed.ok) return allowed.response;

  try {
    await del(allowed.url);
  } catch (err) {
    console.error("Failed to delete gallery blob:", err);
    return jsonError("Failed to delete image.", 500);
  }

  // Clean up deleted URL key from metadata (best effort).
  try {
    const metadata = await getBlobMetadata();
    if (metadata[allowed.url]) {
      delete metadata[allowed.url];
      await saveBlobMetadata(metadata);
    }
  } catch (err) {
    console.error("Failed to delete image metadata from store:", err);
  }

  return NextResponse.json({ deleted: true });
}
