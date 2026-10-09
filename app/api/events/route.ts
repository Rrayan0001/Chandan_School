import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getEventsMetadata, saveEventsMetadata, EventItem } from "@/lib/events-metadata";
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

const MAX_BYTES = 2 * 1024 * 1024;
const IMAGE_EXTS = [".gif", ".jpg", ".jpeg", ".png", ".webp"];
const MAX_DATE = new Date("2026-12-31").getTime();

export async function GET() {
  try {
    const events = await getEventsMetadata();
    // Sort events by eventDate descending
    const sorted = sortByDateDesc(events, (item) => item.eventDate).slice(0, MAX_LIST_ITEMS);
    return NextResponse.json({ events: sorted });
  } catch (error) {
    console.error("Failed to list events:", error);
    return NextResponse.json({ error: "Failed to list events." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const forbidden = requireAdmin(request);
  if (forbidden) return forbidden;

  try {
    const formData = await request.formData();
    const title = (formData.get("title") as string) || "";
    const eventDate = (formData.get("eventDate") as string) || new Date().toISOString().split("T")[0];
    const file = formData.get("file") as File | null;

    if (!isValidDateString(eventDate)) {
      return jsonError("Event date is invalid.", 400);
    }
    if (new Date(eventDate).getTime() > MAX_DATE) {
      return jsonError("Event date cannot be after 31st December 2026.", 400);
    }

    const titleCheck = checkText(title, "Caption", 300, true);
    if (!titleCheck.ok) return titleCheck.response;

    if (!file) {
      return jsonError("Caption and Event Image are required.", 400);
    }

    // Raster images only — SVG/HTML uploads are rejected (stored-XSS risk).
    const upload = validateUpload(file, SAFE_IMAGE_TYPES, IMAGE_EXTS, MAX_BYTES, "image");
    if (!upload.ok) return upload.response;

    const safeName = `events/img/${newId("img")}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const blob = await put(safeName, file, {
      access: "private",
      contentType: upload.contentType,
      addRandomSuffix: false,
    });

    const eventsList = await getEventsMetadata();
    const newItem: EventItem = {
      id: newId("event"),
      title: titleCheck.value,
      eventDate,
      imageUrl: blob.url,
      createdAt: new Date().toISOString(),
    };

    eventsList.push(newItem);
    await saveEventsMetadata(eventsList);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error("Failed to save event:", error);
    return NextResponse.json({ error: "Failed to save event." }, { status: 500 });
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

    const eventsList = await getEventsMetadata();
    const itemToDelete = eventsList.find((item) => item.id === id);

    // Delete associated image file if we know its URL
    if (itemToDelete?.imageUrl) {
      try {
        await del(itemToDelete.imageUrl);
      } catch (err) {
        console.error("Failed to delete blob file", err);
      }
    }

    // Always filter and save unconditionally to handle stale CDN reads
    const filtered = eventsList.filter((item) => item.id !== id);
    await saveEventsMetadata(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete event:", error);
    return NextResponse.json({ error: "Failed to delete event." }, { status: 500 });
  }
}
