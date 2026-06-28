import { NextResponse } from "next/server";
import { getBlobMetadata, saveBlobMetadata } from "@/lib/gallery-metadata";

export async function POST(request: Request) {
  try {
    const { url, title, caption, category } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    const metadata = await getBlobMetadata();
    metadata[url] = {
      title: title?.trim() || "",
      caption: caption?.trim() || "",
      category: category?.trim() || "",
    };

    await saveBlobMetadata(metadata);

    return NextResponse.json({ success: true, metadata: metadata[url] });
  } catch (error: any) {
    console.error("Error editing gallery metadata:", error);
    return NextResponse.json({ error: error.message || "Failed to edit image details" }, { status: 500 });
  }
}
