"use client";

import Link from "next/link";
import { useState } from "react";

import type { NavItem } from "@/lib/site-data";

type NavbarProps = {
  items: NavItem[];
};

export function Navbar({ items }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="nav-shell">
      <div className="container nav-shell__inner">
        <Link className="nav-shell__brand" href="/">
          Chandan School
        </Link>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={mobileOpen}
          className="nav-toggle"
          onClick={() => setMobileOpen((current) => !current)}
          type="button"
        >
          <span />
          <span />
          <span />
          Menu
        </button>

        <nav aria-label="Primary" className="site-nav site-nav--desktop">
          <ul className="site-nav__desktop-list">
            {items.map((item) => (
              <li
                className={`site-nav__desktop-item${
                  item.children ? " has-children" : ""
                }`}
                key={item.label}
              >
                <Link className="site-nav__desktop-link" href={item.href ?? "#"}>
                  {item.label}
                </Link>
                {item.children ? (
                  <div className="site-nav__dropdown">
                    {item.children.map((child) => (
                      <Link
                        className="site-nav__dropdown-link"
                        href={child.href}
                        key={child.label}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div
        className={`site-nav__mobile-panel${mobileOpen ? " is-open" : ""}`}
        id="mobile-navigation"
      >
        <div className="container">
          <nav aria-label="Mobile primary" className="site-nav site-nav--mobile">
            <ul className="site-nav__mobile-list">
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
                            onClick={() => setMobileOpen(false)}
                          >
                            Open {item.label}
                          </Link>
                        ) : null}
                        {item.children.map((child) => (
                          <Link
                            className="site-nav__mobile-link"
                            href={child.href}
                            key={child.label}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      className="site-nav__mobile-link is-solo"
                      href={item.href ?? "#"}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
