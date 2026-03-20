import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { HeroSlider } from "@/components/HeroSlider";
import { InfoTicker } from "@/components/InfoTicker";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getSectionPath } from "@/lib/subpage-data";
import { contactDetails, galleryPreview, heroSlides, videoPreviews } from "@/lib/site-data";

const aboutCards = [
  {
    title: "About School Chandan",
    image: "/assets/hero/campus-front.jpg",
    alt: "School Chandan campus building",
    text: "Established in 2003, School Chandan is a CBSE school under Chandan Education Society, Bengaluru–Laxmeshwar. Growing for over 22 years, it brings rural education into the mainstream with excellence, innovation, and human values.",
    href: getSectionPath("about-us", "about-school")
  },
  {
    title: "School Assembly",
    image: "/assets/hero/assembly.jpg",
    alt: "Students in school assembly",
    text: "Prayer, thought for the day, news reading, music, and student participation are part of the daily assembly culture.",
    href: getSectionPath("features", "assembly")
  }
];

const academicBlocks = [
  {
    id: "academics",
    title: "Academics",
    items: ["CBSE Curriculum", "Bridge Courses", "Life Skills", "Spoken English"]
  },
  {
    id: "student-corner",
    title: "Student Corner",
    items: ["100% Class 10 Results", "IAIS Recognition", "Inspire Award", "Science Outreach"]
  },
  {
    id: "features",
    title: "Features",
    items: ["Science Laboratories", "ATL Innovation Lab", "Library", "Computer Laboratory"]
  },
  {
    id: "sports-wellness",
    title: "Sports & Activities",
    items: ["Yoga & Meditation", "Sports & Games", "Music Programs", "Leadership Activities"]
  }
];

const galleryTiles = galleryPreview.slice(0, 4);

function SectionHeading({
  title,
  description
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

function ReadMoreButton({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="button-link button-link--plain" href={href}>
      {children}
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="page-shell" id="top">
      <SiteHeader />

      <main className="main-shell">
        <HeroSlider slides={heroSlides} />
        <InfoTicker />

        <div className="content-frame">
          <section className="content-block" id="campus-video">
            <SectionHeading title="Campus Videos" />

            <div className="simple-grid simple-grid--two">
              {videoPreviews.map((video) => (
                <article className="simple-card" key={video.title}>
                  <div className="simple-card__media simple-card__media--video">
                    <Image
                      alt={video.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      src={video.image}
                    />
                    <div className="play-button" aria-hidden="true">
                      <span />
                    </div>
                  </div>
                  <div className="simple-card__body">
                    <h3>{video.title}</h3>
                    <p>{video.title === "School Campus Tour" ? "A quick view of the campus, classrooms, and student facilities." : "A simple presentation of school culture, celebrations, and student life."}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-block" id="about-school">
            <SectionHeading title="About School" />

            <div className="simple-grid simple-grid--two">
              {aboutCards.map((card) => (
                <article className="simple-card" key={card.title}>
                  <div className="simple-card__media">
                    <Image
                      alt={card.alt}
                      fill
                      sizes="(max-width: 900px) 100vw, 50vw"
                      src={card.image}
                    />
                  </div>
                  <div className="simple-card__body">
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                    <ReadMoreButton href={card.href}>Read more</ReadMoreButton>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-block" id="timings">
            <div className="info-columns">
              <article className="info-column">
                <h3>School Timing</h3>
                <div className="timing-lines">
                  <p>Monday to Friday</p>
                  <p>Primary & High School: 9:00 AM to 3:30 PM</p>
                  <p>Pre-Primary: 9:00 AM to 1:00 PM</p>
                  <p>Saturday: 9:00 AM to 1:00 PM</p>
                </div>
                <ReadMoreButton href={getSectionPath("about-us", "school-timing")}>
                  Read more
                </ReadMoreButton>
              </article>

              <article className="info-column" id="institution">
                <h3>About School Chandan</h3>
                <p>
                  Guided by the legacy of Late Shri H. C. Ratageri and the
                  support of Sri T. Ishwar and Smt. Girija T. Ishwar, the
                  institution blends discipline, learning, and values.
                </p>
                <ReadMoreButton href={getSectionPath("about-us", "vision-mission")}>
                  Read more
                </ReadMoreButton>
              </article>

              <article className="info-column" id="events">
                <h3>Events</h3>
                <ul className="link-list">
                  <li>Investiture Ceremony</li>
                  <li>Annual Day</li>
                  <li>Science Exhibition</li>
                  <li>Cultural Programs</li>
                </ul>
                <ReadMoreButton href="/gallery">Read more</ReadMoreButton>
              </article>
            </div>
          </section>

          <section className="content-block" id="resources">
            <SectionHeading title="Academics & School Information" />

            <div className="info-columns info-columns--four">
              {academicBlocks.map((block) => (
                <article className="info-column" id={block.id} key={block.title}>
                  <h3>{block.title}</h3>
                  <ul className="link-list">
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="content-block content-block--split" id="chairman-message">
            <article className="quote-panel">
              <SectionHeading title="From the Principal's Desk" />
              <blockquote>
                At School Chandan, we believe that education is not only about
                academic success but also about shaping character, values, and
                responsibility.
              </blockquote>
              <p className="quote-panel__author">
                Sri Ramagiri Bavanavar &nbsp;|&nbsp; Principal, School Chandan
              </p>
              <ReadMoreButton href={getSectionPath("about-us", "principals-message")}>
                Read more
              </ReadMoreButton>
            </article>

            <article className="gallery-panel" id="gallery">
              <SectionHeading title="Gallery" />
              <div className="gallery-strip">
                {galleryTiles.map((item) => (
                  <Link className="gallery-thumb" href="/gallery" key={item.title}>
                    <Image
                      alt={item.alt}
                      fill
                      sizes="(max-width: 900px) 50vw, 25vw"
                      src={item.image}
                      style={{ objectPosition: item.position ?? "center center" }}
                    />
                  </Link>
                ))}
              </div>
            </article>
          </section>

          <section className="content-block content-block--contact" id="contact">
            <div className="contact-panel">
              <SectionHeading title="Contact Us" />

              <div className="contact-list">
                <p>
                  <strong>Address:</strong> {contactDetails.address}
                </p>
                <p>
                  <strong>Phone:</strong> {contactDetails.phonePrimary} /{" "}
                  {contactDetails.phoneSecondary} / {contactDetails.phoneTertiary}
                </p>
                <p>
                  <strong>Email:</strong> {contactDetails.email}
                </p>
                <p>
                  <strong>Affiliation:</strong> {contactDetails.affiliation}
                </p>
              </div>
            </div>

            <div className="map-panel">
              <iframe
                allowFullScreen
                className="map-frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=School%20Chandan%20Laxmeshwar%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                title="School Chandan map"
              />
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
