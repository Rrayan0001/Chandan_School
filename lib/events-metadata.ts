import { list, put, get } from "@vercel/blob";

const METADATA_PATH = "events/metadata.json";

export interface EventItem {
  id: string;
  title: string; // Event caption
  eventDate: string;
  imageUrl: string; // The URL of the uploaded event image
  createdAt: string;
}

export async function getEventsMetadata(): Promise<EventItem[]> {
  try {
    const { blobs } = await list({ prefix: METADATA_PATH });
    const metaBlob = blobs.find((b) => b.pathname === METADATA_PATH);
    if (!metaBlob) {
      return [];
    }

    const result = await get(metaBlob.url, { access: "private" });
    if (!result) {
      return [];
    }
    const response = new Response(result.stream);
    const data = await response.json();
    return data.events || [];
  } catch {
    return [];
  }
}

export async function saveEventsMetadata(events: EventItem[]): Promise<void> {
  await put(METADATA_PATH, JSON.stringify({ version: 1, events }), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
