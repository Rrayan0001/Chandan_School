import { list, put } from "@vercel/blob";

const METADATA_PATH = "gallery/metadata.json";

export interface ImageMeta {
  title: string;
  caption: string;
}

export type GalleryMetadata = Record<string, ImageMeta>;

export function prettifyName(pathname: string): string {
  const name = pathname.split("/").pop() || pathname;
  return name
    .replace(/^\d+-/, "")
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Reads the gallery/metadata.json file from the private store.
 */
export async function getBlobMetadata(): Promise<GalleryMetadata> {
  try {
    const { blobs } = await list({ prefix: METADATA_PATH });
    const metaBlob = blobs.find((b) => b.pathname === METADATA_PATH);
    if (!metaBlob) {
      return {};
    }

    const response = await fetch(metaBlob.url, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });

    if (!response.ok) {
      return {};
    }

    const data = await response.json();
    return data.images || {};
  } catch {
    return {};
  }
}

/**
 * Saves the gallery/metadata.json file to the private store.
 */
export async function saveBlobMetadata(imagesMeta: GalleryMetadata): Promise<void> {
  await put(METADATA_PATH, JSON.stringify({ version: 1, images: imagesMeta }), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}
