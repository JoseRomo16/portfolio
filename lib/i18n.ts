// Idiomas y rutas. Español vive en "/", inglés en "/en".

export type Lang = "es" | "en";
export type T = { es: string; en: string };
export type Tx = string | T;

export const LANGS: Lang[] = ["es", "en"];
export const SITE_URL = "https://joseromo.vercel.app";

export const tx = (v: Tx, l: Lang) => (typeof v === "string" ? v : v[l]);

export const homePath = (l: Lang) => (l === "es" ? "/" : "/en/");
export const projectPath = (l: Lang, slug: string) =>
  l === "es" ? `/proyectos/${slug}/` : `/en/projects/${slug}/`;
/** Ancla dentro de la página de inicio, usable desde cualquier página. */
export const sectionPath = (l: Lang, id: string) => `${homePath(l)}#${id}`;

/** Formatea números con el separador de cada idioma (7.207 / 7,207). */
export const num = (n: number, l: Lang, decimals = 0) =>
  n.toLocaleString(l === "es" ? "es-CO" : "en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
