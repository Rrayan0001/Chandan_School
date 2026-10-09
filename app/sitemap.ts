import type { MetadataRoute } from "next";

import { sectionPages, getSectionPath } from "@/lib/subpage-data";

const BASE = "https://schoolchandan.edu.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/gallery", "/mandatory-public-disclosure"];
  const sectionRoutes = sectionPages.map((page) =>
    getSectionPath(page.section, page.slug)
  );

  return [...staticRoutes, ...sectionRoutes].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
  }));
}
