import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
                  <p className="section-page__intro">{page.intro}</p>
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
