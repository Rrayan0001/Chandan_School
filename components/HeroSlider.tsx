"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import type { HeroSlide } from "@/lib/site-data";

type HeroSliderProps = {
  slides: HeroSlide[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [heroMinHeight, setHeroMinHeight] = useState<number | null>(null);

  if (slides.length === 0) {
    return null;
  }

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(intervalId);
  }, [slides.length]);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".site-header");
    const nav = document.querySelector<HTMLElement>(".nav-shell");

    const updateHeroHeight = () => {
      const chromeHeight = (header?.offsetHeight ?? 0) + (nav?.offsetHeight ?? 0);
      setHeroMinHeight(Math.max(window.innerHeight - chromeHeight, 320));
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

  const previousSlide = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % slides.length);
  };

  const heroStyle = {
    "--hero-min-height": heroMinHeight ? `${heroMinHeight}px` : undefined
  } as CSSProperties;

  return (
    <section
      aria-label="School highlights"
      className="hero-slider"
      style={heroStyle}
    >
      <div className="hero-slider__viewport">
        {slides.map((slide, index) => (
          <article
            aria-hidden={index !== activeIndex}
            className={`hero-slide${index === activeIndex ? " is-active" : ""}`}
            key={`${slide.title}-${slide.subtitle}`}
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
            <div className="hero-slide__wash" />

            <div className="container hero-slide__content">
              <div className="hero-slide__panel">
                <h2>{slide.title}</h2>
                <p className="hero-slide__subtitle">{slide.subtitle}</p>
              </div>
            </div>
          </article>
        ))}

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
              aria-label={`Show slide ${index + 1}: ${slide.title}`}
              className={`hero-slider__dot${
                index === activeIndex ? " is-active" : ""
              }`}
              key={slide.title}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
