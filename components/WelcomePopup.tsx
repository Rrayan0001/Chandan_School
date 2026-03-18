"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="welcome-popup" role="presentation">
      <button
        aria-label="Close welcome popup"
        className="welcome-popup__backdrop"
        onClick={() => setIsOpen(false)}
        type="button"
      />

      <div
        aria-labelledby="welcome-popup-title"
        aria-modal="true"
        className="welcome-popup__dialog"
        role="dialog"
      >
        <button
          aria-label="Close welcome popup"
          className="welcome-popup__close"
          onClick={() => setIsOpen(false)}
          type="button"
        >
          ×
        </button>

        <div className="welcome-popup__media">
          <Image
            alt="Front view of School Chandan campus"
            fill
            priority
            sizes="(max-width: 900px) 92vw, 860px"
            src="/assets/hero/campus-front.jpg"
            style={{ objectPosition: "center 56%" }}
          />

          <div className="welcome-popup__caption">
            <p className="welcome-popup__eyebrow">Welcome to School Chandan</p>
            <h2 id="welcome-popup-title">
              A warm campus for learning, values, and confident growth.
            </h2>
            <p className="welcome-popup__text">
              School Chandan, Laxmeshwar under Chandan Education Society.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
