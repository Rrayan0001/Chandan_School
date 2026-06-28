import { list, put } from "@vercel/blob";

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
