import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

import { getEventsMetadata } from "@/lib/events-metadata";
import { getNewsMetadata } from "@/lib/news-metadata";
import { getCircularsMetadata } from "@/lib/circulars-metadata";
import { renderFormattedText } from "@/lib/format";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  getSectionGroup,
  getSectionPage,
  getSectionPages,
  getSectionPath,
  sectionPages
} from "@/lib/subpage-data";

type PageProps = {
  params: Promise<{
    section: string;
    slug: string;
  }>;
};

export function generateStaticParams() {
  return sectionPages.map((page) => ({
    section: page.section,
    slug: page.slug
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const page = getSectionPage(section, slug);

  if (!page) {
    return {
      title: "Page Not Found | School Chandan"
    };
  }

  return {
    title: `${page.title} | School Chandan`,
    description: page.intro
  };
}

export default async function SectionDetailPage({ params }: PageProps) {
  const { section, slug } = await params;
  const page = getSectionPage(section, slug);
  const group = getSectionGroup(section);

  if (!page || !group) {
    notFound();
  }

  let events: any[] = [];
  if (slug === "events") {
    try {
      const rawEvents = await getEventsMetadata();
      events = [...rawEvents].sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
    } catch (err) {
      console.error("Failed to load events for subpage", err);
    }
  }

  let circulars: any[] = [];
  if (slug.includes("circular")) {
    try {
      const rawCirculars = await getCircularsMetadata();
      circulars = [...rawCirculars].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (err) {
      console.error("Failed to load circulars for subpage", err);
    }
  }

  let news: any[] = [];
  if (slug.includes("news")) {
    try {
      const rawNews = await getNewsMetadata();
      news = [...rawNews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (err) {
      console.error("Failed to load news for subpage", err);
    }
  }

  const sectionLinks = getSectionPages(section);

  return (
    <div className="page-shell">
      <SiteHeader />

      <main className="section-page">
        <section className="section-page__shell">
          <div className="container">
            <div className="section-page__layout">
              <article className="section-page__article">
                <header className="section-page__header">
                  <div className="section-page__breadcrumbs" aria-label="Breadcrumb">
                    <Link href="/">Home</Link>
                    <span>/</span>
                    <Link href={getSectionPath(sectionLinks[0].section, sectionLinks[0].slug)}>
                      {group.label}
                    </Link>
                    <span>/</span>
                    <span aria-current="page">{page.label}</span>
                  </div>

                  <span className="section-page__eyebrow">{group.label}</span>
                  <h1>{page.title}</h1>
                  <p className="section-page__intro" dangerouslySetInnerHTML={{ __html: page.intro }} />
                </header>

                <div 
                  className={`section-page__image${page.galleryImages?.length ? " section-page__image--compact" : ""}`}
                  style={page.imageAspectRatio ? { aspectRatio: page.imageAspectRatio } : undefined}
                >
                  <Image
                    alt={page.imageAlt}
                    fill
                    priority
                    sizes="(max-width: 1100px) 100vw, 70vw"
                    src={page.image}
                    style={{
                      objectFit: page.imageFit ?? "cover",
                      objectPosition: page.imagePosition ?? "center 20%"
                    }}
                  />
                </div>

                {page.galleryImages?.length ? (
                  <div className="section-page__media-gallery">
                    {page.galleryImages.map((item) => (
                      <div className="section-page__media-gallery-item" key={item.alt}>
                        <Image
                          alt={item.alt}
                          fill
                          sizes="(max-width: 1100px) 100vw, 22vw"
                          src={item.image}
                          style={{
                            objectFit: "cover",
                            objectPosition: item.position ?? "center center"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="section-page__body">
                  {page.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {page.subSections?.map((sub) => (
                    <div key={sub.title} className="section-page__subsection" style={{ marginTop: "3rem" }}>
                      <h2>{sub.title}</h2>
                      {sub.body ? <p>{sub.body}</p> : null}
                      
                      {sub.images?.length ? (
                        <div className="section-page__media-gallery" style={{ marginTop: "1.5rem" }}>
                          {sub.images.map((item) => (
                            <div className="section-page__media-gallery-item" key={item.alt}>
                              <Image
                                alt={item.alt}
                                fill
                                sizes="(max-width: 1100px) 100vw, 22vw"
                                src={item.image}
                                style={{
                                  objectFit: "cover",
                                  objectPosition: item.position ?? "center center"
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}

                  {page.callout ? (
                    <div className="section-page__callout">
                      <span>{page.callout.title}</span>
                      <p>{page.callout.body}</p>
                    </div>
                  ) : null}

                  <div className="section-page__highlights-wrap">
                    <h2>Key Highlights</h2>
                    <div className="section-page__highlights">
                      {page.highlights.map((highlight) => (
                        <div
                          className={`section-page__highlight${
                            highlight.toLowerCase().includes("i warmly invite parents and students") ||
                            highlight.toLowerCase().includes("not only syllabus")
                              ? " section-page__highlight--emphasis"
                              : ""
                          }`}
                          key={highlight}
                        >
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>

                  {page.tableData ? (
                    <div className="section-page__table-wrap" style={{ marginTop: "3rem", overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", minWidth: "320px" }}>
                        <thead>
                          <tr>
                            {page.tableData.columns.map((col) => (
                              <th 
                                key={col} 
                                style={{ 
                                  padding: "1rem", 
                                  borderBottom: `2px solid ${group.theme.accent}`,
                                  color: group.theme.accent,
                                  fontWeight: 600,
                                  fontSize: "1.1rem"
                                }}
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {page.tableData.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} style={{ borderBottom: "1px solid #eaeaea" }}>
                              {row.map((cell, cellIndex) => (
                                <td 
                                  key={cellIndex} 
                                  style={{ 
                                    padding: "1rem",
                                    color: "#444",
                                    fontWeight: cellIndex === 0 ? 600 : 400
                                  }}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {slug === "events" && events.length > 0 && (
                    <div style={{ marginTop: "3rem" }}>
                      <h2 style={{ fontSize: "1.75rem", color: "#6a1b29", borderBottom: "2px solid #6a1b29", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>Event Highlights</h2>
                      <div className="events-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
                        {events.map((item) => (
                          <article className="event-card" key={item.id} style={{ display: "flex", flexDirection: "column", background: "#fff", borderRadius: "15px", overflow: "hidden", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                            <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
                              <Image
                                src={`/api/events/image?url=${encodeURIComponent(item.imageUrl)}`}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                                style={{ objectFit: "cover" }}
                                unoptimized
                              />
                              <span style={{ position: "absolute", top: "10px", left: "10px", background: "rgba(106, 27, 41, 0.9)", color: "#fff", padding: "0.25rem 0.6rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: 700 }}>
                                {item.eventDate}
                              </span>
                            </div>
                            <div style={{ padding: "1rem" }}>
                              <h3 style={{ margin: 0, fontSize: "1.05rem", color: "#222" }}>{renderFormattedText(item.title)}</h3>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}

                  {slug.includes("circular") && circulars.length > 0 && (
                    <div style={{ marginTop: "3rem" }}>
                      <h2 style={{ fontSize: "1.75rem", color: "#6a1b29", borderBottom: "2px solid #6a1b29", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>Official Circulars & Notices</h2>
                      <div className="circulars-board__list" style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                        {circulars.map((item) => (
                          <div className="circular-row" key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", background: "#fcfaf6", border: "1px solid #e0dcd0", borderRadius: "12px" }}>
                            <div className="circular-row__info" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                              <span className="circular-row__icon" style={{ fontSize: "1.5rem" }}>📄</span>
                              <div>
                                <h3 className="circular-row__title" style={{ margin: 0, fontSize: "1rem", color: "#6a1b29" }}>{renderFormattedText(item.title)}</h3>
                                <span className="circular-row__date" style={{ fontSize: "0.75rem", color: "#888" }}>Published Date: {item.date}</span>
                              </div>
                            </div>
                            <div className="circular-row__actions" style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                              {(item.fromDate || item.toDate) && (
                                <span className="circular-row__duration" style={{ fontSize: "0.75rem", color: "#666" }}>
                                  Active: {item.fromDate || "N/A"} to {item.toDate || "N/A"}
                                </span>
                              )}
                              <a
                                href={`/api/circulars/download?url=${encodeURIComponent(item.pdfUrl)}&filename=${encodeURIComponent(item.title)}`}
                                className="circular-row__download"
                                style={{ background: "#6a1b29", color: "#fff", padding: "0.4rem 0.8rem", borderRadius: "8px", fontSize: "0.8rem", textDecoration: "none", fontWeight: 600 }}
                              >
                                📥 Download PDF
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {slug.includes("news") && news.length > 0 && (
                    <div style={{ marginTop: "3rem" }}>
                      <h2 style={{ fontSize: "1.75rem", color: "#6a1b29", borderBottom: "2px solid #6a1b29", paddingBottom: "0.5rem", marginBottom: "1.5rem" }}>Latest News & Announcements</h2>
                      <div className="news-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem", marginTop: "1.5rem" }}>
                        {news.map((item) => (
                          <article className="news-card" key={item.id} style={{ display: "flex", flexDirection: "column", background: "#fff", borderRadius: "15px", overflow: "hidden", border: "1px solid #eaeaea", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                            {item.gifUrl && (
                              <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
                                <Image
                                  src={`/api/news/gif?url=${encodeURIComponent(item.gifUrl)}`}
                                  alt={item.title}
                                  fill
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                  style={{ objectFit: "cover" }}
                                  unoptimized
                                />
                              </div>
                            )}
                            <div className="news-card__body" style={{ padding: "1.2rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
                              <span className="news-card__date" style={{ fontSize: "0.75rem", color: "#888", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem", display: "block" }}>{item.date}</span>
                              <h3 className="news-card__title" style={{ margin: "0 0 0.5rem 0", fontSize: "1.1rem", color: "#6a1b29" }}>{renderFormattedText(item.title)}</h3>
                              {item.caption && <p className="news-card__caption" style={{ margin: "0 0 0.8rem 0", fontSize: "0.85rem", color: "#555", fontWeight: 600 }}>{renderFormattedText(item.caption)}</p>}
                              <p className="news-card__content" style={{ margin: 0, fontSize: "0.9rem", color: "#666", lineHeight: 1.5 }}>{renderFormattedText(item.content)}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>

              <aside className="section-page__sidebar">
                <div className="section-page__sidebar-card">
                  <h2>{group.label}</h2>
                  <p>{group.description}</p>

                  <nav className="section-page__nav" aria-label={`${group.label} pages`}>
                    {sectionLinks.map((link) => {
                      const href = getSectionPath(link.section, link.slug);
                      const isActive = link.slug === page.slug;

                      return (
                        <Link
                          className={`section-page__nav-link${isActive ? " is-active" : ""}`}
                          href={href}
                          key={link.slug}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                <div className="section-page__admission">
                  <strong>Admission Open</strong>
                  <p>Academic Year 2026-27</p>
                  <span>From Nursery to Grade 10</span>
                  <Link className="button-link button-link--gold" href="/#contact">
                    Enquire now
                  </Link>
                </div>

                <div className="section-page__sidebar-card section-page__sidebar-card--links">
                  <h2>Quick Links</h2>
                  <div className="section-page__sidebar-actions">
                    <Link className="button-link button-link--plain" href="/">
                      Back to Home
                    </Link>
                    <Link className="button-link button-link--plain" href="/gallery">
                      View Gallery
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
