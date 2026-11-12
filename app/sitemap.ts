import type { MetadataRoute } from "next";
import { SITE_URL, homePath, projectPath } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { es: homePath("es"), en: homePath("en"), priority: 1 },
    ...PROJECTS.map((p) => ({ es: projectPath("es", p.slug), en: projectPath("en", p.slug), priority: 0.8 })),
  ];
  return pages.flatMap((pg) =>
    (["es", "en"] as const).map((l) => ({
      url: `${SITE_URL}${pg[l] === "/" ? "" : pg[l]}`,
      priority: pg.priority,
      alternates: { languages: { es: `${SITE_URL}${pg.es === "/" ? "" : pg.es}`, en: `${SITE_URL}${pg.en}` } },
    })),
  );
}
