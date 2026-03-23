import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { BookOpen, Shield, TrendingUp } from "lucide-react";

import { HeroSlider } from "@/components/HeroSlider";
import { InfoTicker } from "@/components/InfoTicker";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToTop } from "@/components/BackToTop";
import { PageAnimations } from "@/components/PageAnimations";
import { getSectionPath } from "@/lib/subpage-data";
import { contactDetails, galleryPreview, heroSlides } from "@/lib/site-data";
import { VideoPlayer } from "@/components/ui/video-player";

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
                  <cite>— Dr. Anand Rao, Founder</cite>
                </div>
              </div>

              <div className="about-split__ethos" data-aos="fade-left" data-aos-delay="150">
                <span className="about-split__eyebrow">OUR CORE ETHOS</span>
                <h3>Character, Values, &amp; Responsibility.</h3>
                <p>
                  At School Chandan we believe faithful administration, exceptional vision, and refined character shape not just academic excellence but also moral responsibility, humility, academic strength, and national values.
                </p>
                <p>
                  Established in 2003 under Chandan Education Society, the school has grown for over 22 years, bringing rural education into the mainstream with innovation and human values.
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
              description="Watch our school tours, student activities, and special interactions."
            />

            <div className="simple-grid simple-grid--three">
              <article className="simple-card" data-aos="zoom-in" data-aos-delay="0">
                <div className="simple-card__media simple-card__media--video" style={{ height: 'auto', padding: 0 }}>
                  <VideoPlayer src="/assets/videos/campus-tour.mp4" poster="/assets/gallery/School-chandan-Prospectus-proof.jpg" />
                </div>
                <div className="simple-card__body">
                  <h3>School Campus Tour</h3>
                  <p>A guided walk through the main school block, classrooms, and student facilities.</p>
                </div>
              </article>

              <article className="simple-card" data-aos="zoom-in" data-aos-delay="150">
                <div className="simple-card__media simple-card__media--video" style={{ height: 'auto', padding: 0 }}>
                  <VideoPlayer src="/assets/videos/activities.mp4" poster="/assets/gallery/School-chandan-Prospectus-proof2.jpg" />
                </div>
                <div className="simple-card__body">
                  <h3>School Activities &amp; Events</h3>
                  <p>Showcasing assemblies, cultural events, celebrations, and vibrant student life.</p>
                </div>
              </article>

              <article className="simple-card" data-aos="zoom-in" data-aos-delay="0">
                <div className="simple-card__media simple-card__media--video" style={{ height: 'auto', padding: 0 }}>
                  <VideoPlayer src="/assets/videos/activities2.mp4" poster="/assets/gallery/School-chandan-Prospectus-proof3.jpg" />
                </div>
                <div className="simple-card__body">
                  <h3>Student Performances</h3>
                  <p>A glimpse into the diverse talents and performances of our students.</p>
                </div>
              </article>

              <article className="simple-card" data-aos="zoom-in" data-aos-delay="150">
                <div className="simple-card__media simple-card__media--video" style={{ height: 'auto', padding: 0 }}>
                  <VideoPlayer src="/assets/videos/ALL%20SCIENTIST_Review.mp4" poster="/assets/sections/science-lab.jpg" />
                </div>
                <div className="simple-card__body">
                  <h3>Scientist Review</h3>
                  <p>Highlights from the science exhibition and expert reviews.</p>
                </div>
              </article>

              <article className="simple-card" data-aos="zoom-in" data-aos-delay="0">
                <div className="simple-card__media simple-card__media--video" style={{ height: 'auto', padding: 0 }}>
                  <VideoPlayer src="/assets/videos/INTRACTION%20WITH%20DR%20A%20S%20KIRAN%20KUMAR%20SIR_480p.mp4" poster="/assets/sections/chairman.jpg" />
                </div>
                <div className="simple-card__body">
                  <h3>Interaction with Dr. A.S. Kiran Kumar</h3>
                  <p>An inspiring interaction with the former ISRO Chairman.</p>
                </div>
              </article>
            </div>
          </section>

          {/* ── 5. A Memorable Visit (CM) ── */}
          <section className="content-block" id="cm-highlight" data-aos="fade-up">
            <SectionHeading
              title="A Memorable Visit"
              description="Highlights from the honourable Chief Minister Siddaramaiah's visit to School Chandan."
            />

            <div className="cm-grid">
              <div className="cm-grid__video" data-aos="fade-right" data-aos-delay="100">
                <VideoPlayer src="/assets/videos/CM%20Siddaharamiah.mp4" poster="/assets/cm/CM_1.jpg" />
              </div>
              <div className="cm-grid__images" data-aos="fade-left" data-aos-delay="200">
                <div className="cm-img-wrap">
                  <Image src="/assets/cm/CM_1.jpg" alt="CM Visit Moment 1" fill sizes="(max-width: 1100px) 100vw, 50vw" />
                </div>
                <div className="cm-img-wrap">
                  <Image src="/assets/cm/CM_2.jpg" alt="CM Visit Moment 2" fill sizes="(max-width: 1100px) 50vw, 25vw" />
                </div>
                <div className="cm-img-wrap">
                  <Image src="/assets/cm/CM_3.jpg" alt="CM Visit Moment 3" fill sizes="(max-width: 1100px) 50vw, 25vw" />
                </div>
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
                  <cite className="testimonial-card__author">Anand Rao — Parent</cite>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-card__text">
                    &ldquo;The school&rsquo;s focus on values and discipline sets it apart. We are proud to be part of the School Chandan family.&rdquo;
                  </p>
                  <cite className="testimonial-card__author">Sinna — Parent &amp; Alumni</cite>
                </div>
                <div className="testimonial-card">
                  <p className="testimonial-card__text">
                    &ldquo;An exceptional institution that has nurtured our children with a perfect blend of academics and character building.&rdquo;
                  </p>
                  <cite className="testimonial-card__author">Shri Ratnaval — Parent</cite>
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
      <BackToTop />
    </div>
  );
}
