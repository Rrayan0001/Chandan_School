"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ADMIN_PASSWORD = "Chandan@0786";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    // If already logged in, go straight to dashboard
    if (sessionStorage.getItem("admin_authenticated") === "true") {
      router.replace("/admin/dashboard");
    }
    inputRef.current?.focus();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    // Small artificial delay for UX
    await new Promise((r) => setTimeout(r, 600));

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_authenticated", "true");
      router.push("/admin/dashboard");
    } else {
      setAttempts((a) => a + 1);
      setError(
        attempts >= 2
          ? "Multiple failed attempts. Please verify the password."
          : "Incorrect password. Please try again."
      );
      setIsShaking(true);
      setPassword("");
      setTimeout(() => setIsShaking(false), 600);
      inputRef.current?.focus();
    }
    setIsLoading(false);
  };

  return (
    <div className="admin-login-shell">
      {/* Decorative background blobs */}
      <div className="admin-login-blob admin-login-blob--1" />
      <div className="admin-login-blob admin-login-blob--2" />
      <div className="admin-login-blob admin-login-blob--3" />

      <div className={`admin-login-card ${isShaking ? "admin-login-card--shake" : ""}`}>
        {/* Logo & Branding */}
        <div className="admin-login-brand">
          <div className="admin-login-logo-wrap">
            <Image
              src="/assets/logo.png"
              alt="School Chandan Logo"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
          <div className="admin-login-brand-text">
            <h1>School Chandan</h1>
            <p>Admin Portal</p>
          </div>
        </div>

        <div className="admin-login-divider" />

        {/* Title */}
        <div className="admin-login-title-block">
          <span className="admin-login-eyebrow">🔒 Secure Access</span>
          <h2>Administrator Login</h2>
          <p>Enter the admin password to access the dashboard.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="admin-login-form" noValidate>
          <div className="admin-login-field">
            <label htmlFor="admin-password">Password</label>
            <div className="admin-login-input-wrap">
              <span className="admin-login-input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </span>
              <input
                id="admin-password"
                ref={inputRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="admin-login-eye"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {error && (
              <div className="admin-login-error" role="alert">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="admin-login-btn"
            disabled={isLoading || !password}
          >
            {isLoading ? (
              <>
                <span className="admin-login-spinner" />
                Verifying…
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Sign In to Dashboard
              </>
            )}
          </button>
        </form>

        <p className="admin-login-footer">
          School Chandan &nbsp;·&nbsp; Chandan Education Society &nbsp;·&nbsp; Laxmeshwar
        </p>
      </div>
    </div>
  );
}
