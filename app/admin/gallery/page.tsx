"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { AdminNavbar } from "../AdminNavbar";

interface BlobImage {
  url: string;
  pathname: string;
  uploadedAt?: string;
  size?: number;
  title?: string;
  caption?: string;
  category?: string;
}

const GALLERY_CATEGORIES = [
  "Sports",
  "Events",
  "Co-curricular Activities",
  "Achievements",
  "Paper Cuttings"
];



export default function AdminGalleryPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [blobs, setBlobs] = useState<BlobImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Form state
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState(GALLERY_CATEGORIES[0]);
  const [preview, setPreview] = useState<string | null>(null);

  // Edit metadata state
  const [editingBlob, setEditingBlob] = useState<BlobImage | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCaption, setEditCaption] = useState("");
  const [editCategory, setEditCategory] = useState(GALLERY_CATEGORIES[0]);

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.replace("/admin");
      return;
    }
    fetchBlobs();
  }, [router]);

  const fetchBlobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/gallery/list?t=${Date.now()}`);
      const data = await res.json();
      setBlobs(data.blobs || []);
    } catch {
      setUploadError("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  }, []);

  function prettifyName(pathname: string): string {
    const name = pathname.split("/").pop() || pathname;
    return name
      .replace(/^\d+-/, "")
      .replace(/\.[^.]+$/, "")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image file (JPG, PNG, WebP, etc.).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setUploadError("File size must be under 2 MB.");
      return;
    }
    setUploadError("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setUploadError("");
    setUploadProgress(0);

    // Simulate progress while uploading
    const progressInterval = setInterval(() => {
      setUploadProgress((p) => Math.min(p + 10, 85));
    }, 200);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("title", title.trim());
      formData.append("caption", caption);
      formData.append("category", category);

      const res = await fetch("/api/gallery/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Upload failed");
      }

      const result = await res.json();

      setSuccessMsg(`"${title || prettifyName(selectedFile.name)}" uploaded successfully!`);
      setTimeout(() => setSuccessMsg(""), 4000);

      // Reset form
      setSelectedFile(null);
      setPreview(null);
      setTitle("");
      setCaption("");
      setCategory(GALLERY_CATEGORIES[0]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      await fetchBlobs();
    } catch (err: unknown) {
      clearInterval(progressInterval);
      setUploadError(err instanceof Error ? err.message : "Upload failed. Please check your BLOB_READ_WRITE_TOKEN.");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleDelete = async (url: string) => {
    setDeleting(url);
    try {
      await fetch("/api/gallery/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });



      setBlobs((prev) => prev.filter((b) => b.url !== url));
      setSuccessMsg("Image deleted successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setUploadError("Failed to delete image.");
    } finally {
      setDeleting(null);
      setDeleteConfirm(null);
    }
  };

  const handleEditClick = (blob: BlobImage) => {
    setEditingBlob(blob);
    setEditTitle(blob.title || "");
    setEditCaption(blob.caption || "");
    setEditCategory(blob.category || GALLERY_CATEGORIES[0]);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlob) return;

    try {
      const res = await fetch("/api/gallery/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: editingBlob.url,
          title: editTitle.trim(),
          caption: editCaption.trim(),
          category: editCategory,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save changes");
      }

      setBlobs((prev) =>
        prev.map((b) =>
          b.url === editingBlob.url
            ? {
                ...b,
                title: editTitle.trim() || prettifyName(b.pathname),
                caption: editCaption.trim(),
                category: editCategory,
              }
            : b
        )
      );

      setSuccessMsg("Image details updated successfully.");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch {
      setUploadError("Failed to update image details.");
      setTimeout(() => setUploadError(""), 3000);
    } finally {
      setEditingBlob(null);
    }
  };

  return (
    <div className="admin-dash-shell">
      <AdminNavbar activePage="gallery" />

      {/* Main */}
      <main className="admin-dash-main">
        <header className="admin-topbar">
          <div>
            <h1>Gallery Manager</h1>
            <p>Upload and manage photos displayed on the public gallery page</p>
          </div>
          {successMsg && (
            <div className="admin-toast">
              <span className="admin-toast__icon">✓</span>
              <span>{successMsg}</span>
            </div>
          )}
        </header>

        <div className="admin-gallery-content">

          {/* ─── Upload Section ─── */}
          <section className="admin-gallery-upload-section">
            <h2 className="admin-gallery-section-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              Upload New Image
            </h2>

            <form className="admin-gallery-upload-form" onSubmit={handleUpload}>
              {/* Drop zone */}
              <div
                className={`admin-gallery-dropzone ${dragOver ? "admin-gallery-dropzone--active" : ""} ${selectedFile ? "admin-gallery-dropzone--has-file" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="admin-gallery-file-input"
                  onChange={handleInputChange}
                />
                {preview ? (
                  <div className="admin-gallery-dropzone-preview">
                    <Image src={preview} alt="Preview" fill style={{ objectFit: "contain" }} unoptimized />
                    <button
                      type="button"
                      className="admin-gallery-dropzone-clear"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreview(null);
                        setTitle("");
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                    >×</button>
                  </div>
                ) : (
                  <div className="admin-gallery-dropzone-placeholder">
                    <div className="admin-gallery-dropzone-icon">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    </div>
                    <p className="admin-gallery-dropzone-label">Drag &amp; drop an image here</p>
                    <p className="admin-gallery-dropzone-sub">or <span>click to browse</span> · JPG, PNG, WebP · Max 10 MB</p>
                  </div>
                )}
              </div>

              {/* Metadata fields */}
              <div className="admin-gallery-meta-fields">
                <div className="admin-gallery-field">
                  <label htmlFor="img-title">Image Title</label>
                  <input
                    id="img-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Annual Day 2024"
                    required
                  />
                </div>
                <div className="admin-gallery-field">
                  <label htmlFor="img-category">Category</label>
                  <select
                    id="img-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{ width: "100%", padding: "0.65rem 0.8rem", border: "1px solid #ddd", borderRadius: "10px", fontSize: "0.9rem", fontFamily: "var(--font-body)", background: "#fff" }}
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-gallery-field">
                  <label htmlFor="img-caption">Caption <span>(optional)</span></label>
                  <input
                    id="img-caption"
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="Short description of the photo"
                  />
                </div>
              </div>

              {/* Progress bar */}
              {uploading && (
                <div className="admin-gallery-progress-wrap">
                  <div className="admin-gallery-progress-bar" style={{ width: `${uploadProgress}%` }} />
                  <span>{uploadProgress < 100 ? `Uploading… ${uploadProgress}%` : "Processing…"}</span>
                </div>
              )}

              {/* Error */}
              {uploadError && (
                <div className="admin-gallery-error">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {uploadError}
                </div>
              )}

              <button
                type="submit"
                className="admin-gallery-upload-btn"
                disabled={!selectedFile || uploading}
              >
                {uploading ? (
                  <><span className="admin-login-spinner" /> Uploading…</>
                ) : (
                  <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Upload to Gallery</>
                )}
              </button>
            </form>
          </section>

          {/* ─── Uploaded Images Grid ─── */}
          <section className="admin-gallery-grid-section">
            <div className="admin-gallery-grid-header">
              <h2 className="admin-gallery-section-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                Uploaded Images
                <span className="admin-gallery-count">{blobs.length}</span>
              </h2>
              <Link href="/gallery" target="_blank" className="admin-gallery-view-link">
                View Public Gallery →
              </Link>
            </div>

            {loading ? (
              <div className="admin-gallery-loading">
                <span className="admin-gallery-spinner" />
                Loading images…
              </div>
            ) : blobs.length === 0 ? (
              <div className="admin-gallery-empty">
                <div className="admin-gallery-empty-icon">📭</div>
                <p>No images uploaded yet.</p>
                <p>Upload your first image above and it will appear on the public gallery page.</p>
              </div>
            ) : (
              <div className="admin-gallery-grid">
                {blobs.map((blob) => (
                  <div key={blob.url} className="admin-gallery-card">
                    <div className="admin-gallery-card__img">
                      <Image
                        src={`/api/gallery/image?url=${encodeURIComponent(blob.url)}`}
                        alt={blob.title || "Gallery image"}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                      {/* Overlay actions */}
                      <div className="admin-gallery-card__overlay">
                        <a href={`/api/gallery/image?url=${encodeURIComponent(blob.url)}`} target="_blank" rel="noopener noreferrer" className="admin-gallery-card__action" title="View full image">
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                        <button
                          className="admin-gallery-card__action admin-gallery-card__action--edit"
                          onClick={() => handleEditClick(blob)}
                          title="Edit details"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        </button>
                        <button
                          className="admin-gallery-card__action admin-gallery-card__action--delete"
                          onClick={() => setDeleteConfirm(blob.url)}
                          disabled={!!deleting}
                          title="Delete image"
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className="admin-gallery-card__body">
                      <strong>{blob.title || "Untitled"}</strong>
                      {blob.category && (
                        <span className="admin-gallery-card__tag" style={{ display: "inline-block", background: "#f0ecec", color: "#6a1b29", padding: "0.2rem 0.5rem", borderRadius: "5px", fontSize: "0.75rem", fontWeight: 700, marginTop: "0.25rem", marginBottom: "0.25rem" }}>
                          {blob.category}
                        </span>
                      )}
                      {blob.caption && <p>{blob.caption}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* ─── Delete Confirm Modal ─── */}
        {deleteConfirm && (
          <div className="admin-gallery-modal-overlay" onClick={() => setDeleteConfirm(null)}>
            <div className="admin-gallery-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-gallery-modal__icon">🗑️</div>
              <h3>Delete Image?</h3>
              <p>This will permanently remove the image from cloud storage and the public gallery. This action cannot be undone.</p>
              <div className="admin-gallery-modal__actions">
                <button className="admin-gallery-modal__cancel" onClick={() => setDeleteConfirm(null)}>
                  Cancel
                </button>
                <button
                  className="admin-gallery-modal__confirm"
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={!!deleting}
                >
                  {deleting ? <><span className="admin-login-spinner" /> Deleting…</> : "Yes, Delete"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── Edit Details Modal ─── */}
        {editingBlob && (
          <div className="admin-gallery-modal-overlay" onClick={() => setEditingBlob(null)}>
            <div className="admin-gallery-modal" onClick={(e) => e.stopPropagation()}>
              <div className="admin-gallery-modal__icon">✏️</div>
              <h3>Edit Image Details</h3>
              <form onSubmit={handleSaveEdit} className="admin-gallery-edit-form" style={{ width: "100%", marginTop: "1rem", textAlign: "left" }}>
                <div className="admin-gallery-field" style={{ marginBottom: "1rem" }}>
                  <label htmlFor="edit-img-title" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: "#333" }}>Image Title</label>
                  <input
                    id="edit-img-title"
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                    style={{ width: "100%", padding: "0.65rem 0.8rem", border: "1px solid #ddd", borderRadius: "10px", fontSize: "0.9rem", fontFamily: "var(--font-body)" }}
                  />
                </div>
                <div className="admin-gallery-field" style={{ marginBottom: "1rem" }}>
                  <label htmlFor="edit-img-category" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: "#333" }}>Category</label>
                  <select
                    id="edit-img-category"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    style={{ width: "100%", padding: "0.65rem 0.8rem", border: "1px solid #ddd", borderRadius: "10px", fontSize: "0.9rem", fontFamily: "var(--font-body)", background: "#fff" }}
                  >
                    {GALLERY_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="admin-gallery-field" style={{ marginBottom: "1.5rem" }}>
                  <label htmlFor="edit-img-caption" style={{ display: "block", marginBottom: "0.4rem", fontSize: "0.85rem", fontWeight: 700, color: "#333" }}>Caption (optional)</label>
                  <input
                    id="edit-img-caption"
                    type="text"
                    value={editCaption}
                    onChange={(e) => setEditCaption(e.target.value)}
                    style={{ width: "100%", padding: "0.65rem 0.8rem", border: "1px solid #ddd", borderRadius: "10px", fontSize: "0.9rem", fontFamily: "var(--font-body)" }}
                  />
                </div>
                <div className="admin-gallery-modal__actions" style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                  <button type="button" className="admin-gallery-modal__cancel" onClick={() => setEditingBlob(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="admin-gallery-modal__confirm" style={{ background: "#6a1b29" }}>
                    Save Changes
                  </button>
                </div>
              </form>
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
