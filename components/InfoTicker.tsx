"use client";

import React, { useEffect, useState } from 'react';

const TICKER_ITEMS = [
  "Excellence in Rural Education",
  "CBSE Curriculum",
  "Holistic Student Development",
  "Dedicated & Experienced Faculty",
  "Indian Human Values",
  "ATL Innovation Lab",
  "Extensive Sports & Yoga Programs",
  "100% Class 10 Results"
];

export function InfoTicker() {
  const [isPaused, setIsPaused] = useState(false);
  const [motionOK, setMotionOK] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionOK(!mq.matches);
    const onChange = (e: MediaQueryListEvent) => setMotionOK(!e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Reduced motion: static, single, screen-reader-friendly list
  if (!motionOK) {
    return (
      <div className="info-ticker">
        <ul className="info-ticker__static">
          {TICKER_ITEMS.map((item) => (
            <li key={item} className="info-ticker__item">{item}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className="info-ticker"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div
        className="info-ticker__track"
        style={isPaused ? { animationPlayState: "paused" } : undefined}
      >
        {/* Render the list twice to create a seamless infinite scroll via CSS */}
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex} className="info-ticker__group" aria-hidden={groupIndex === 1}>
            {TICKER_ITEMS.map((item, index) => (
              <React.Fragment key={index}>
                <span className="info-ticker__item">{item}</span>
                <span className="info-ticker__separator" aria-hidden="true">❈</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
