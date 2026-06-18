"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STORAGE_KEY = "admission_open";

export default function AddonsPage() {
  const router = useRouter();
  const [admissionOpen, setAdmissionOpen] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.replace("/admin");
      return;
    }
    // Load current state from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    // Default to true if never set
    setAdmissionOpen(stored === null ? true : stored === "true");
  }, [router]);

  const handleToggle = () => {
    const newValue = !admissionOpen;
    setAdmissionOpen(newValue);
    localStorage.setItem(STORAGE_KEY, String(newValue));
    // Dispatch storage event so HeroSlider reacts on same page (cross-tab already works)
    window.dispatchEvent(new StorageEvent("storage", {
      key: STORAGE_KEY,
      newValue: String(newValue),
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-dash-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          <span className="admin-sidebar__icon">🏫</span>
          <div>
            <strong>School Chandan</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="admin-sidebar__nav">
          <Link href="/admin/dashboard" className="admin-sidebar__link">
            <span>🏠</span> Dashboard
          </Link>
          <Link href="/gallery" className="admin-sidebar__link">
            <span>📸</span> Gallery
          </Link>
          <Link href="/admin/addons" className="admin-sidebar__link admin-sidebar__link--active">
            <span>⚙️</span> Add-on's
          </Link>
        </nav>

        <button
          className="admin-sidebar__logout"
          onClick={() => { sessionStorage.removeItem("admin_authenticated"); router.push("/admin"); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </aside>

      {/* Main */}
      <main className="admin-dash-main">
        <header className="admin-topbar">
          <div>
            <h1>Add-on's</h1>
            <p>Hero section settings &amp; display toggles</p>
          </div>
          {saved && (
            <span className="admin-saved-badge">✓ Changes saved</span>
          )}
        </header>

        <div className="admin-addons-content">

          {/* Section: Hero Settings */}
          <div className="admin-addon-section">
            <h2 className="admin-addon-section__title">Hero Section</h2>
            <p className="admin-addon-section__desc">
              Control what is displayed on the hero slider across all slides on the homepage.
            </p>

            {/* Toggle Row */}
            <div className="admin-toggle-row">
              <div className="admin-toggle-row__info">
                <span className="admin-toggle-row__label">Admission Open Tag</span>
                <span className="admin-toggle-row__sub">
                  Shows the blinking red "Admission Open" badge on every hero slide
                </span>
              </div>
              <div className="admin-toggle-wrap">
                <span className={`admin-toggle-status ${admissionOpen ? "admin-toggle-status--on" : "admin-toggle-status--off"}`}>
                  {admissionOpen ? "ON" : "OFF"}
                </span>
                <button
                  role="switch"
                  aria-checked={admissionOpen}
                  aria-label="Toggle Admission Open tag"
                  className={`admin-toggle ${admissionOpen ? "admin-toggle--on" : ""}`}
                  onClick={handleToggle}
                >
                  <span className="admin-toggle__thumb" />
                </button>
              </div>
            </div>

            {/* Live preview hint */}
            <div className={`admin-addon-preview ${admissionOpen ? "admin-addon-preview--on" : "admin-addon-preview--off"}`}>
              <span>Preview:</span>
              {admissionOpen ? (
                <span className="admin-preview-tag">
                  <span className="admin-preview-dot" />
                  Admission Open
                </span>
              ) : (
                <span className="admin-preview-hidden">Tag hidden from visitors</span>
              )}
            </div>
          </div>

        </div>

        <footer className="admin-dash-footer">
          School Chandan Admin Portal · Chandan Education Society
        </footer>
      </main>
    </div>
  );
}
