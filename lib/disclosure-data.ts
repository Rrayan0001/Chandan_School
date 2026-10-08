export type DisclosureDoc = {
  id: string;
  serial: number;
  title: string;
  href: string;
};

export type InfoRow = {
  serial: number;
  label: string;
  value: string;
};

/* Relative path: serves as /pdfs/*.pdf on any host.
   localhost:3000/pdfs/a1.pdf locally,
   schoolchandan.edu.in/pdfs/a1.pdf in production.
   Just drop the real PDFs into public/pdfs/ keeping the same filenames. */
export const DISCLOSURE_PDF_BASE = "/pdfs";

/* ── Section B: Documents & Information (exact user titles/order) ── */

export const disclosureB: DisclosureDoc[] = [
  {
    id: "B1",
    serial: 1,
    title: "Affiliation/Extension of Affiliation Letter",
    href: `${DISCLOSURE_PDF_BASE}/a1.pdf`,
  },
  {
    id: "B2",
    serial: 2,
    title: "No Objection Certificate (NOC), if applicable",
    href: `${DISCLOSURE_PDF_BASE}/a2.pdf`,
  },
  {
    id: "B3",
    serial: 3,
    title: "Recognition Certificate",
    href: `${DISCLOSURE_PDF_BASE}/a3.pdf`,
  },
  {
    id: "B4",
    serial: 4,
    title: "Land Certificate",
    href: `${DISCLOSURE_PDF_BASE}/a4.pdf`,
  },
  {
    id: "B5",
    serial: 5,
    title: "Fire Safety Certificate",
    href: `${DISCLOSURE_PDF_BASE}/a5.pdf`,
  },
  {
    id: "B6",
    serial: 6,
    title: "Building Safety Certificate",
    href: `${DISCLOSURE_PDF_BASE}/a6.pdf`,
  },
  {
    id: "B7",
    serial: 7,
    title:
      "DEO Certificate / Self-Certification submitted by the School for Affiliation/Extension of Affiliation",
    href: `${DISCLOSURE_PDF_BASE}/a7.pdf`,
  },
  {
    id: "B8",
    serial: 8,
    title:
      "Drinking Water, Health & Sanitation Certificates and Water Testing Report",
    href: `${DISCLOSURE_PDF_BASE}/a8.pdf`,
  },
];

/* ── Section C: Result & Academics (exact user titles/order) ── */

export const disclosureC: DisclosureDoc[] = [
  {
    id: "C1",
    serial: 1,
    title: "Fee Structure of the School",
    href: `${DISCLOSURE_PDF_BASE}/c1.pdf`,
  },
  {
    id: "C2",
    serial: 2,
    title: "Annual Academic Calendar",
    href: `${DISCLOSURE_PDF_BASE}/c2.pdf`,
  },
  {
    id: "C3",
    serial: 3,
    title: "List of School Management Committee (SMC) Members",
    href: `${DISCLOSURE_PDF_BASE}/c3.pdf`,
  },
  {
    id: "C4",
    serial: 4,
    title: "List of Parents Teachers Association (PTA) Members",
    href: `${DISCLOSURE_PDF_BASE}/c4.pdf`,
  },
  {
    id: "C5",
    serial: 5,
    title:
      "Last Three-Year Result of the Board Examination, as per applicability",
    href: `${DISCLOSURE_PDF_BASE}/c5.pdf`,
  },
];

export const allDisclosureDocs: DisclosureDoc[] = [...disclosureB, ...disclosureC];

/* ── Section A: General Information ── */

export const generalInfo: InfoRow[] = [
  { serial: 1, label: "Name of the School", value: "School Chandan" },
  { serial: 2, label: "Affiliation No. (if applicable)", value: "830305" },
  { serial: 3, label: "School Code (if applicable)", value: "To be updated" },
  {
    serial: 4,
    label: "Complete Address with Pin Code",
    value: "Sighli Road, Laxmeshwar, Dist: Gadag, Karnataka - 582116",
  },
  {
    serial: 5,
    label: "Principal Name & Qualification",
    value: "Sri Ramagiri Bavanavar — Qualification: To be updated",
  },
  { serial: 6, label: "School Email ID", value: "schoolchandanlxr@gmail.com" },
  {
    serial: 7,
    label: "Contact Details (Landline/Mobile)",
    value: "9448432414 / 7619162017 / 9945163848",
  },
];

/* ── Section D: Teaching Staff Details ── */

export const staffInfo: InfoRow[] = [
  { serial: 1, label: "Principal", value: "Sri Ramagiri Bavanavar" },
  { serial: 2, label: "Vice Principal", value: "To be updated" },
  {
    serial: 3,
    label: "Headmistress / Headmaster",
    value: "To be updated",
  },
  { serial: 4, label: "Total No. of Teachers", value: "To be updated" },
  {
    serial: 5,
    label: "Post Graduate Teachers (PGT)",
    value: "To be updated",
  },
  {
    serial: 6,
    label: "Trained Graduate Teachers (TGT)",
    value: "To be updated",
  },
  { serial: 7, label: "Primary Teachers (PRT)", value: "To be updated" },
  { serial: 8, label: "Teacher–Section Ratio", value: "To be updated" },
  {
    serial: 9,
    label: "Details of Special Educator",
    value: "To be updated",
  },
  {
    serial: 10,
    label: "Details of Counsellor and Wellness Teacher",
    value: "To be updated",
  },
];

/* ── Section E: School Infrastructure Details ── */

export const infrastructureInfo: InfoRow[] = [
  {
    serial: 1,
    label: "Total Campus Area (in sq. mtrs.)",
    value: "To be updated",
  },
  {
    serial: 2,
    label: "No. and Size of Classrooms",
    value: "To be updated",
  },
  {
    serial: 3,
    label: "No. and Size of Laboratories (including Computer Labs)",
    value: "To be updated",
  },
  { serial: 4, label: "No. and Size of Library", value: "To be updated" },
  { serial: 5, label: "Internet Facility", value: "Yes — To be updated" },
  {
    serial: 6,
    label: "No. of Toilets (Girls / Boys / CWSN)",
    value: "To be updated",
  },
  {
    serial: 7,
    label: "YouTube Link of School Inspection Video",
    value: "To be updated",
  },
];
