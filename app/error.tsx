"use client";

import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="page-shell" id="top">
      <main className="main-shell">
        <div className="content-frame">
          <section className="content-block">
            <div className="section-heading">
              <h2>Something went wrong</h2>
              <p>
                This section could not be loaded. Please try again or return
                home.
              </p>
            </div>
            <div className="section-page__sidebar-actions">
              <button
                className="button-link button-link--gold"
                onClick={() => reset()}
                type="button"
              >
                Try again
              </button>
              <Link className="button-link button-link--plain" href="/">
                Back to Home →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
