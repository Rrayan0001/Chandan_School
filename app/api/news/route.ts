import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getNewsMetadata, saveNewsMetadata, NewsItem } from "@/lib/news-metadata";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const news = await getNewsMetadata();
    // Sort news by date descending, or by createdAt as fallback
    const sorted = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ news: sorted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to list news" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = (formData.get("title") as string) || "";
    const caption = (formData.get("caption") as string) || "";
    const content = (formData.get("content") as string) || "";
    const date = (formData.get("date") as string) || new Date().toISOString().split("T")[0];
    const file = formData.get("file") as File | null;

    if (date && new Date(date).getTime() > new Date("2026-12-31").getTime()) {
      return NextResponse.json({ error: "Date cannot be after 31st December 2026" }, { status: 400 });
    }

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    let gifUrl = "";
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "File size must be under 10 MB." }, { status: 400 });
      }
      const safeName = `news/media/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
      const blob = await put(safeName, file, {
        access: "private",
        contentType: file.type,
        addRandomSuffix: false,
      });
      gifUrl = blob.url;
    }

    const newsList = await getNewsMetadata();
    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      title: title.trim(),
      caption: caption.trim(),
      content: content.trim(),
      gifUrl: gifUrl || undefined,
      date,
      createdAt: new Date().toISOString(),
    };

    newsList.push(newItem);
    await saveNewsMetadata(newsList);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save news item" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const newsList = await getNewsMetadata();
    const itemToDelete = newsList.find((item) => item.id === id);

    if (itemToDelete) {
      if (itemToDelete.gifUrl) {
        try {
          await del(itemToDelete.gifUrl);
        } catch (err) {
          console.error("Failed to delete blob file", err);
        }
      }
      const filtered = newsList.filter((item) => item.id !== id);
      await saveNewsMetadata(filtered);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete news item" }, { status: 500 });
  }
}
