import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import type { DisclosureDoc } from "@/lib/disclosure-data";
import { disclosureB, disclosureC } from "@/lib/disclosure-data";

export const metadata: Metadata = {
  title: "Mandatory Public Disclosure | School Chandan",
  description:
    "CBSE Affiliation Mandatory Documents / Website Links — School Chandan, Laxmeshwar. All documents open directly as PDFs, no login required.",
};

function DocTable({
  docs,
  columns,
}: {
  docs: DisclosureDoc[];
  columns: [string, string, string];
}) {
  return (
    <div className="mpd-table-wrap">
      <table className="mpd-table">
        <thead>
          <tr>
            <th className="mpd-table__sno">{columns[0]}</th>
            <th>{columns[1]}</th>
            <th className="mpd-table__link">{columns[2]}</th>
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
                  title={doc.publicUrl}
                >
                  <span aria-hidden="true">📄</span> View Document
                </a>
              </td>
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
            <div className="mpd-doc-header">
              <h2>School Chandan, Laxmeshwar</h2>
              <p>CBSE Affiliation – Mandatory Documents / Website Links</p>
            </div>

            <div
              className="section-page__breadcrumbs mpd-breadcrumbs"
              aria-label="Breadcrumb"
            >
              <Link href="/">Home</Link>
              <span>/</span>
              <span aria-current="page">Mandatory Public Disclosure</span>
            </div>

            {/* ── A: Affiliation / Certification Documents ── */}
            <section className="mpd-section" id="affiliation-documents">
              <h3 className="mpd-section__title">
                A. Affiliation / Certification Documents
              </h3>
              <DocTable
                columns={["Sl. No.", "Particulars", "Website Link"]}
                docs={disclosureB}
              />
            </section>

            {/* ── B: School Information / Disclosure Documents ── */}
            <section className="mpd-section" id="school-information">
              <h3 className="mpd-section__title">
                B. School Information / Disclosure Documents
              </h3>
              <DocTable
                columns={["Sl. No.", "Particulars", "Website Link"]}
                docs={disclosureC}
              />
            </section>

            <p className="mpd-signoff">School Chandan, Laxmeshwar</p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
