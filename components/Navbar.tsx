"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { NavItem } from "@/lib/site-data";

import { SocialLinksList } from "./SocialLinks";

type NavbarProps = {
  items: NavItem[];
};

export function Navbar({ items }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  // Which desktop dropdown is open (touch/keyboard support)
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  // Busts stale <details> state in the mobile panel on close
  const [mobileKey, setMobileKey] = useState(0);
  const shellRef = useRef<HTMLDivElement>(null);

  const closeMobile = () => {
    setMobileOpen(false);
    // Remount the mobile list so uncontrolled <details> submenus reset
    setMobileKey((k) => k + 1);
  };

  // Escape closes mobile nav + any open dropdown
  useEffect(() => {
    if (!mobileOpen && openMenu === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMobile();
        setOpenMenu(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, openMenu]);

  // Click-outside closes mobile panel
  useEffect(() => {
    if (!mobileOpen) return;
    const onPointer = (e: PointerEvent) => {
      if (shellRef.current && !shellRef.current.contains(e.target as Node)) {
        closeMobile();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [mobileOpen]);

  // Lock body scroll while the mobile panel is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Touch support: first tap opens the submenu, second tap follows the link
  const onParentActivate = (label: string) => (e: React.MouseEvent) => {
    if (openMenu !== label) {
      e.preventDefault();
      setOpenMenu(label);
    }
  };

  return (
    <div className="nav-shell" ref={shellRef}>
      <div className="container nav-shell__inner">
        <Link className="nav-shell__brand" href="/">
          School Chandan
        </Link>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={`nav-toggle ${mobileOpen ? 'is-active' : ''}`}
          onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
          type="button"
        >
          <div className="hamburger" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <span className="nav-toggle__text">Menu</span>
        </button>

        {/* Mobile Socials (Visible in header before opening menu) */}
        <SocialLinksList className="nav-socials site-nav--mobile-only" />

        <nav aria-label="Primary" className="site-nav site-nav--desktop">
          <ul className="site-nav__desktop-list">
            {items.map((item) => (
              <li
                className={`site-nav__desktop-item${
                  item.children ? " has-children" : ""
                }${openMenu === item.label ? " is-open" : ""}`}
                key={item.label}
                onMouseEnter={() => item.children && setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu((cur) => (cur === item.label ? null : cur))}
              >
                {item.children ? (
                  <>
                    {item.href ? (
                      <Link
                        aria-expanded={openMenu === item.label}
                        aria-haspopup="true"
                        className="site-nav__desktop-link"
                        href={item.href}
                        onClick={onParentActivate(item.label)}
                        onFocus={() => setOpenMenu(item.label)}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <button
                        aria-expanded={openMenu === item.label}
                        aria-haspopup="true"
                        className="site-nav__desktop-link site-nav__desktop-button"
                        onBlur={(e) => {
                          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                            setOpenMenu((cur) => (cur === item.label ? null : cur));
                          }
                        }}
                        onClick={() =>
                          setOpenMenu((cur) => (cur === item.label ? null : item.label))
                        }
                        onFocus={() => setOpenMenu(item.label)}
                        type="button"
                      >
                        {item.label}
                      </button>
                    )}
                    {openMenu === item.label && (
                      <div
                        className="site-nav__dropdown site-nav__dropdown--open"
                        onBlur={(e) => {
                          if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                            setOpenMenu((cur) => (cur === item.label ? null : cur));
                          }
                        }}
                      >
                        {item.children.map((child) => (
                          <Link
                            className="site-nav__dropdown-link"
                            href={child.href}
                            key={child.label}
                            onClick={() => setOpenMenu(null)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.href ? (
                  <Link className="site-nav__desktop-link" href={item.href}>
                    {item.label}
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Socials */}
        <SocialLinksList className="nav-socials site-nav--desktop" />
      </div>

      <div
        className={`site-nav__mobile-panel${mobileOpen ? " is-open" : ""}`}
        id="mobile-navigation"
      >
        <div className="container">
          <nav aria-label="Mobile primary" className="site-nav site-nav--mobile">
            <ul className="site-nav__mobile-list" key={mobileKey}>
              {items.map((item) => (
                <li className="site-nav__mobile-item" key={item.label}>
                  {item.children ? (
                    <details className="site-nav__mobile-details">
                      <summary className="site-nav__mobile-summary">
                        {item.label}
                      </summary>
                      <div className="site-nav__mobile-children">
                        {item.href ? (
                          <Link
                            className="site-nav__mobile-link is-main"
                            href={item.href}
                            onClick={closeMobile}
                          >
                            Open {item.label}
                          </Link>
                        ) : null}
                        {item.children.map((child) => (
                          <Link
                            className="site-nav__mobile-link"
                            href={child.href}
                            key={child.label}
                            onClick={closeMobile}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : item.href ? (
                    <Link
                      className="site-nav__mobile-link is-solo"
                      href={item.href}
                      onClick={closeMobile}
                    >
                      {item.label}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>
    </div>
  );
}
