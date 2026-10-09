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
  await enqueueSave(() =>
    put(METADATA_PATH, JSON.stringify({ version: 1, events }), {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    }).then(() => undefined)
  );
}

// Serializes saves within this runtime so concurrent mutations cannot
// interleave their Blob writes. (Cross-instance races still resolve as
// last-writer-wins — a store with transactions would be needed for more.)
let saveQueue: Promise<void> = Promise.resolve();

function enqueueSave(task: () => Promise<void>): Promise<void> {
  const run = saveQueue.then(task);
  saveQueue = run.catch(() => undefined);
  return run;
}
