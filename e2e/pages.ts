import { type Lang, homePath, projectPath } from "../lib/i18n";
import { PROJECTS } from "../lib/projects";

/** Todas las páginas del sitio en ambos idiomas, con su gemela en el otro idioma. */
export const PAGES: { path: string; twin: string; lang: Lang }[] = [
  { path: homePath("es"), twin: homePath("en"), lang: "es" },
  { path: homePath("en"), twin: homePath("es"), lang: "en" },
  ...PROJECTS.flatMap((p) => [
    { path: projectPath("es", p.slug), twin: projectPath("en", p.slug), lang: "es" as const },
    { path: projectPath("en", p.slug), twin: projectPath("es", p.slug), lang: "en" as const },
  ]),
];

export const SLUGS = PROJECTS.map((p) => p.slug);
