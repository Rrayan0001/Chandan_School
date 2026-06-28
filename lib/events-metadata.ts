import { list, put } from "@vercel/blob";

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

    const response = await fetch(metaBlob.url, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

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
