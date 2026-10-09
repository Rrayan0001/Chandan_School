import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-shell" id="top">
      <main className="main-shell">
        <div className="content-frame">
          <section className="content-block">
            <div className="section-heading">
              <h2>Page Not Found</h2>
              <p>
                The page you are looking for does not exist or has been moved.
              </p>
            </div>
            <div className="section-page__sidebar-actions">
              <Link className="button-link button-link--gold" href="/">
                Back to Home
              </Link>
              <Link
                className="button-link button-link--plain"
                href="/mandatory-public-disclosure"
              >
                Mandatory Public Disclosure →
              </Link>
              <Link className="button-link button-link--plain" href="/gallery">
                View Gallery →
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
