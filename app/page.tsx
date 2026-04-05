import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, Shield, TrendingUp } from "lucide-react";

import { HeroSlider } from "@/components/HeroSlider";
import { InfoTicker } from "@/components/InfoTicker";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PageAnimations } from "@/components/PageAnimations";
import { getSectionPath } from "@/lib/subpage-data";
import { contactDetails, heroSlides } from "@/lib/site-data";
import { YoutubeCarousel } from "@/components/YoutubeCarousel";

/* ── Data ── */

const bentoCards = [
  {
    type: "image" as const,
    image: "/assets/hero/classroom.jpg",
    alt: "Students in classroom",
    span: "bento__tile--tall",
  },
  {
    type: "text" as const,
    title: "Curriculum & Academics",
    items: ["CBSE Curriculum", "Bridge Courses", "Life Skills", "Spoken English"],
    span: "",
  },
  {
    type: "text" as const,
    title: "State-of-the-art Science Labs",
    items: ["Science Laboratories", "ATL Innovation Lab", "Computer Laboratory", "Library"],
    span: "",
  },
  {
    type: "image" as const,
    image: "/assets/sections/science-lab.jpg",
    alt: "Science lab at School Chandan",
    span: "",
  },
  {
    type: "text" as const,
    title: "Dance & Performance",
    items: ["Cultural Programs", "Music Performances", "Annual Day Events", "Investiture Ceremony"],
    span: "",
  },
  {
    type: "text" as const,
    title: "Holistic Development",
    items: ["Yoga & Meditation", "Sports & Games", "Leadership Activities", "Community Values"],
    span: "",
  },
];

const coreValues = [
  {
    icon: BookOpen,
    title: "Knowledge",
    text: "Committed to academic excellence and a real love of learning.",
  },
  {
    icon: Shield,
    title: "Integrity",
    text: "Building character rooted in honesty, discipline, and respect.",
  },
  {
    icon: TrendingUp,
    title: "Growth",
    text: "Guiding every child toward creative growth and a bright future.",
  },
];

const campusPhotos = [
  { image: "/assets/hero/campus-front.jpg", label: "School Campus", span: "campus__tile--wide" },
  { image: "/assets/gallery/School-chandan-Prospectus-proof.jpg", label: "Student Reading", span: "" },
  { image: "/assets/hero/culture.jpg", label: "Cultural Dance", span: "" },
  { image: "/assets/gallery/School-chandan-Prospectus-proof3.jpg", label: "Art Class", span: "" },
  { image: "/assets/hero/assembly.jpg", label: "School Assembly", span: "" },
  { image: "/assets/gallery/School-chandan-Prospectus-proof7.jpg", label: "Student Calling", span: "" },
];

/* ── Helpers ── */

function SectionHeading({
  title,
  description,
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
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="button-link button-link--plain" href={href}>
      {children} →
    </Link>
  );
}

/* ── Page ── */

export default function HomePage() {
  return (
    <div className="page-shell" id="top">
      <SiteHeader />
      <PageAnimations />

      <main className="main-shell">
        <HeroSlider slides={heroSlides} />
        <InfoTicker />

        <div className="content-frame">

          {/* ── 1. About Our School — Split Layout ── */}
          <section className="content-block" id="about-school" data-aos="fade-up">
            <SectionHeading title="About Our School" />

            <div className="about-split">
              <div className="about-split__image" data-aos="fade-right">
                <Image
                  alt="School Chandan campus"
                  fill
                  sizes="(max-width: 1100px) 100vw, 55vw"
                  src="/assets/hero/campus-front.jpg"
                  style={{ objectPosition: "center 55%" }}
                />
                <div className="about-split__quote">
                  <span className="about-split__quote-mark">"</span>
                  <p>Nurture the unbounded talent of rural India to inspire extraordinary accomplishments by embracing values, instilling excellence, and fuelling limitless aspirations.</p>
                  <cite>— Sri T. Ishwar, Founder</cite>
                </div>
              </div>

              <div className="about-split__ethos" data-aos="fade-left" data-aos-delay="150">
                <span className="about-split__eyebrow">OUR CORE ETHOS</span>
                <h3>Character, Values, &amp; Responsibility.</h3>
                <p>
                  At School Chandan we believe faithful administration, exceptional vision, and refined character shape not just academic excellence but also moral responsibility, humility, academic strength, and national values.
                </p>
                <p>
                  Established in 2003, An Institution of Chandan Education Society, the school has grown for over 22 years, bringing rural education into the mainstream with innovation and human values.
                </p>
                <div className="about-split__stats">
                  <div className="about-stat">
                    <strong>22+</strong>
                    <span>Years of Excellence</span>
                  </div>
                  <div className="about-stat">
                    <strong>100%</strong>
                    <span>Board Results</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. Journey of Learning — Bento Grid ── */}
          <section className="content-block" id="journey" data-aos="fade-up">
            <SectionHeading title="Journey of Learning" />

            <div className="bento-grid">
              {bentoCards.map((card, i) =>
                card.type === "image" ? (
                  <div
                    className={`bento__tile bento__tile--image ${card.span}`}
                    key={i}
                    data-aos="zoom-in"
                    data-aos-delay={i * 80}
                  >
                    <Image
                      alt={card.alt!}
                      fill
                      priority={i === 0}
                      sizes="(max-width: 1100px) 100vw, 33vw"
                      src={card.image!}
                      style={{ objectPosition: "center 25%" }}
                    />
                  </div>
                ) : (
                  <div
                    className={`bento__tile bento__tile--text ${card.span}`}
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 80}
                  >
                    <h3>{card.title}</h3>
                    <ul>
                      {card.items!.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>
          </section>

          {/* ── 3. Core Values Strip ── */}
          <section className="content-block values-section" id="values" data-aos="fade-up">
            <div className="values-strip">
              {coreValues.map((v) => (
                <article className="values-card" key={v.title} data-aos="zoom-in" data-aos-delay="100">
                  <div className="values-card__icon">
                    <v.icon size={32} />
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ── 4. Campus Videos & Highlights ── */}
          <section className="content-block" id="campus-video" data-aos="fade-up">
            <SectionHeading
              title="Campus Videos & Highlights"
              description="Watch our student activities and special interactions with Bharata Ratna Prof. C.N.R. Rao, ISRO Chairman A.S. Kiran Kumar and other dignitaries."
            />

            <YoutubeCarousel items={[
                  {
                    id: "DVmeB-Hi-34",
                    title: "School Activities & Events",
                    description: "Showcasing assemblies, cultural events, celebrations, and vibrant student life.",
                  },
                  {
                    id: "e6VkcwPset4",
                    title: "C.N. Rao Visit",
                    description: "An inspiring visit and interaction with the legendary scientist C.N. Rao.",
                  },
                  {
                    id: "AgKcCv7JnV4",
                    title: "School Exhibition",
                    description: "Highlights from the science exhibition and expert reviews.",
                  },
                  {
                    id: "V2OehYIJI4E",
                    title: "T. Ishwar Interaction",
                    description: "An inspiring interaction and address by T. Ishwar.",
                  },
                ]} />
          </section>

          {/* ── 5. A Memorable Visit (CM) ── */}
          <section className="content-block" id="cm-highlight" data-aos="fade-up">
            <SectionHeading
              title="A Memorable Visit"
              description="Highlights from the honourable Chief Minister Siddaramaiah's visit to School Chandan. 10th annual science outreach programme inauguration and Chandan-shree 2025 award ceremony."
            />

            <div className="cm-photo-grid">
              <div className="cm-photo-grid__wide" data-aos="fade-up">
                <Image src="/assets/cm/CM_1.jpg" alt="CM Siddaramaiah visiting School Chandan" fill sizes="100vw" style={{ objectFit: "contain", objectPosition: "center center", background: "#ffffff" }} />
              </div>
              <div className="cm-photo-grid__half" data-aos="fade-up" data-aos-delay="100">
                <Image src="/assets/cm/CM_2.JPG" alt="CM Visit Moment 2" fill sizes="(max-width: 640px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="cm-photo-grid__half" data-aos="fade-up" data-aos-delay="200">
                <Image src="/assets/cm/CM_3.JPG" alt="CM Visit Moment 3" fill sizes="(max-width: 640px) 50vw, 33vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </section>

          {/* ── 5.5. Prof CNR Rao Visit ── */}
          <section className="content-block" id="cnrao-visit" data-aos="fade-up">
            <SectionHeading
              title="A Memorable Visit by Prof. C.N.R. Rao"
              description="An inspiring day when the eminent scientist Prof. C.N.R. Rao visited School Chandan, interacting with our enthusiastic students and leaving a lasting impact."
            />

            <div className="cnrao-gallery" data-aos="fade-up">
              <div className="cnrao-gallery__item" data-aos="fade-right">
                <Image src="/assets/cnrao/home_page1_new.jpg" alt="Prof C.N.R. Rao interacting with the school" fill sizes="(max-width: 1100px) 50vw, 40vw" style={{ objectFit: "cover" }} />
              </div>
              <div className="cnrao-gallery__item" data-aos="fade-left" data-aos-delay="100">
                <Image src="/assets/cnrao/home_page2_new.jpg" alt="Prof C.N.R. Rao and school events" fill sizes="(max-width: 1100px) 50vw, 40vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </section>

          {/* ── 6. Vibrant Campus Gallery ── */}
          <section className="content-block" id="gallery" data-aos="fade-up">
            <SectionHeading title="Vibrant Campus" />

            <div className="campus-gallery">
              {campusPhotos.map((photo, i) => (
                <Link
                  className={`campus__tile ${photo.span}`}
                  href="/gallery"
                  key={i}
                  data-aos="zoom-in"
                  data-aos-delay={i * 60}
                >
                  <Image
                    alt={photo.label}
                    fill
                    sizes="(max-width: 1100px) 50vw, 33vw"
                    src={photo.image}
                    style={{ objectPosition: "center 30%" }}
                  />
                  <span className="campus__label">{photo.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* ── 7. Principal's Message ── */}
          <section className="content-block content-block--split" id="chairman-message" data-aos="fade-up">
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

            <article className="testimonials-panel" data-aos="fade-left">
              <SectionHeading title="Parent Testimonials" />
              <div className="testimonials-grid">
                <div className="testimonial-card">
                  <p className="testimonial-card__text">
                    &ldquo;My child&rsquo;s confidence has grown tremendously since joining School Chandan. The teachers genuinely care about each student&rsquo;s progress.&rdquo;
                  </p>
                  <cite className="testimonial-card__author">Mahantesh Ratageri (Parent)</cite>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-card__text">
                    &ldquo;The school&rsquo;s focus on values and discipline sets it apart. We are proud to be part of the School Chandan family.&rdquo;
                  </p>
                  <cite className="testimonial-card__author">Manoj B (Alumni)</cite>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-card__text">
                    &ldquo;An exceptional institution that has nurtured our children with a perfect blend of academics and character building.&rdquo;
                  </p>
                  <cite className="testimonial-card__author">Veeresh Alagawadi (Parent)</cite>
                </div>
              </div>
            </article>
          </section>

          {/* ── 8. Contact ── */}
          <section className="content-block content-block--contact" id="contact" data-aos="fade-up">
            <div className="contact-panel">
              <SectionHeading title="Contact Us" />
              <div className="contact-list">
                <p><strong>Address:</strong> {contactDetails.address}</p>
                <p><strong>Phone:</strong> {contactDetails.phonePrimary} / {contactDetails.phoneSecondary} / {contactDetails.phoneTertiary}</p>
                <p><strong>Email:</strong> {contactDetails.email}</p>
                <p><strong>Affiliation:</strong> {contactDetails.affiliation}</p>
              </div>
            </div>

            <div className="map-panel" data-aos="fade-left" data-aos-delay="200">
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
