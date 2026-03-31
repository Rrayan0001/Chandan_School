"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface WelcomePopupProps {
  /** When true the popup becomes visible. Starts hidden so animation can play first. */
  isVisible?: boolean;
}

export function WelcomePopup({ isVisible = false }: WelcomePopupProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Open as soon as parent says we're visible
  useEffect(() => {
    if (isVisible) {
      setIsOpen(true);
    }
  }, [isVisible]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="welcome-popup welcome-popup--locked" role="presentation">
      {/* Non-clickable backdrop */}
      <div className="welcome-popup__backdrop" />

      {/* Under-development card — no close button, no dismiss */}
      <div
        aria-labelledby="welcome-popup-title"
        aria-modal="true"
        className="welcome-popup__dialog welcome-popup__dialog--dev"
        role="dialog"
      >
        {/* Badge */}
        <div className="wpu-badge">🚧 Website Under Development</div>

        {/* Logo */}
        <div className="wpu-logo-wrap">
          <Image
            src="/assets/logo.png"
            alt="School Chandan logo"
            fill
            sizes="80px"
            className="wpu-logo"
          />
        </div>

        {/* Headline */}
        <h2 id="welcome-popup-title" className="wpu-headline">
          We&apos;re Building{" "}
          <span className="wpu-headline--accent">Something Great</span>
        </h2>

        {/* Body */}
        <p className="wpu-body">
          The website for <strong>School Chandan</strong> is currently under
          active development. We&apos;re working hard to deliver a modern,
          reliable, and high-quality experience.
        </p>

        {/* Launch date */}
        <div className="wpu-launch">
          🗓️ Launching on <strong>2nd April 2026</strong>
        </div>

        {/* Footer */}
        <p className="wpu-footer">
          © 2026 School Chandan · Chandan Education Society. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
