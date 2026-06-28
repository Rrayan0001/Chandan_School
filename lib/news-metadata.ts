import { list, put, get } from "@vercel/blob";

const METADATA_PATH = "news/metadata.json";

export interface NewsItem {
  id: string;
  title: string;
  caption: string;
  content: string; // The body of the news
  gifUrl?: string; // The URL of the associated GIF or image
  date: string; // News date input
  createdAt: string;
}

export async function getNewsMetadata(): Promise<NewsItem[]> {
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
    return data.news || [];
  } catch {
    return [];
  }
}

export async function saveNewsMetadata(news: NewsItem[]): Promise<void> {
  await put(METADATA_PATH, JSON.stringify({ version: 1, news }), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
