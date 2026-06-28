"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminNavbar } from "../AdminNavbar";

const STORAGE_KEY = "admission_open";

function formatDateString(dateStr: string) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default function AddonsPage() {
  const router = useRouter();
  const [admissionOpen, setAdmissionOpen] = useState(true);
  const [resultEnabled, setResultEnabled] = useState(false);
  const [resultDate, setResultDate] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.replace("/admin");
      return;
    }
    // Load current state from localStorage
    const storedAdmit = localStorage.getItem(STORAGE_KEY);
    setAdmissionOpen(storedAdmit === null ? true : storedAdmit === "true");

    const storedResult = localStorage.getItem("result_day_enabled");
    setResultEnabled(storedResult === "true");

    const storedDate = localStorage.getItem("result_day_date") || "";
    setResultDate(storedDate);
  }, [router]);

  const handleToggle = () => {
    const newValue = !admissionOpen;
    setAdmissionOpen(newValue);
    localStorage.setItem(STORAGE_KEY, String(newValue));
    window.dispatchEvent(new StorageEvent("storage", {
      key: STORAGE_KEY,
      newValue: String(newValue),
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResultToggle = () => {
    const newValue = !resultEnabled;
    setResultEnabled(newValue);
    localStorage.setItem("result_day_enabled", String(newValue));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "result_day_enabled",
      newValue: String(newValue),
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue && new Date(newValue).getTime() > new Date("2026-12-31").getTime()) {
      alert("Date cannot be after 31st December 2026.");
      return;
    }
    setResultDate(newValue);
    localStorage.setItem("result_day_date", newValue);
    window.dispatchEvent(new StorageEvent("storage", {
      key: "result_day_date",
      newValue: newValue,
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="admin-dash-shell">
      <AdminNavbar activePage="addons" />

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

            {/* Admission Open Toggle Row */}
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

            {/* Live preview hint for Admission Open */}
            <div className={`admin-addon-preview ${admissionOpen ? "admin-addon-preview--on" : "admin-addon-preview--off"}`} style={{ marginBottom: "2rem" }}>
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

            {/* Result Day Toggle Row */}
            <div className="admin-toggle-row">
              <div className="admin-toggle-row__info">
                <span className="admin-toggle-row__label">Result Day Tag</span>
                <span className="admin-toggle-row__sub">
                  Shows the "Result Day" badge with a specified date on every hero slide
                </span>
              </div>
              <div className="admin-toggle-wrap">
                <span className={`admin-toggle-status ${resultEnabled ? "admin-toggle-status--on" : "admin-toggle-status--off"}`}>
                  {resultEnabled ? "ON" : "OFF"}
                </span>
                <button
                  role="switch"
                  aria-checked={resultEnabled}
                  aria-label="Toggle Result Day tag"
                  className={`admin-toggle ${resultEnabled ? "admin-toggle--on" : ""}`}
                  onClick={handleResultToggle}
                >
                  <span className="admin-toggle__thumb" />
                </button>
              </div>
            </div>

            {/* Calendar Date Picker Row */}
            {resultEnabled && (
              <div className="admin-addon-date-picker-row">
                <label htmlFor="result-date-input">Select Result Date:</label>
                <input
                  type="date"
                  id="result-date-input"
                  value={resultDate}
                  onChange={handleDateChange}
                  max="2026-12-31"
                  className="admin-addon-date-input"
                />
              </div>
            )}

            {/* Live preview hint for Result Day */}
            <div className={`admin-addon-preview ${resultEnabled ? "admin-addon-preview--on" : "admin-addon-preview--off"}`}>
              <span>Preview:</span>
              {resultEnabled ? (
                <span className="admin-preview-tag admin-preview-tag--result">
                  <span className="admin-preview-dot admin-preview-dot--result" />
                  Result Day: {resultDate ? formatDateString(resultDate) : "No date selected"}
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
