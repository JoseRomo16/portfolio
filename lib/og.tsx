/**
 * Imagen de vista previa (Open Graph, 1200×630) de cada caso de estudio, generada en la compilación
 * con ImageResponse (Satori). La sirve app/og/[file]/route.ts en /og/<slug>.<es|en>.png.
 *
 * Mismo sistema visual que el sitio: papel, Newsreader para el nombre, JetBrains Mono para cifras y
 * etiquetas, cobalto en las cifras. Satori no lee woff2: usa archivos .ttf/.woff de assets/og-fonts/
 * (licencia OFL, ver OFL.txt). Inter va de respaldo para los glifos que la mono no trae (→, ≤).
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { type Lang, SITE_URL, tx } from "./i18n";
import type { Project } from "./projects";

export const OG_SIZE = { width: 1200, height: 630 };

/** Ruta pública de la imagen de un caso (la genera app/og/[file]/route.ts). */
export const ogImagePath = (slug: string, l: Lang) => `/og/${slug}.${l}.png`;

export const OG_ALT = { es: "Caso de estudio de Jose Luis Romo Melo", en: "Case study by Jose Luis Romo Melo" };

const FONT_DIR = path.join(process.cwd(), "assets/og-fonts");
const fonts = Promise.all(
  ["Inter-Regular.ttf", "Inter-Bold.ttf", "Newsreader-Medium.woff", "JetBrainsMono-Medium.woff"].map((f) => readFile(path.join(FONT_DIR, f))),
);

// Los mismos colores del tema claro del sitio (app/globals.css).
const C = { page: "#f8f7f4", ink: "#15171a", sub: "#5c6066", sub2: "#3a3d42", accent: "#2257d6", hair: "rgba(21,23,26,0.12)" };

const LABEL = { es: "Caso de estudio", en: "Case study" };
const MONO = "JetBrains Mono, Inter";

export async function projectOgImage(p: Project, l: Lang) {
  const [regular, bold, display, mono] = await fonts;
  const metrics = p.metrics.slice(0, 3);
  const name = tx(p.name, l);
  const domain = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: C.page, padding: "64px 72px", fontFamily: "Inter", color: C.ink }}>
        <div style={{ display: "flex", gap: 24, fontFamily: MONO, fontSize: 20, letterSpacing: "0.12em", textTransform: "uppercase", color: C.sub }}>
          <span>{LABEL[l]}</span>
          <span style={{ color: C.hair }}>/</span>
          <span>{p.tag[l]}</span>
        </div>
        <div style={{ display: "flex", marginTop: 22, fontFamily: "Newsreader", fontSize: name.length > 24 ? 80 : 100, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1 }}>
          {name}
        </div>
        <div style={{ display: "flex", marginTop: "auto", borderTop: `1px solid ${C.hair}`, borderBottom: `1px solid ${C.hair}` }}>
          {metrics.map((m, i) => (
            <div
              key={m.label.en}
              style={{ display: "flex", flexDirection: "column", flex: 1, padding: i === 0 ? "26px 28px 26px 0" : "26px 28px", borderLeft: i === 0 ? "none" : `1px solid ${C.hair}` }}
            >
              <span style={{ fontFamily: MONO, fontSize: 50, lineHeight: 1, color: C.accent }}>{m.value[l]}</span>
              <span style={{ marginTop: 14, fontSize: 21, lineHeight: 1.3, color: C.sub2 }}>{m.label[l]}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, fontSize: 24 }}>
          <span style={{ fontFamily: MONO, color: C.accent }}>{domain}</span>
          <span style={{ color: C.sub }}>Jose Luis Romo Melo</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
        { name: "Newsreader", data: display, weight: 500, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
