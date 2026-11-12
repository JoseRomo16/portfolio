import type { Metadata } from "next";
import { META } from "./content";
import { type Lang, SITE_URL, homePath, projectPath } from "./i18n";
import type { Project } from "./projects";
import { tx } from "./i18n";
import { OG_ALT, OG_SIZE, ogImagePath } from "./og";

const OG = { url: "/img/og.png", width: 1200, height: 627, alt: "Jose Luis Romo Melo — AI & Data Science" };

export function homeMeta(l: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: META.title[l],
    description: META.description[l],
    authors: [{ name: "Jose Luis Romo Melo" }],
    alternates: {
      canonical: homePath(l),
      languages: { es: homePath("es"), en: homePath("en"), "x-default": homePath("es") },
    },
    openGraph: {
      title: META.title[l],
      description: META.description[l],
      url: homePath(l),
      type: "profile",
      locale: l === "es" ? "es_CO" : "en_US",
      alternateLocale: l === "es" ? ["en_US"] : ["es_CO"],
      images: [OG],
    },
    twitter: { card: "summary_large_image", title: META.title[l], description: META.description[l], images: [OG.url] },
    robots: { index: true, follow: true },
  };
}

export function projectMeta(p: Project, l: Lang): Metadata {
  const title = `${tx(p.name, l)} — ${l === "es" ? "Caso de estudio" : "Case study"} · Jose Luis Romo Melo`;
  const ogImage = { url: ogImagePath(p.slug, l), ...OG_SIZE, alt: OG_ALT[l] };
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description: p.lede[l],
    alternates: {
      canonical: projectPath(l, p.slug),
      languages: { es: projectPath("es", p.slug), en: projectPath("en", p.slug), "x-default": projectPath("es", p.slug) },
    },
    openGraph: {
      title,
      description: p.lede[l],
      url: projectPath(l, p.slug),
      type: "article",
      locale: l === "es" ? "es_CO" : "en_US",
      // Cada caso tiene su propia imagen, generada en app/og/[file]/route.ts.
      images: [ogImage],
    },
    twitter: { card: "summary_large_image", title, description: p.lede[l], images: [ogImage.url] },
  };
}
