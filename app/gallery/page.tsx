import Image from "next/image";
import Link from "next/link";
import { list } from "@vercel/blob";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { galleryPageImages } from "@/lib/site-data";

// Revalidate every 60 seconds so new uploads appear quickly
export const revalidate = 60;

async function getBlobImages() {
  try {
    const { blobs } = await list({ prefix: "gallery/" });
    return blobs.filter((b) => !b.pathname.endsWith(".meta.json"));
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
            <span className="section-heading__eyebrow">School Gallery</span>
            <h1>School Chandan Photo Gallery</h1>
            <p>
              A full gallery page presenting the campus, classroom,
              activity, cultural, and achievement visuals from School Chandan.
            </p>
            <Link className="button-link button-link--gold" href="/">
              Back to Home
            </Link>
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
                      alt={blob.pathname.split("/").pop() || "Gallery photo"}
                      fill
                      sizes="(max-width: 1100px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      src={blob.url}
                      style={{ objectPosition: "center center" }}
                    />
                  </div>
                  <div className="gallery-page__body">
                    <h2>
                      {blob.pathname
                        .split("/")
                        .pop()
                        ?.replace(/^\d+-/, "")
                        .replace(/\.[^.]+$/, "")
                        .replace(/[_-]/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase()) || "Gallery Image"}
                    </h2>
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
