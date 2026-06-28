import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getEventsMetadata, saveEventsMetadata, EventItem } from "@/lib/events-metadata";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await getEventsMetadata();
    // Sort events by eventDate descending
    const sorted = [...events].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    return NextResponse.json({ events: sorted });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to list events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = (formData.get("title") as string) || "";
    const eventDate = (formData.get("eventDate") as string) || new Date().toISOString().split("T")[0];
    const file = formData.get("file") as File | null;

    if (eventDate && new Date(eventDate).getTime() > new Date("2026-12-31").getTime()) {
      return NextResponse.json({ error: "Event date cannot be after 31st December 2026" }, { status: 400 });
    }

    if (!title || !file) {
      return NextResponse.json({ error: "Caption and Event Image are required" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
    }

    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must not exceed 2 MB." }, { status: 400 });
    }

    const safeName = `events/img/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const blob = await put(safeName, file, {
      access: "private",
      contentType: file.type,
      addRandomSuffix: false,
    });

    const eventsList = await getEventsMetadata();
    const newItem: EventItem = {
      id: `event-${Date.now()}`,
      title: title.trim(),
      eventDate,
      imageUrl: blob.url,
      createdAt: new Date().toISOString(),
    };

    eventsList.push(newItem);
    await saveEventsMetadata(eventsList);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to save event" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }

    const eventsList = await getEventsMetadata();
    const itemToDelete = eventsList.find((item) => item.id === id);

    if (itemToDelete) {
      if (itemToDelete.imageUrl) {
        try {
          await del(itemToDelete.imageUrl);
        } catch (err) {
          console.error("Failed to delete blob file", err);
        }
      }
      const filtered = eventsList.filter((item) => item.id !== id);
      await saveEventsMetadata(filtered);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete event" }, { status: 500 });
  }
}
