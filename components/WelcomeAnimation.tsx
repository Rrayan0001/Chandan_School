"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface WelcomeAnimationProps {
  onFinished: () => void;
}

export function WelcomeAnimation({ onFinished }: WelcomeAnimationProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit">("enter");

  useEffect(() => {
    // Phase 1: Logo enters (0 – 800ms handled by CSS)
    // Phase 2: Hold for ~2s
    const holdTimer = setTimeout(() => {
      setPhase("exit");
    }, 2800);

    return () => clearTimeout(holdTimer);
  }, []);

  useEffect(() => {
    if (phase !== "exit") return;
    // After curtain exit animation (~900ms), signal parent
    const doneTimer = setTimeout(() => {
      onFinished();
    }, 900);
    return () => clearTimeout(doneTimer);
  }, [phase, onFinished]);

  return (
    <div
      className={`wa-root wa-root--${phase}`}
      aria-hidden="true"
    >
      {/* Curtain panels */}
      <div className="wa-curtain wa-curtain--left">
        <div className="wa-curtain-bg" />
      </div>
      <div className="wa-curtain wa-curtain--right">
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
          <p className="wa-sub">Laxmeshwar · Est. 1994</p>
        </div>

        <div className="wa-divider" />
      </div>
    </div>
  );
}
