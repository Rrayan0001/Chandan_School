"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AdminNavbar } from "../AdminNavbar";

interface NewsItem {
  id: string;
  title: string;
  caption: string;
  content: string;
  gifUrl?: string;
  date: string;
  createdAt: string;
}

export default function AdminNewsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [news, setNews] = useState<NewsItem[]>([]);
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
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.replace("/admin");
      return;
    }
    fetchNews();
  }, [router]);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news?t=${Date.now()}`);
      const data = await res.json();
      setNews(data.news || []);
    } catch {
      setUploadError("Failed to load news items.");
    } finally {
      setLoading(false);
    }
  }, []);

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/") && !file.type.includes("gif")) {
      setUploadError("Please select an image or GIF file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("File size must be under 10 MB.");
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
    if (!title || !content) {
      setUploadError("Title and news content are required.");
      return;
    }

    if (date && new Date(date).getTime() > new Date("2026-12-31").getTime()) {
      setUploadError("Publish date cannot be after 31st December 2026.");
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
      formData.append("caption", caption);
      formData.append("content", content);
      formData.append("date", date);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const res = await fetch("/api/news", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to post news");
      }

      setSuccessMsg("News item posted successfully!");
      setTimeout(() => setSuccessMsg(""), 4000);

      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setTitle("");
      setCaption("");
      setContent("");
      setDate(new Date().toISOString().split("T")[0]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      await fetchNews();
    } catch (err: unknown) {
      clearInterval(progressInterval);
      setUploadError(err instanceof Error ? err.message : "Failed to save news.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch("/api/news", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete news item.");
      }

      setNews((prev) => prev.filter((item) => item.id !== id));
      setSuccessMsg("News item deleted successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err: unknown) {
      setUploadError(err instanceof Error ? err.message : "Failed to delete news item.");
      setTimeout(() => setUploadError(""), 4000);
    } finally {
      setDeleting(null);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="admin-dash-shell">
      <AdminNavbar activePage="news" />

      <main className="admin-dash-main">
        <header className="admin-topbar">
          <div>
            <h1>News Manager</h1>
            <p>Publish latest news, captions, contents (supports GIFs), and dates for the homepage</p>
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
              📰 Publish Latest News
            </h2>

            <form className="admin-gallery-upload-form" onSubmit={handleUpload}>
              <div className="admin-gallery-meta-fields">
                <div className="admin-gallery-field">
                  <label htmlFor="news-title">News Title</label>
                  <input
                    id="news-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. CBSE 10th Result Declared"
                    required
                  />
                </div>

                <div className="admin-gallery-field">
                  <label htmlFor="news-caption">Caption</label>
                  <input
                    id="news-caption"
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. 100% success rate again this year"
                  />
                </div>

                <div className="admin-gallery-field">
                  <label htmlFor="news-date">Publish Date</label>
                  <input
                    id="news-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    max="2026-12-31"
                    required
                  />
                </div>

                <div className="admin-gallery-field" style={{ gridColumn: "span 2" }}>
                  <label htmlFor="news-content">Content Body</label>
                  <textarea
                    id="news-content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Describe the news in detail..."
                    required
                    rows={4}
                    style={{
                      width: "100%",
                      padding: "0.65rem 0.8rem",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      fontSize: "0.9rem",
                      fontFamily: "var(--font-body)",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div className="admin-gallery-field" style={{ gridColumn: "span 2" }}>
                  <label htmlFor="news-file">News GIF / Image <span>(optional, under 10MB)</span></label>
                  <input
                    id="news-file"
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleInputChange}
                    style={{ marginBottom: "1rem" }}
                  />

                  {preview && (
                    <div style={{ position: "relative", width: "150px", height: "150px", border: "1px solid #ddd", borderRadius: "10px", overflow: "hidden", background: "#f9f9f9" }}>
                      <Image src={preview} alt="Selected GIF preview" fill style={{ objectFit: "contain" }} unoptimized />
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
                </div>
              </div>

              {uploading && (
                <div className="admin-gallery-progress-wrap">
                  <div className="admin-gallery-progress-bar" style={{ width: `${uploadProgress}%` }} />
                  <span>{uploadProgress < 100 ? `Publishing… ${uploadProgress}%` : "Processing…"}</span>
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
                {uploading ? "Publishing News..." : "Publish News"}
              </button>
            </form>
          </section>

          {/* List Section */}
          <section className="admin-gallery-grid-section">
            <h2 className="admin-gallery-section-title">
              📰 Published News List
              <span className="admin-gallery-count">{news.length}</span>
            </h2>

            {loading ? (
              <div className="admin-gallery-loading">
                <span className="admin-gallery-spinner" />
                Loading news...
              </div>
            ) : news.length === 0 ? (
              <div className="admin-gallery-empty">
                <div className="admin-gallery-empty-icon">📭</div>
                <p>No news items published yet.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {news.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      padding: "1rem",
                      background: "#fff",
                      border: "1px solid #eee",
                      borderRadius: "15px",
                      position: "relative",
                      alignItems: "flex-start",
                    }}
                  >
                    {item.gifUrl && (
                      <div style={{ position: "relative", width: "120px", height: "120px", borderRadius: "10px", overflow: "hidden", flexShrink: 0, border: "1px solid #f0f0f0" }}>
                        <Image
                          src={`/api/news/gif?url=${encodeURIComponent(item.gifUrl)}`}
                          alt={item.title}
                          fill
                          style={{ objectFit: "cover" }}
                          unoptimized
                        />
                      </div>
                    )}
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                        <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#6a1b29" }}>{item.title}</h3>
                        <span style={{ fontSize: "0.8rem", color: "#888", fontWeight: 700 }}>{item.date}</span>
                      </div>
                      {item.caption && <strong style={{ display: "block", fontSize: "0.85rem", color: "#555", marginBottom: "0.5rem" }}>{item.caption}</strong>}
                      <p style={{ margin: 0, fontSize: "0.9rem", color: "#666", lineHeight: 1.5 }}>{item.content}</p>
                    </div>

                    <button
                      onClick={() => setDeleteConfirm(item.id)}
                      style={{
                        background: "#fee2e2",
                        color: "#ef4444",
                        border: "none",
                        padding: "0.5rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginLeft: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      title="Delete News"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                    </button>
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
              <h3>Delete News Item?</h3>
              <p>This will permanently remove this news post and any associated image/GIF from the website.</p>
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
