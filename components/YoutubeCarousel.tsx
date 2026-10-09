"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type YoutubeItem = {
  id: string;
  title: string;
  description: string;
};

export function YoutubeCarousel({ items }: { items: YoutubeItem[] }) {
  const [active, setActive] = useState(0);

  if (!items || items.length === 0) {
    return null;
  }

  const safeActive = active % items.length;
  const prev = () => setActive((a) => (a - 1 + items.length) % items.length);
  const next = () => setActive((a) => (a + 1) % items.length);

  const current = items[safeActive]!;


  return (
    <div style={{ width: "100%", maxWidth: "800px", margin: "2rem auto 0" }}>
      {/* Video embed */}
      <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", borderRadius: "1rem", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.13)" }}>
        <iframe
          key={current.id}
          src={`https://www.youtube-nocookie.com/embed/${current.id}?rel=0&modestbranding=1`}
          title={`YouTube video: ${current.title}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
        />
      </div>

      {/* Title + description */}
      <div style={{ marginTop: "1rem", textAlign: "center", padding: "0 0.5rem" }}>
        <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "var(--red-dark, #b91c1c)" }}>{current.title}</h3>
        <p style={{ margin: "0.4rem 0 0", fontSize: "0.92rem", color: "#555", lineHeight: 1.6 }}>{current.description}</p>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "1.2rem" }}>
        <button onClick={prev} aria-label="Previous video" style={{ background: "none", border: "1.5px solid #ccc", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#444", flexShrink: 0 }}>
          <ChevronLeft size={20} />
        </button>

        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {items.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(i)}
              aria-label={`Go to ${item.title}`}
              style={{ width: i === active ? 20 : 10, height: 10, borderRadius: 9999, border: "none", cursor: "pointer", transition: "all 0.3s", background: i === active ? "var(--red-dark, #b91c1c)" : "#ccc", padding: 0 }}
            />
          ))}
        </div>

        <button onClick={next} aria-label="Next video" style={{ background: "none", border: "1.5px solid #ccc", borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#444", flexShrink: 0 }}>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
