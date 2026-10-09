"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface WelcomeAnimationProps {
  onFinished: () => void;
}

export function WelcomeAnimation({ onFinished }: WelcomeAnimationProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  const finish = useCallback(() => {
    onFinished();
  }, [onFinished]);

  useEffect(() => {
    // Reduced motion: skip the splash entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }
    // Phase 1: Logo enters (0 – 800ms handled by CSS)
    // Phase 2: Hold for ~1.2s
    const holdTimer = setTimeout(() => {
      setPhase("exit");
    }, 1200);

    return () => clearTimeout(holdTimer);
  }, [finish]);

  useEffect(() => {
    if (phase !== "exit") return;
    // After curtain exit animation (~900ms), signal parent
    const doneTimer = setTimeout(() => {
      finish();
    }, 900);
    return () => clearTimeout(doneTimer);
  }, [phase, finish]);

  return (
    <div
      className={`wa-root wa-root--${phase}`}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to School Chandan"
    >
      {/* Curtain panels */}
      <div className="wa-curtain wa-curtain--left" aria-hidden="true">
        <div className="wa-curtain-bg" />
      </div>
      <div className="wa-curtain wa-curtain--right" aria-hidden="true">
        <div className="wa-curtain-bg" />
      </div>

      {/* Content */}
      <div className="wa-content">
        <div className="wa-logo-ring">
          <Image
            src="/assets/logo.png"
            alt="School Chandan logo"
            fill
            priority
            sizes="160px"
            className="wa-logo-img"
          />
        </div>

        <div className="wa-text">
          <h1 className="wa-school-name">
            <span className="wa-name-red">SCHOOL</span>{" "}
            <span className="wa-name-green">CHANDAN</span>
          </h1>
          <p className="wa-tagline">Excellence Beyond Education</p>
          <p className="wa-sub">Laxmeshwar · Est. 2003</p>
        </div>

        <div className="wa-divider" aria-hidden="true" />

        <button type="button" className="wa-skip" onClick={finish}>
          Skip
        </button>
      </div>
    </div>
  );
}
