import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/Navbar";
import { navigation } from "@/lib/site-data";
import { GoogleTranslate } from "@/components/GoogleTranslate";

export function SiteHeader() {
  return (
    <>
      <header className="site-header">
        <div className="container site-header__main">
          {/* Left — Logo */}
          <div className="brand-block">
            <Link href="/" className="brand-block__logo-wrap">
              <Image
                alt="Chandan Education Society logo"
                className="brand-block__logo"
                height={75}
                priority
                src="/assets/logo.png"
                width={75}
              />
            </Link>
          </div>

          {/* Center — School Name & Tagline */}
          <div className="brand-center">
            <h1>School <span>Chandan</span></h1>
            <p className="brand-center__tagline">Excellence Beyond Education</p>
            <p className="brand-center__society">
              Under Chandan Education Society
            </p>
          </div>

          {/* Right — Info Block */}
          <div className="header-info">
            <div className="header-info-row">
              <div className="header-info__item">
                <span className="header-info__label">Estd</span>
                <span className="header-info__value">2003</span>
              </div>
              <div className="header-info__item">
                <span className="header-info__label">CBSE</span>
                <span className="header-info__value">830305</span>
              </div>
            </div>
            
            <div className="header-info-row">
              <div className="header-info__item">
                <span className="header-info__label">Phone</span>
                <span className="header-info__value">9448432414, 9945163848</span>
              </div>
              
              {/* Language Switcher integrated here */}
              <div className="header-lang">
                <GoogleTranslate />
              </div>
            </div>
          </div>
        </div>
      </header>

      <Navbar items={navigation} />
    </>
  );
}
