"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminNavbar } from "../AdminNavbar";

export default function AdminDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("admin_authenticated") !== "true") {
      router.replace("/admin");
    }
  }, [router]);

  return (
    <div className="admin-dash-shell">
      <AdminNavbar activePage="dashboard" />

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
