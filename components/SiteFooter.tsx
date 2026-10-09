import Link from "next/link";

import { contactDetails } from "@/lib/site-data";
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
          <ul className="footer-list footer-list--contact">
            <li>{contactDetails.address}</li>
            <li>
              <a href={`tel:+91${contactDetails.phonePrimary}`}>
                {contactDetails.phonePrimary}
              </a>
              {", "}
              <a href={`tel:+91${contactDetails.phoneSecondary}`}>
                {contactDetails.phoneSecondary}
              </a>
              {", "}
              <a href={`tel:+91${contactDetails.phoneTertiary}`}>
                {contactDetails.phoneTertiary}
              </a>
            </li>
            <li>
              <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
            </li>
          </ul>
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
            <li>
              <Link href="/mandatory-public-disclosure">
                Mandatory Public Disclosure
              </Link>
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
              <Link href={getSectionPath("features", "unique-programs")}>Unique Programs</Link>
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
          <p>© {new Date().getFullYear()} School Chandan. All Rights Reserved</p>

          <SocialLinksList className="social-links" />
        </div>
      </div>
    </footer>
  );
}
