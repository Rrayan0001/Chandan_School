import { list, put, get } from "@vercel/blob";

const METADATA_PATH = "circulars/metadata.json";

export interface CircularItem {
  id: string;
  title: string;
  fromDate: string;
  toDate: string;
  pdfUrl: string; // The URL of the uploaded PDF circular
  date: string;
  createdAt: string;
}

export async function getCircularsMetadata(): Promise<CircularItem[]> {
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
    return data.circulars || [];
  } catch {
    return [];
  }
}

export async function saveCircularsMetadata(circulars: CircularItem[]): Promise<void> {
  await put(METADATA_PATH, JSON.stringify({ version: 1, circulars }), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
