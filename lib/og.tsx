/**
 * Imagen de vista previa (Open Graph, 1200×630) de cada caso de estudio, generada en la compilación
 * con ImageResponse (Satori). La sirve app/og/[file]/route.ts en /og/<slug>.<es|en>.png.
 *
 * Satori no lee woff2: usa los TTF completos de Inter en assets/og-fonts/ (licencia OFL, ver OFL.txt),
 * que incluyen →, ≤ y los acentos.
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
const fonts = Promise.all([
  readFile(path.join(FONT_DIR, "Inter-Regular.ttf")),
  readFile(path.join(FONT_DIR, "Inter-Bold.ttf")),
]);

// Los mismos colores del tema claro del sitio (app/globals.css).
const C = { page: "#ffffff", tile: "#f5f5f7", ink: "#000000", sub: "#6e6e73", link: "#0066cc", hair: "rgba(0,0,0,0.06)" };

const LABEL = { es: "Caso de estudio", en: "Case study" };

export async function projectOgImage(p: Project, l: Lang) {
  const [regular, bold] = await fonts;
  const metrics = p.metrics.slice(0, 3);
  const name = tx(p.name, l);
  const domain = new URL(SITE_URL).host;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: C.page, padding: "64px 72px", fontFamily: "Inter" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 26, color: C.sub, fontWeight: 700 }}>
          <span>{p.tag[l]}</span>
          <span style={{ color: "#a1a1a6" }}>·</span>
          <span style={{ fontWeight: 400 }}>{LABEL[l]}</span>
        </div>
        <div style={{ display: "flex", marginTop: 18, fontSize: name.length > 24 ? 72 : 88, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: C.ink }}>
          {name}
        </div>
        <div style={{ display: "flex", gap: 20, marginTop: "auto" }}>
          {metrics.map((m) => (
            <div
              key={m.label.en}
              style={{ display: "flex", flexDirection: "column", flex: 1, background: C.tile, borderRadius: 28, padding: "28px 30px", border: `1px solid ${C.hair}` }}
            >
              <span style={{ fontSize: 58, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: C.ink }}>{m.value[l]}</span>
              <span style={{ marginTop: 14, fontSize: 22, lineHeight: 1.3, color: C.sub }}>{m.label[l]}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 40, fontSize: 26 }}>
          <span style={{ color: C.link, fontWeight: 700 }}>{domain}</span>
          <span style={{ color: C.sub }}>Jose Luis Romo Melo</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
