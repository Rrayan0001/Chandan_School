import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string) || "Gallery Image";
  const caption = (formData.get("caption") as string) || "";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  // Sanitize filename: prefix with timestamp to avoid collisions
  const safeName = `gallery/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const blob = await put(safeName, file, {
    access: "public",
    // We encode title/caption into the content-disposition filename — retrieved later via list()
    contentType: file.type,
    addRandomSuffix: false,
  });

  // Return the blob URL and the metadata the client submitted
  return NextResponse.json({
    url: blob.url,
    pathname: blob.pathname,
    title,
    caption,
  });
}
