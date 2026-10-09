import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getBlobMetadata, saveBlobMetadata, prettifyName } from "@/lib/gallery-metadata";
import {
  checkText,
  jsonError,
  newId,
  requireAdmin,
  SAFE_IMAGE_TYPES,
  validateUpload,
} from "@/lib/api-security";

const MAX_BYTES = 2 * 1024 * 1024;
const IMAGE_EXTS = [".gif", ".jpg", ".jpeg", ".png", ".webp"];

export async function POST(request: Request) {
  const forbidden = requireAdmin(request);
  if (forbidden) return forbidden;

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "Gallery Image";
    const caption = (formData.get("caption") as string) || "";
    const category = (formData.get("category") as string) || "";

    if (!file) {
      return jsonError("No file provided.", 400);
    }

    const titleCheck = checkText(title, "Title", 200, false);
    if (!titleCheck.ok) return titleCheck.response;
    const captionCheck = checkText(caption, "Caption", 500, false);
    if (!captionCheck.ok) return captionCheck.response;
    const categoryCheck = checkText(category, "Category", 100, false);
    if (!categoryCheck.ok) return categoryCheck.response;

    // Raster images only — SVG/HTML uploads are rejected (stored-XSS risk).
    const upload = validateUpload(file, SAFE_IMAGE_TYPES, IMAGE_EXTS, MAX_BYTES, "image");
    if (!upload.ok) return upload.response;

    // Sanitize filename: prefix with a random id to avoid collisions.
    const safeName = `gallery/${newId("img")}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const blob = await put(safeName, file, {
      access: "private",
      contentType: upload.contentType,
      addRandomSuffix: false,
    });

    // Metadata must persist — a failure here is a real error, not success.
    try {
      const metadata = await getBlobMetadata();
      metadata[blob.url] = {
        title: titleCheck.value || prettifyName(blob.pathname),
        caption: captionCheck.value,
        category: categoryCheck.value,
      };
      await saveBlobMetadata(metadata);
    } catch (err) {
      console.error("Failed to save uploaded image metadata:", err);
      return jsonError("Upload saved but cataloguing failed. Please retry.", 500);
    }

    // Return the blob URL and the metadata the client submitted
    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      title,
      caption,
    });
  } catch (error) {
    console.error("Failed to upload image:", error);
    return jsonError("Failed to upload image.", 500);
  }
}
