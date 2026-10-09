"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

import type { HeroSlide } from "@/lib/site-data";
import { renderFormattedText } from "@/lib/format";

const ADMISSION_KEY = "admission_open";

function formatDateString(dateStr: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

type HeroSliderProps = {
  slides: HeroSlide[];
  latestNews?: any[];
  latestCirculars?: any[];
  latestEvents?: any[];
};

export function HeroSlider({
  slides,
  latestNews = [],
  latestCirculars = [],
  latestEvents = []
}: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroMinHeight, setHeroMinHeight] = useState<number | null>(null);
  const [showAdmissionTag, setShowAdmissionTag] = useState(true);
  const [showResultTag, setShowResultTag] = useState(false);
  const [resultDate, setResultDate] = useState("");
  const [isPaused, setIsPaused] = useState(false);
  const [motionOK, setMotionOK] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);

  const latestNewsItem = latestNews && latestNews[0];
  const latestCircularItem = latestCirculars && latestCirculars[0];
  const latestEventItem = latestEvents && latestEvents[0];

  // Load state from localStorage and listen for admin changes (client-only)
  useEffect(() => {
    const read = () => {
      const storedAdmit = localStorage.getItem(ADMISSION_KEY);
      setShowAdmissionTag(storedAdmit === null ? true : storedAdmit === "true");

      const storedResult = localStorage.getItem("result_day_enabled");
      setShowResultTag(storedResult === "true");

      const storedDate = localStorage.getItem("result_day_date") || "";
      setResultDate(storedDate);
    };
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  // Respect reduced-motion preference for autoplay
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOK(!mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMotionOK(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Autoplay: paused on hover/focus, hidden tab, or reduced motion
  useEffect(() => {
    if (slides.length === 0 || isPaused || !motionOK || document.hidden) {
      return;
    }
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, [slides.length, isPaused, motionOK]);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const nav = document.querySelector<HTMLElement>(".nav-shell");

    const updateHeroHeight = () => {
      const chromeHeight = (header?.offsetHeight ?? 0) + (nav?.offsetHeight ?? 0);
      const maxHero = window.innerHeight * 0.72;
      setHeroMinHeight(Math.min(Math.max(window.innerHeight - chromeHeight - 80, 320), maxHero));
    };

    updateHeroHeight();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(updateHeroHeight)
        : null;

    if (header && resizeObserver) {
      resizeObserver.observe(header);
    }

    if (nav && resizeObserver) {
      resizeObserver.observe(nav);
    }

    window.addEventListener("resize", updateHeroHeight);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", updateHeroHeight);
    };
  }, []);

  const previousSlide = useCallback(() => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    );
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
  }, [slides.length]);

  // Keyboard arrows on the viewport
  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") previousSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [previousSlide, nextSlide]);

  if (slides.length === 0) {
    return null;
  }

  const heroStyle = {
    "--hero-min-height": heroMinHeight ? `${heroMinHeight}px` : undefined
  } as CSSProperties;

  return (
    <section
      aria-label="School highlights"
      className="hero-slider"
      style={heroStyle}
    >
      {/* Separate premium floating notifications container */}
      {(latestNewsItem || latestCircularItem || latestEventItem) && (
        <div className="hero-notifications-container">
          {latestNewsItem && (
            <Link href="#latest-news" className="hero-notification-card hero-notification-card--news">
              <span className="hero-notification-badge">Latest News</span>
              <span className="hero-notification-title">{renderFormattedText(latestNewsItem.title)}</span>
              <span className="hero-notification-date">({formatDateString(latestNewsItem.date)})</span>
            </Link>
          )}
          {latestCircularItem && (
            <Link href="#circulars" className="hero-notification-card hero-notification-card--circular">
              <span className="hero-notification-badge">Latest Circular</span>
              <span className="hero-notification-title">{renderFormattedText(latestCircularItem.title)}</span>
              <span className="hero-notification-date">({formatDateString(latestCircularItem.date)})</span>
            </Link>
          )}
          {latestEventItem && (
            <Link href="#upcoming-events" className="hero-notification-card hero-notification-card--event">
              <span className="hero-notification-badge">Latest Event</span>
              <span className="hero-notification-title">{renderFormattedText(latestEventItem.title)}</span>
              <span className="hero-notification-date">({formatDateString(latestEventItem.eventDate)})</span>
            </Link>
          )}
        </div>
      )}

      <div
        className="hero-slider__viewport"
        ref={viewportRef}
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="School highlights"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <article
              aria-hidden={!isActive}
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              className={`hero-slide${isActive ? " is-active" : ""}`}
              id={`hero-slide-${index}`}
              inert={!isActive}
              key={`${index}-${slide.title}-${slide.subtitle}`}
              role="group"
              aria-roledescription="slide"
            >
              <Image
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={90}
                sizes="100vw"
                src={slide.image}
                style={{ objectPosition: slide.position ?? "center center" }}
              />
              <div className="hero-slide__wash" aria-hidden="true" />

              <div className="container hero-slide__content">
                <div className="hero-slide__panel">
                  <div className="hero-slide__tags">
                    {showAdmissionTag && isActive && (
                      <Link href="/about-us/admissions" className="hero-slide__tag">
                        <span className="hero-slide__tag-dot" aria-hidden="true" />
                        Admission Open
                      </Link>
                    )}
                    {showResultTag && isActive && (
                      <div className="hero-slide__tag hero-slide__tag--result">
                        <span className="hero-slide__tag-dot hero-slide__tag-dot--result" aria-hidden="true" />
                        Result Day: {resultDate ? formatDateString(resultDate) : ""}
                      </div>
                    )}
                  </div>
                  <h2>{slide.title}</h2>
                  <p className="hero-slide__subtitle">{slide.subtitle}</p>
                </div>
              </div>
            </article>
          );
        })}

        <button
          aria-label="Previous slide"
          className="hero-slider__arrow hero-slider__arrow--left"
          onClick={previousSlide}
          type="button"
        >
          ‹
        </button>

        <button
          aria-label="Next slide"
          className="hero-slider__arrow hero-slider__arrow--right"
          onClick={nextSlide}
          type="button"
        >
          ›
        </button>

        <div className="hero-slider__dots" role="tablist" aria-label="Hero slides">
          {slides.map((slide, index) => (
            <button
              aria-controls={`hero-slide-${index}`}
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              aria-selected={index === activeIndex}
              className={`hero-slider__dot${
                index === activeIndex ? " is-active" : ""
              }`}
              key={`dot-${index}-${slide.title}`}
              onClick={() => setActiveIndex(index)}
              role="tab"
              tabIndex={index === activeIndex ? 0 : -1}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
