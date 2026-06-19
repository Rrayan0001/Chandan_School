"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.replace("/admin");
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    router.push("/admin");
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

        <button className="admin-sidebar__logout" onClick={handleLogout}>
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
            <h1>Dashboard</h1>
            <p>Welcome back, Administrator</p>
          </div>
        </header>

        <div className="admin-simple-grid">
          {/* Gallery Card */}
          <Link href="/admin/gallery" className="admin-nav-card">
            <span className="admin-nav-card__icon">📸</span>
            <div>
              <strong>Gallery</strong>
              <p>Upload &amp; manage gallery photos</p>
            </div>
            <svg className="admin-nav-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>

          {/* Add-ons Card */}
          <Link href="/admin/addons" className="admin-nav-card">
            <span className="admin-nav-card__icon">⚙️</span>
            <div>
              <strong>Add-on's</strong>
              <p>Hero section settings &amp; toggles</p>
            </div>
            <svg className="admin-nav-card__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>

        <footer className="admin-dash-footer">
          School Chandan Admin Portal · Chandan Education Society
        </footer>
      </main>
    </div>
  );
}
