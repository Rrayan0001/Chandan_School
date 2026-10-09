import { NextResponse } from "next/server";
import { getBlobMetadata, saveBlobMetadata } from "@/lib/gallery-metadata";
import {
  checkText,
  jsonError,
  parseJsonBody,
  parsePrefixedBlobUrl,
  requireAdmin,
} from "@/lib/api-security";

export async function POST(request: Request) {
  const forbidden = requireAdmin(request);
  if (forbidden) return forbidden;

  const parsed = await parseJsonBody(request);
  if (!parsed.ok) return parsed.response;
  const { url, title, caption, category } = parsed.body as {
    url?: unknown;
    title?: unknown;
    caption?: unknown;
    category?: unknown;
  };

  // Only metadata for blobs inside our own gallery/ prefix may be edited —
  // this prevents metadata pollution for foreign or non-existent URLs.
  const allowed = parsePrefixedBlobUrl(url, "gallery/");
  if (!allowed.ok) return allowed.response;

  const titleCheck = checkText(title ?? "", "Title", 200, false);
  if (!titleCheck.ok) return titleCheck.response;
  const captionCheck = checkText(caption ?? "", "Caption", 500, false);
  if (!captionCheck.ok) return captionCheck.response;
  const categoryCheck = checkText(category ?? "", "Category", 100, false);
  if (!categoryCheck.ok) return categoryCheck.response;

  try {
    const metadata = await getBlobMetadata();
    metadata[allowed.url] = {
      title: titleCheck.value,
      caption: captionCheck.value,
      category: categoryCheck.value,
    };

    await saveBlobMetadata(metadata);

    return NextResponse.json({ success: true, metadata: metadata[allowed.url] });
  } catch (error) {
    console.error("Error editing gallery metadata:", error);
    return jsonError("Failed to edit image details.", 500);
  }
}
