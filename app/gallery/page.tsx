import Image from "next/image";
import Link from "next/link";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { galleryPageImages } from "@/lib/site-data";

export default function GalleryPage() {
  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="gallery-page">
        <section className="gallery-page__hero">
          <div className="container gallery-page__hero-inner">
            <span className="section-heading__eyebrow">School Gallery</span>
            <h1>Chandan School Photo Gallery</h1>
            <p>
              A full gallery page presenting the supplied campus, classroom,
              activity, cultural, and achievement visuals from Chandan School.
            </p>
            <Link className="button-link button-link--gold" href="/">
              Back to Home
            </Link>
          </div>
        </section>

        <section className="section">
          <div className="container gallery-page__grid">
            {galleryPageImages.map((image) => (
              <article className="gallery-page__card" key={image.title}>
                <div className="gallery-page__image">
                  <Image
                    alt={image.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={image.image}
                    style={{ objectPosition: image.position ?? "center center" }}
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
