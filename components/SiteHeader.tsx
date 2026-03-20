import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/Navbar";
import { navigation } from "@/lib/site-data";

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="container site-header__main">
          <div className="brand-block">
            <Link href="/" className="brand-block__logo-wrap">
              <Image
                alt="Chandan Education Society logo"
                className="brand-block__logo"
                height={82}
                priority
                src="/assets/logo.png"
                width={82}
              />
            </Link>

            <div className="brand-block__copy">
              <h1>School <span>Chandan</span></h1>
              <p className="brand-block__subtitle">Excellence Beyond Education</p>
              <p className="brand-block__meta">
                Under Chandan Education Society
              </p>
              <p className="brand-block__meta">
                Laxmeshwar | Affiliated to CBSE (Affiliation No: 830305)
              </p>
            </div>
          </div>

          <aside className="admission-badge">
            <strong>Admission Open</strong>
            <p>Academic Year 2026-27</p>
            <span>From Nursery to Grade 10</span>
          </aside>
        </div>
      </header>

      <Navbar items={navigation} />
    </>
  );
}
