import Image from "next/image";
import Link from "next/link";
import { list } from "@vercel/blob";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { galleryPageImages } from "@/lib/site-data";
import { getBlobMetadata, prettifyName } from "@/lib/gallery-metadata";

// Revalidate every 60 seconds so new uploads appear quickly
export const revalidate = 60;

async function getBlobImages() {
  try {
    const { blobs } = await list({ prefix: "gallery/" });
    const metadata = await getBlobMetadata();
    
    return blobs
      .filter((b) => b.pathname !== "gallery/metadata.json" && !b.pathname.endsWith(".meta.json"))
      .map((b) => ({
        ...b,
        title: metadata[b.url]?.title || prettifyName(b.pathname),
        caption: metadata[b.url]?.caption || "",
      }));
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const blobImages = await getBlobImages();

  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="gallery-page">
        <section className="gallery-page__hero">
          <div className="container gallery-page__hero-inner">
            <span className="gallery-page__eyebrow">School Gallery</span>
            <h1>School Chandan Photo Gallery</h1>
            <p>
              A premium collection of campus, classroom, activity, cultural, and achievement memories from School Chandan.
            </p>
          </div>
        </section>

        {/* ─── Uploaded (Blob) Images ─── */}
        {blobImages.length > 0 && (
          <section className="section">
            <div className="container">
              <div className="section-heading">
                <span className="section-heading__eyebrow">Latest Photos</span>
                <h2 className="section-heading__title">Recently Added</h2>
              </div>
            </div>
            <div className="container gallery-page__grid">
              {blobImages.map((blob) => (
                <article className="gallery-page__card" key={blob.url}>
                  <div className="gallery-page__image">
                    <Image
                      alt={blob.title || "Gallery photo"}
                      fill
                      sizes="(max-width: 1100px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={`/api/gallery/image?url=${encodeURIComponent(blob.url)}`}
                      style={{ objectPosition: "center center" }}
                    />
                  </div>
                  <div className="gallery-page__body">
                    <h2>{blob.title}</h2>
                    {blob.caption && <p>{blob.caption}</p>}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ─── Static Images ─── */}
        <section className="section">
          {blobImages.length > 0 && (
            <div className="container">
              <div className="section-heading">
                <span className="section-heading__eyebrow">School Life</span>
                <h2 className="section-heading__title">Campus & Events</h2>
              </div>
            </div>
          )}
          <div className="container gallery-page__grid">
            {galleryPageImages.map((image) => (
              <article className="gallery-page__card" key={image.title}>
                <div className="gallery-page__image">
                  <Image
                    alt={image.alt}
                    fill
                    sizes="(max-width: 1100px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={image.image}
                    style={{ objectPosition: image.position ?? "center 20%" }}
                  />
                </div>
                <div className="gallery-page__body">
                  <h2>{image.title}</h2>
                  <p>{image.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
