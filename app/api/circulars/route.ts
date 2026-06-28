import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getCircularsMetadata, saveCircularsMetadata, CircularItem } from "@/lib/circulars-metadata";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const circulars = await getCircularsMetadata();
    // Sort circulars by date descending
    const sorted = [...circulars].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ circulars: sorted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to list circulars" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = (formData.get("title") as string) || "";
    const fromDate = (formData.get("fromDate") as string) || "";
    const toDate = (formData.get("toDate") as string) || "";
    const date = (formData.get("date") as string) || new Date().toISOString().split("T")[0];
    const file = formData.get("file") as File | null;
    if (
      (date && new Date(date).getTime() > new Date("2026-12-31").getTime()) ||
      (fromDate && new Date(fromDate).getTime() > new Date("2026-12-31").getTime()) ||
      (toDate && new Date(toDate).getTime() > new Date("2026-12-31").getTime())
    ) {
      return NextResponse.json({ error: "Circular dates cannot be after 31st December 2026" }, { status: 400 });
    }
    if (!title || !file) {
      return NextResponse.json({ error: "Title and PDF file are required" }, { status: 400 });
    }

    if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json({ error: "Only PDF files are allowed for circulars." }, { status: 400 });
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be under 15 MB." }, { status: 400 });
    }

    const safeName = `circulars/pdf/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const blob = await put(safeName, file, {
      access: "private",
      contentType: "application/pdf",
      addRandomSuffix: false,
    });

    const circularsList = await getCircularsMetadata();
    const newItem: CircularItem = {
      id: `circular-${Date.now()}`,
      title: title.trim(),
      fromDate,
      toDate,
      pdfUrl: blob.url,
      date,
      createdAt: new Date().toISOString(),
    };

    circularsList.push(newItem);
    await saveCircularsMetadata(circularsList);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save circular" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const circularsList = await getCircularsMetadata();
    const itemToDelete = circularsList.find((item) => item.id === id);

    // Delete associated PDF file if we know its URL
    if (itemToDelete?.pdfUrl) {
      try {
        await del(itemToDelete.pdfUrl);
      } catch (err) {
        console.error("Failed to delete blob file", err);
      }
    }

    // Always filter and save unconditionally to handle stale CDN reads
    const filtered = circularsList.filter((item) => item.id !== id);
    await saveCircularsMetadata(filtered);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete circular" }, { status: 500 });
  }
}
