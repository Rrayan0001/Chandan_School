"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AdminNavbar } from "../AdminNavbar";

interface EventItem {
  id: string;
  title: string;
  eventDate: string;
  imageUrl: string;
  createdAt: string;
}

export default function AdminEventsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState(new Date().toISOString().split("T")[0]);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.replace("/admin");
      return;
    }
    fetchEvents();
  }, [router]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/events?t=${Date.now()}`);
      const data = await res.json();
      setEvents(data.events || []);
    } catch {
      setUploadError("Failed to load events.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("Event image file size must not exceed 2 MB limit.");
      return;
    }
    setUploadError("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedFile) {
      setUploadError("Event caption and image are required.");
      return;
    }

    if (eventDate && new Date(eventDate).getTime() > new Date("2026-12-31").getTime()) {
      setUploadError("Event date cannot be after 31st December 2026.");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 15, 85));
    }, 150);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("eventDate", eventDate);
      formData.append("file", selectedFile);

      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to publish event");
      }

      setSuccessMsg("Event published successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);

      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setTitle("");
      setEventDate(new Date().toISOString().split("T")[0]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      await fetchEvents();
    } catch (err: unknown) {
      clearInterval(progressInterval);
      setUploadError(err instanceof Error ? err.message : "Failed to publish event.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      setEvents((prev) => prev.filter((item) => item.id !== id));
      setSuccessMsg("Event deleted successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setUploadError("Failed to delete event.");
    } finally {
      setDeleting(null);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="admin-dash-shell">
      <AdminNavbar activePage="events" />

      <main className="admin-dash-main">
        <header className="admin-topbar">
          <div>
            <h1>Events Manager</h1>
            <p>Publish upcoming event highlights and details (enforcing ≤ 2MB limit on image uploads)</p>
          </div>
          {successMsg && (
            <span className="admin-saved-badge">✓ {successMsg}</span>
          )}
        </header>

        <div className="admin-gallery-content">
          {/* Upload Section */}
          <section className="admin-gallery-upload-section">
            <h2 className="admin-gallery-section-title">
              📅 Publish Event Highlight
            </h2>

            <form className="admin-gallery-upload-form" onSubmit={handleUpload}>
              <div className="admin-gallery-meta-fields">
                <div className="admin-gallery-field" style={{ gridColumn: "span 2" }}>
                  <label htmlFor="event-title">Event Caption</label>
                  <input
                    id="event-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Science Exhibition &amp; STEM Fair"
                    required
                  />
                </div>

                <div className="admin-gallery-field">
                  <label htmlFor="event-date">Event Date</label>
                  <input
                    id="event-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    max="2026-12-31"
                    required
                  />
                </div>

                <div className="admin-gallery-field">
                  <label htmlFor="event-file">Event Image <span>(under 2MB)</span></label>
                  <input
                    id="event-file"
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {preview && (
                <div style={{ marginTop: "1rem", position: "relative", width: "200px", height: "120px", border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden" }}>
                  <Image src={preview} alt="Selected event preview" fill style={{ objectFit: "cover" }} unoptimized />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setPreview(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      background: "rgba(0,0,0,0.6)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px"
                    }}
                  >
                    ×
                  </button>
                </div>
              )}

              {uploading && (
                <div className="admin-gallery-progress-wrap">
                  <div className="admin-gallery-progress-bar" style={{ width: `${uploadProgress}%` }} />
                  <span>{uploadProgress < 100 ? `Uploading Event… ${uploadProgress}%` : "Processing…"}</span>
                </div>
              )}

              {uploadError && (
                <div className="admin-gallery-error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {uploadError}
                </div>
              )}

              <button
                type="submit"
                className="admin-gallery-upload-btn"
                disabled={uploading}
                style={{ background: "#6a1b29" }}
              >
                {uploading ? "Publishing Event..." : "Publish Event"}
              </button>
            </form>
          </section>

          {/* List Section */}
          <section className="admin-gallery-grid-section">
            <h2 className="admin-gallery-section-title">
              📅 Published Events List
              <span className="admin-gallery-count">{events.length}</span>
            </h2>

            {loading ? (
              <div className="admin-gallery-loading">
                <span className="admin-gallery-spinner" />
                Loading events...
              </div>
            ) : events.length === 0 ? (
              <div className="admin-gallery-empty">
                <div className="admin-gallery-empty-icon">📭</div>
                <p>No event highlights published yet.</p>
              </div>
            ) : (
              <div className="admin-gallery-grid">
                {events.map((item) => (
                  <div key={item.id} className="admin-gallery-card">
                    <div className="admin-gallery-card__img">
                      <Image
                        src={`/api/events/image?url=${encodeURIComponent(item.imageUrl)}`}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                      <div className="admin-gallery-card__overlay">
                        <button
                          className="admin-gallery-card__action admin-gallery-card__action--delete"
                          onClick={() => setDeleteConfirm(item.id)}
                          disabled={!!deleting}
                          title="Delete Event"
                          style={{ margin: "auto" }}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="admin-gallery-card__body">
                      <strong>{item.title}</strong>
                      <p style={{ fontSize: "0.8rem", color: "#888", marginTop: "0.25rem" }}>Event Date: {item.eventDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Delete Confirm Modal */}
        {deleteConfirm && (
          <div className="admin-gallery-modal-overlay" onClick={() => setDeleteConfirm(null)}>
            <div className="admin-gallery-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-gallery-modal__icon">🗑️</div>
              <h3>Delete Event Highlight?</h3>
              <p>This will permanently remove this event card and its associated image from the website. This action cannot be undone.</p>
              <div className="admin-gallery-modal__actions">
                <button className="admin-gallery-modal__cancel" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </button>
                <button
                  className="admin-gallery-modal__confirm"
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={!!deleting}
                >
                  {deleting ? "Deleting…" : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="admin-dash-footer">
          School Chandan Admin Portal · Chandan Education Society
        </footer>
      </main>
    </div>
  );
}
