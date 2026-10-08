export type DisclosureDoc = {
  id: string;
  serial: number;
  title: string;
  /** Relative link: /pdfs/*.pdf locally and in production. */
  href: string;
  /** Absolute production URL, shown as the link text. */
  publicUrl: string;
};

/* Relative path: serves as /pdfs/*.pdf on any host.
   localhost:3000/pdfs/b1.pdf locally,
   schoolchandan.edu.in/pdfs/b1.pdf in production.
   Just drop the real PDFs into public/pdfs/ keeping the same filenames. */
export const DISCLOSURE_PDF_BASE = "/pdfs";

const PUBLIC_BASE = "https://schoolchandan.edu.in/pdfs";

/* ── A. Affiliation / Certification Documents (CBSE wording verbatim) ── */

export const disclosureB: DisclosureDoc[] = [
  {
    id: "B1",
    serial: 1,
    title:
      "Copies of Affiliation/Upgradation Letter and recent Extension of Affiliation, if any",
    href: `${DISCLOSURE_PDF_BASE}/b1.pdf`,
    publicUrl: `${PUBLIC_BASE}/b1.pdf`,
  },
  {
    id: "B2",
    serial: 2,
    title:
      "Copies of Societies/Trust/Company Registration/Renewal Certificate, as applicable",
    href: `${DISCLOSURE_PDF_BASE}/b2.pdf`,
    publicUrl: `${PUBLIC_BASE}/b2.pdf`,
  },
  {
    id: "B3",
    serial: 3,
    title:
      "Copy of No Objection Certificate (NOC) issued, if applicable, by the State Govt./UT",
    href: `${DISCLOSURE_PDF_BASE}/b3.pdf`,
    publicUrl: `${PUBLIC_BASE}/b3.pdf`,
  },
  {
    id: "B4",
    serial: 4,
    title:
      "Copies of Recognition Certificate under RTE Act, 2009, and its renewal if applicable",
    href: `${DISCLOSURE_PDF_BASE}/b4.pdf`,
    publicUrl: `${PUBLIC_BASE}/b4.pdf`,
  },
  {
    id: "B5",
    serial: 5,
    title:
      "Copy of valid Building Safety Certificate as per the National Building Code",
    href: `${DISCLOSURE_PDF_BASE}/b5.pdf`,
    publicUrl: `${PUBLIC_BASE}/b5.pdf`,
  },
  {
    id: "B6",
    serial: 6,
    title:
      "Copy of valid Fire Safety Certificate issued by the competent authority",
    href: `${DISCLOSURE_PDF_BASE}/b6.pdf`,
    publicUrl: `${PUBLIC_BASE}/b6.pdf`,
  },
  {
    id: "B7",
    serial: 7,
    title:
      "Copy of the Self Certification submitted by the school for Affiliation/Upgradation/Extension of Affiliation",
    href: `${DISCLOSURE_PDF_BASE}/b7.pdf`,
    publicUrl: `${PUBLIC_BASE}/b7.pdf`,
  },
  {
    id: "B8",
    serial: 8,
    title: "Copies of valid Water, Health and Sanitation Certificates",
    href: `${DISCLOSURE_PDF_BASE}/b8.pdf`,
    publicUrl: `${PUBLIC_BASE}/b8.pdf`,
  },
];

/* ── B. School Information / Disclosure Documents (CBSE wording verbatim) ── */

export const disclosureC: DisclosureDoc[] = [
  {
    id: "C1",
    serial: 1,
    title: "Fee Structure of the School",
    href: `${DISCLOSURE_PDF_BASE}/c1.pdf`,
    publicUrl: `${PUBLIC_BASE}/c1.pdf`,
  },
  {
    id: "C2",
    serial: 2,
    title: "Annual Academic Calendar",
    href: `${DISCLOSURE_PDF_BASE}/c2.pdf`,
    publicUrl: `${PUBLIC_BASE}/c2.pdf`,
  },
  {
    id: "C3",
    serial: 3,
    title: "List of School Management Committee (SMC)",
    href: `${DISCLOSURE_PDF_BASE}/c3.pdf`,
    publicUrl: `${PUBLIC_BASE}/c3.pdf`,
  },
  {
    id: "C4",
    serial: 4,
    title: "List of Parents Teachers Association (PTA) Members",
    href: `${DISCLOSURE_PDF_BASE}/c4.pdf`,
    publicUrl: `${PUBLIC_BASE}/c4.pdf`,
  },
  {
    id: "C5",
    serial: 5,
    title:
      "Last Three-Year Result of the Board Examination as per applicability",
    href: `${DISCLOSURE_PDF_BASE}/c5.pdf`,
    publicUrl: `${PUBLIC_BASE}/c5.pdf`,
  },
];

export const allDisclosureDocs: DisclosureDoc[] = [...disclosureB, ...disclosureC];
