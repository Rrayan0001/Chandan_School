"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AdminNavbar } from "../AdminNavbar";

interface CircularItem {
  id: string;
  title: string;
  fromDate: string;
  toDate: string;
  pdfUrl: string;
  date: string;
  createdAt: string;
}

export default function AdminCircularsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [circulars, setCirculars] = useState<CircularItem[]>([]);
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
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.replace("/admin");
      return;
    }
    fetchCirculars();
  }, [router]);

  const fetchCirculars = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/circulars?t=${Date.now()}`);
      const data = await res.json();
      setCirculars(data.circulars || []);
    } catch {
      setUploadError("Failed to load circulars.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleFileSelect(file: File) {
    if (!file.type.includes("pdf") && !file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Please select a PDF file.");
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setUploadError("File size must be under 15 MB.");
      return;
    }
    setUploadError("");
    setSelectedFile(file);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedFile) {
      setUploadError("Title and circular PDF file are required.");
      return;
    }

    if (
      (date && new Date(date).getTime() > new Date("2026-12-31").getTime()) ||
      (fromDate && new Date(fromDate).getTime() > new Date("2026-12-31").getTime()) ||
      (toDate && new Date(toDate).getTime() > new Date("2026-12-31").getTime())
    ) {
      setUploadError("Circular dates cannot be after 31st December 2026.");
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
      formData.append("fromDate", fromDate);
      formData.append("toDate", toDate);
      formData.append("date", date);
      formData.append("file", selectedFile);

      const res = await fetch("/api/circulars", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to publish circular");
      }

      const data = await res.json();
      // Inject new item directly from server response — avoids stale CDN reads
      if (data.item) {
        setCirculars((prev) => [data.item, ...prev]);
      }

      setSuccessMsg("Circular published successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);

      // Reset form
      setSelectedFile(null);
      setTitle("");
      setFromDate("");
      setToDate("");
      setDate(new Date().toISOString().split("T")[0]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: unknown) {
      clearInterval(progressInterval);
      setUploadError(err instanceof Error ? err.message : "Failed to publish circular.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch("/api/circulars", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete circular.");
      }

      setCirculars((prev) => prev.filter((item) => item.id !== id));
      setSuccessMsg("Circular deleted successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Failed to delete circular.");
      setTimeout(() => setUploadError(""), 4000);
    } finally {
      setDeleting(null);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="admin-dash-shell">
      <AdminNavbar activePage="circulars" />

      <main className="admin-dash-main">
        <header className="admin-topbar">
          <div>
            <h1>Circulars Manager</h1>
            <p>Publish school circulars, specify duration dates, upload PDF notices and verify downloads</p>
          </div>
          {successMsg && (
            <div className="admin-toast">
              <span className="admin-toast__icon">✓</span>
              <span>{successMsg}</span>
            </div>
          )}
        </header>

        <div className="admin-gallery-content">
          {/* Upload Section */}
          <section className="admin-gallery-upload-section">
            <h2 className="admin-gallery-section-title">
              📋 Publish Circular Notice
            </h2>

            <form className="admin-gallery-upload-form" onSubmit={handleUpload}>
              <div className="admin-gallery-meta-fields">
                <div className="admin-gallery-field" style={{ gridColumn: "span 2" }}>
                  <label htmlFor="circ-title">Circular Caption / Title</label>
                  <input
                    id="circ-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Summer Vacation Schedule 2026"
                    required
                  />
                </div>

                <div className="admin-gallery-field">
                  <label htmlFor="circular-from">Applicable From Date <span style={{ fontWeight: 400, opacity: 0.8 }}>(optional)</span></label>
                  <input
                    id="circular-from"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    max="2026-12-31"
                  />
                </div>

                <div className="admin-gallery-field">
                  <label htmlFor="circular-to">Applicable To Date <span style={{ fontWeight: 400, opacity: 0.8 }}>(optional)</span></label>
                  <input
                    id="circular-to"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    max="2026-12-31"
                  />
                </div>

                <div className="admin-gallery-field">
                  <label htmlFor="circular-date">Publish Date</label>
                  <input
                    id="circular-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max="2026-12-31"
                    required
                  />
                </div>

                <div className="admin-gallery-field">
                  <label htmlFor="circ-file">PDF Circular File</label>
                  <input
                    id="circ-file"
                    type="file"
                    ref={fileInputRef}
                    accept="application/pdf"
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              {uploading && (
                <div className="admin-gallery-progress-wrap">
                  <div className="admin-gallery-progress-bar" style={{ width: `${uploadProgress}%` }} />
                  <span>{uploadProgress < 100 ? `Uploading PDF… ${uploadProgress}%` : "Processing…"}</span>
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
                {uploading ? "Publishing Circular..." : "Publish Circular"}
              </button>
            </form>
          </section>

          {/* List Section */}
          <section className="admin-gallery-grid-section">
            <h2 className="admin-gallery-section-title">
              📋 Published Circulars List
              <span className="admin-gallery-count">{circulars.length}</span>
            </h2>

            {loading ? (
              <div className="admin-gallery-loading">
                <span className="admin-gallery-spinner" />
                Loading circulars...
              </div>
            ) : circulars.length === 0 ? (
              <div className="admin-gallery-empty">
                <div className="admin-gallery-empty-icon">📭</div>
                <p>No circular notices published yet.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {circulars.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.5rem",
                      background: "#fff",
                      border: "1px solid #eee",
                      borderRadius: "15px",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 0.25rem 0", fontSize: "1.05rem", color: "#6a1b29" }}>{item.title}</h3>
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.8rem", color: "#666" }}>
                        <span>Published: <strong>{item.date}</strong></span>
                        {(item.fromDate || item.toDate) && (
                          <span>
                            Duration: <strong>{item.fromDate || "N/A"}</strong> to <strong>{item.toDate || "N/A"}</strong>
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <a
                        href={`/api/circulars/download?url=${encodeURIComponent(item.pdfUrl)}&filename=${encodeURIComponent(item.title)}`}
                        style={{
                          background: "#e0f2fe",
                          color: "#0284c7",
                          padding: "0.5rem 0.75rem",
                          borderRadius: "8px",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "0.3rem",
                        }}
                      >
                        📥 Download PDF
                      </a>

                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        style={{
                          background: "#fee2e2",
                          color: "#ef4444",
                          border: "none",
                          padding: "0.5rem",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        title="Delete Circular"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                      </button>
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
              <h3>Delete Circular Notice?</h3>
              <p>This will permanently remove this circular PDF and record from the website. This action cannot be undone.</p>
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
