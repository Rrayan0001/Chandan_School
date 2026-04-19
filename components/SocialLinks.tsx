import Link from "next/link";

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/SchoolChandanLaxmeshwar", kind: "facebook" as const },
  { label: "Instagram", href: "https://www.instagram.com/school_chandan?utm_source=ig_web_button_share_sheet&igsh=ODdmZWVhMTFiMw%3D%3D", kind: "instagram" as const },
  { label: "YouTube", href: "https://www.youtube.com/@SchoolChandan", kind: "youtube" as const }
];

export function SocialIcon({ kind }: { kind: "facebook" | "instagram" | "youtube" }) {
  if (kind === "facebook") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M14 8h3V4h-3c-3.2 0-5 1.9-5 5v3H6v4h3v4h4v-4h3.1l.9-4H13V9c0-.7.3-1 1-1Z" />
      </svg>
    );
  }

  if (kind === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm0 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Zm5 3.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm4.7-3.1a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M22 8.4c0-2-1.6-3.6-3.6-3.6H5.6C3.6 4.8 2 6.4 2 8.4v7.2c0 2 1.6 3.6 3.6 3.6h12.8c2 0 3.6-1.6 3.6-3.6V8.4ZM10 16V8.5l6 3.7-6 3.8Z" />
    </svg>
  );
}

export function SocialLinksList({ className }: { className?: string }) {
  return (
    <div className={className || "social-links"}>
      {socialLinks.map((link) => (
        <Link
          aria-label={link.label}
          className="social-link"
          href={link.href}
          key={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialIcon kind={link.kind} />
        </Link>
      ))}
    </div>
  );
}
