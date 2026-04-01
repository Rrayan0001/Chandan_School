import Link from "next/link";

import { getSectionPath } from "@/lib/subpage-data";
import { SocialLinksList } from "./SocialLinks";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <h3>School Information</h3>
          <p className="site-footer__title">School Chandan</p>
          <p>Established with a focus on disciplined and value-based education.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <ul className="footer-list">
            <li>
              <Link href={getSectionPath("about-us", "about-school")}>About Us</Link>
            </li>
            <li>
              <Link href={getSectionPath("academics", "faculty")}>Academics</Link>
            </li>
            <li>
              <Link href={getSectionPath("student-corner", "students-staff")}>
                Student Corner
              </Link>
            </li>
            <li>
              <Link href={getSectionPath("features", "library")}>Facilities</Link>
            </li>
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Activities</h3>
          <ul className="footer-list">
            <li>
              <Link href={getSectionPath("student-corner", "events")}>Events</Link>
            </li>
            <li>
              <Link href={getSectionPath("features", "sports-ground")}>Sports</Link>
            </li>
            <li>
              <Link href={getSectionPath("activities", "co-curricular-activities")}>
                Co-Curricular
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3>Visiting Hours</h3>
          <ul className="footer-list footer-list--plain">
            <li>Office: Monday - Saturday</li>
            <li>Principal: By prior appointment</li>
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container site-footer__bottom-inner">
          <p>© 2026 School Chandan. All Rights Reserved</p>

          <SocialLinksList className="social-links" />
        </div>
      </div>
    </footer>
  );
}
