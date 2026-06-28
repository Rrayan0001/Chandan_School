import Image from "next/image";
import Link from "next/link";
import { list } from "@vercel/blob";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { galleryPageImages } from "@/lib/site-data";
import { getBlobMetadata, prettifyName } from "@/lib/gallery-metadata";

// Force dynamic rendering so uploads and deletions reflect immediately
export const dynamic = "force-dynamic";

interface GalleryImageItem {
  url: string;
  title: string;
  caption: string;
  category: string;
  isStatic?: boolean;
}

const CATEGORIES = [
  "Sports",
  "Events",
  "Co-curricular Activities",
  "Achievements",
  "Paper Cuttings"
];

// Helper to map static image titles to standard categories
function getStaticCategory(title: string): string {
  const t = title.toLowerCase();
  if (t.includes("sports") || t.includes("labs") || t.includes("assembly")) return "Sports";
  if (t.includes("achievements") || t.includes("leadership") || t.includes("difference")) return "Achievements";
  if (t.includes("celebrations") || t.includes("gallery") || t.includes("visits") || t.includes("exposure")) return "Events";
  return "Co-curricular Activities";
}

async function getBlobImages(): Promise<GalleryImageItem[]> {
  try {
    const { blobs } = await list({ prefix: "gallery/" });
    const metadata = await getBlobMetadata();
    
    return blobs
      .filter((b) => b.pathname !== "gallery/metadata.json" && !b.pathname.endsWith(".meta.json"))
      .map((b) => ({
        url: `/api/gallery/image?url=${encodeURIComponent(b.url)}`,
        title: metadata[b.url]?.title || prettifyName(b.pathname),
        caption: metadata[b.url]?.caption || "",
        category: metadata[b.url]?.category || "Events",
        isStatic: false,
      }));
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const blobImages = await getBlobImages();

  const staticImages: GalleryImageItem[] = galleryPageImages.map((img) => ({
    url: img.image,
    title: img.title,
    caption: img.caption || "",
    category: getStaticCategory(img.title),
    isStatic: true,
  }));

  const allImages = [...blobImages, ...staticImages];

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

        {/* Categories as Sections */}
        <div style={{ padding: "3rem 0" }}>
          {CATEGORIES.map((category) => {
            const images = allImages.filter(
              (img) => img.category.toLowerCase() === category.toLowerCase()
            );

            if (images.length === 0) return null;

            return (
              <section key={category} style={{ marginBottom: "4rem" }}>
                <div className="container">
                  <div className="section-heading" style={{ marginBottom: "2rem", borderBottom: "2px solid #6a1b29", paddingBottom: "0.5rem" }}>
                    <span className="section-heading__eyebrow" style={{ color: "#6a1b29", fontSize: "0.85rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>
                      Gallery
                    </span>
                    <h2 className="section-heading__title" style={{ fontSize: "2rem", color: "#222", margin: "0.2rem 0 0 0" }}>
                      {category}
                    </h2>
                  </div>

                  <div className="gallery-page__grid">
                    {images.map((img, index) => (
                      <article className="gallery-page__card" key={`${img.url}-${index}`}>
                        <div className="gallery-page__image">
                          <Image
                            alt={img.title}
                            fill
                            sizes="(max-width: 1100px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            src={img.url}
                            style={{ objectPosition: "center center", objectFit: "cover" }}
                            unoptimized={!img.isStatic}
                          />
                        </div>
                        <div className="gallery-page__body">
                          <h2>{img.title}</h2>
                          {img.caption && <p>{img.caption}</p>}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
