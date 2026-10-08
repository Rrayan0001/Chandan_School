import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { DisclosureDoc, InfoRow } from "@/lib/disclosure-data";
import {
  disclosureB,
  disclosureC,
  generalInfo,
  infrastructureInfo,
  staffInfo,
} from "@/lib/disclosure-data";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure | School Chandan",
  description:
    "CBSE Mandatory Public Disclosure — affiliation, safety certificates, fee structure, academic calendar, SMC, PTA and board results for School Chandan (Affiliation No. 830305).",
};

function DocTable({ docs }: { docs: DisclosureDoc[] }) {
  return (
    <div className="mpd-table-wrap">
      <table className="mpd-table">
        <thead>
          <tr>
            <th className="mpd-table__sno">S.No</th>
            <th>Document / Information</th>
            <th className="mpd-table__link">View Document</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc) => (
            <tr key={doc.id}>
              <td className="mpd-table__sno">{doc.serial}</td>
              <td className="mpd-table__title">{doc.title}</td>
              <td className="mpd-table__link">
                <a
                  className="mpd-pdf-link"
                  data-disclosure={doc.id}
                  href={doc.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span aria-hidden="true">📄</span> View PDF
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InfoTable({ rows }: { rows: InfoRow[] }) {
  return (
    <div className="mpd-table-wrap">
      <table className="mpd-table">
        <thead>
          <tr>
            <th className="mpd-table__sno">S.No</th>
            <th>Information</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.serial}>
              <td className="mpd-table__sno">{row.serial}</td>
              <td className="mpd-table__title">{row.label}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function MandatoryPublicDisclosurePage() {
  return (
    <div className="page-shell" id="top">
      <SiteHeader />

      <main className="main-shell">
        <div className="content-frame">
          <section className="content-block">
            <div className="section-heading">
              <h2>Mandatory Public Disclosure</h2>
              <p>
                As prescribed by CBSE (Appendix-IX). All documents open
                directly as PDFs — no login required. Affiliation No. 830305.
              </p>
            </div>

            <div
              className="section-page__breadcrumbs mpd-breadcrumbs"
              aria-label="Breadcrumb"
            >
              <Link href="/">Home</Link>
              <span>/</span>
              <span aria-current="page">Mandatory Public Disclosure</span>
            </div>

            {/* ── A: General Information ── */}
            <section className="mpd-section" id="general-information">
              <h3 className="mpd-section__title">
                A. General Information
              </h3>
              <InfoTable rows={generalInfo} />
            </section>

            {/* ── B: Documents & Information ── */}
            <section className="mpd-section" id="documents-information">
              <h3 className="mpd-section__title">
                B. Documents &amp; Information
              </h3>
              <DocTable docs={disclosureB} />
              <p className="mpd-note">
                Note: Self-attested copies by Chairman / Manager / Secretary
                and Principal. If any uploaded document is later found not
                genuine, the school shall be liable for action as per CBSE
                norms.
              </p>
            </section>

            {/* ── C: Result & Academics ── */}
            <section className="mpd-section" id="result-academics">
              <h3 className="mpd-section__title">
                C. Result &amp; Academics
              </h3>
              <DocTable docs={disclosureC} />
            </section>

            {/* ── D: Staff ── */}
            <section className="mpd-section" id="staff-details">
              <h3 className="mpd-section__title">
                D. Teaching Staff Details
              </h3>
              <InfoTable rows={staffInfo} />
            </section>

            {/* ── E: Infrastructure ── */}
            <section className="mpd-section" id="infrastructure">
              <h3 className="mpd-section__title">
                E. School Infrastructure Details
              </h3>
              <InfoTable rows={infrastructureInfo} />
            </section>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
