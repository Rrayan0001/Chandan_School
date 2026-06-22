"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface AdminNavbarProps {
  activePage: "dashboard" | "gallery" | "addons";
}

export function AdminNavbar({ activePage }: AdminNavbarProps) {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    router.push("/admin");
  };

  return (
    <header className="admin-navbar">
      <div className="admin-navbar__brand">
        <span className="admin-navbar__icon">🏫</span>
        <div>
          <strong>School Chandan</strong>
          <span>Admin Panel</span>
        </div>
      </div>

      <nav className="admin-navbar__nav">
        <Link
          href="/admin/dashboard"
          className={`admin-navbar__link ${activePage === "dashboard" ? "admin-navbar__link--active" : ""}`}
        >
          <span>🏠</span> Dashboard
        </Link>
        <Link
          href="/admin/gallery"
          className={`admin-navbar__link ${activePage === "gallery" ? "admin-navbar__link--active" : ""}`}
        >
          <span>📸</span> Gallery
        </Link>
        <Link
          href="/admin/addons"
          className={`admin-navbar__link ${activePage === "addons" ? "admin-navbar__link--active" : ""}`}
        >
          <span>⚙️</span> Add-on&apos;s
        </Link>
      </nav>

      <button className="admin-navbar__logout" onClick={handleLogout}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        <span>Sign Out</span>
      </button>
    </header>
  );
}
