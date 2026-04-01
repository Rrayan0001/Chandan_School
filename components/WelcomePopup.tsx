"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface WelcomePopupProps {
  /** When true the popup becomes visible. */
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
      {/* Background with vibrant gradient */}
      <div className="welcome-popup__backdrop" />

      {/* Main card */}
      <div
        aria-labelledby="welcome-popup-title"
        aria-modal="true"
        className="welcome-popup__dialog"
        role="dialog"
      >
        {/* Under-development Badge */}
        <div className="wpu-badge">
          <span className="wpu-badge__icon">🚧</span>
          <span className="wpu-badge__text">Website Under Development</span>
        </div>

        {/* Content Section */}
        <div className="wpu-content">
          <h2 id="welcome-popup-title" className="wpu-headline">
            We&apos;re Building <br />
            <span className="wpu-headline--accent">Something Great</span>
          </h2>

          <p className="wpu-body">
            The website for <strong>Chandan Education Society</strong> is currently under active development. 
            We&apos;re working hard to deliver a modern, reliable, and high-quality experience.
          </p>

          <div className="wpu-launch">
            🗓️ Launching on <strong>2nd April 2026</strong>
          </div>

          {/* Non-functional or ornamental button for the visual look */}
          <div className="wpu-button">
            Preparing for Launch...
          </div>
        </div>

        {/* Footer */}
        <p className="wpu-footer">
          © 2026 Chandan Education Society. All rights reserved.
        </p>
      </div>
    </div>
  );
}
