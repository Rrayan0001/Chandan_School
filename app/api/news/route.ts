import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getNewsMetadata, saveNewsMetadata, NewsItem } from "@/lib/news-metadata";
import {
  checkText,
  isValidDateString,
  isValidId,
  jsonError,
  MAX_LIST_ITEMS,
  newId,
  parseJsonBody,
  requireAdmin,
  SAFE_IMAGE_TYPES,
  sortByDateDesc,
  validateUpload,
} from "@/lib/api-security";

export const dynamic = "force-dynamic";

const MAX_BYTES = 10 * 1024 * 1024;
const IMAGE_EXTS = [".gif", ".jpg", ".jpeg", ".png", ".webp"];
const MAX_DATE = new Date("2026-12-31").getTime();

export async function GET() {
  try {
    const news = await getNewsMetadata();
    // Sort news by date descending, or by createdAt as fallback
    const sorted = sortByDateDesc(news, (item) => item.date).slice(0, MAX_LIST_ITEMS);
    return NextResponse.json({ news: sorted });
  } catch (error) {
    console.error("Failed to list news:", error);
    return NextResponse.json({ error: "Failed to list news." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const forbidden = requireAdmin(request);
  if (forbidden) return forbidden;

  try {
    const formData = await request.formData();
    const title = (formData.get("title") as string) || "";
    const caption = (formData.get("caption") as string) || "";
    const content = (formData.get("content") as string) || "";
    const date = (formData.get("date") as string) || new Date().toISOString().split("T")[0];
    const file = formData.get("file") as File | null;

    if (!isValidDateString(date)) {
      return jsonError("Date is invalid.", 400);
    }
    if (new Date(date).getTime() > MAX_DATE) {
      return jsonError("Date cannot be after 31st December 2026.", 400);
    }

    const titleCheck = checkText(title, "Title", 300, true);
    if (!titleCheck.ok) return titleCheck.response;
    const captionCheck = checkText(caption, "Caption", 500, false);
    if (!captionCheck.ok) return captionCheck.response;
    const contentCheck = checkText(content, "Content", 20000, true);
    if (!contentCheck.ok) return contentCheck.response;

    let gifUrl = "";
    if (file) {
      // Raster images only — SVG/HTML uploads are rejected (stored-XSS risk).
      const upload = validateUpload(file, SAFE_IMAGE_TYPES, IMAGE_EXTS, MAX_BYTES, "image");
      if (!upload.ok) return upload.response;
      const safeName = `news/media/${newId("media")}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const blob = await put(safeName, file, {
        access: "private",
        contentType: upload.contentType,
        addRandomSuffix: false,
      });
      gifUrl = blob.url;
    }

    const newsList = await getNewsMetadata();
    const newItem: NewsItem = {
      id: newId("news"),
      title: titleCheck.value,
      caption: captionCheck.value,
      content: contentCheck.value,
      gifUrl: gifUrl || undefined,
      date,
      createdAt: new Date().toISOString(),
    };

    newsList.push(newItem);
    await saveNewsMetadata(newsList);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("Failed to save news item:", error);
    return NextResponse.json({ error: "Failed to save news item." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const forbidden = requireAdmin(request);
  if (forbidden) return forbidden;

  try {
    const parsed = await parseJsonBody(request);
    if (!parsed.ok) return parsed.response;
    const { id } = parsed.body as { id?: unknown };
    if (!isValidId(id)) {
      return jsonError("Missing id.", 400);
    }

    const newsList = await getNewsMetadata();
    const itemToDelete = newsList.find((item) => item.id === id);

    // Delete associated media file if we know its URL
    if (itemToDelete?.gifUrl) {
      try {
        await del(itemToDelete.gifUrl);
      } catch (err) {
        console.error("Failed to delete blob file", err);
      }
    }

    // Always filter and save — even if item wasn't found in this read.
    // Vercel Blob CDN can return a stale metadata.json on first read right after a
    // write, causing itemToDelete to be undefined even though the item exists.
    // By unconditionally saving the filtered list we guarantee the item is removed.
    const filtered = newsList.filter((item) => item.id !== id);
    await saveNewsMetadata(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete news item:", error);
    return NextResponse.json({ error: "Failed to delete news item." }, { status: 500 });
  }
}
