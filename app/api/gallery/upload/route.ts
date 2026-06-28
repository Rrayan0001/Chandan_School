import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getBlobMetadata, saveBlobMetadata, prettifyName } from "@/lib/gallery-metadata";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "Gallery Image";
    const caption = (formData.get("caption") as string) || "";
    const category = (formData.get("category") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be under 2 MB." }, { status: 400 });
    }

    // Sanitize filename: prefix with timestamp to avoid collisions
    const safeName = `gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

    const blob = await put(safeName, file, {
      access: "private",
      contentType: file.type,
      addRandomSuffix: false,
    });

    // Save metadata to Vercel Blob store
    try {
      const metadata = await getBlobMetadata();
      metadata[blob.url] = {
        title: title.trim() || prettifyName(blob.pathname),
        caption: caption.trim(),
        category: category.trim(),
      };
      await saveBlobMetadata(metadata);
    } catch (err) {
      console.error("Failed to save uploaded image metadata:", err);
    }

    // Return the blob URL and the metadata the client submitted
    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      title,
      caption,
    });
  } catch (error: any) {
    console.error("Failed to upload image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload image. Make sure BLOB_READ_WRITE_TOKEN is set in your environment variables." },
      { status: 500 }
    );
  }
}
