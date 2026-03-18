import React from 'react';

const TICKER_ITEMS = [
  "Excellence in Rural Education",
  "CBSE & State Board Curriculum",
  "Holistic Student Development",
  "Dedicated & Experienced Faculty",
  "Indian Human Values",
  "ATL Innovation Lab",
  "Extensive Sports & Yoga Programs",
  "100% Class 10 Results"
];

export function InfoTicker() {
  return (
    <div className="info-ticker">
      <div className="info-ticker__track">
        {/* Render the list twice to create a seamless infinite scroll via CSS */}
        {[...Array(2)].map((_, groupIndex) => (
          <div key={groupIndex} className="info-ticker__group" aria-hidden={groupIndex === 1}>
            {TICKER_ITEMS.map((item, index) => (
              <React.Fragment key={index}>
                <span className="info-ticker__item">{item}</span>
                <span className="info-ticker__separator">❈</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
