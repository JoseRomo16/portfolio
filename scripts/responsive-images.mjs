/**
 * Genera variantes webp más pequeñas de las imágenes de public/img/projects/ para srcset.
 * Corre solo antes de cada build (npm "prebuild"), así que también corre en Vercel.
 *
 *   public/img/projects/notes-claro.webp  →  public/img/projects/w/notes-claro-640.webp, -1024, -1600
 *
 * - Solo crea anchos menores que el original (nunca amplía).
 * - Es incremental: si la variante ya existe y es más nueva que el original, la salta.
 * - Las variantes no se versionan (.gitignore): el original es la única fuente.
 * La convención de rutas la comparte lib/images.ts; si cambias WIDTHS, cámbialos allá también.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const WIDTHS = [640, 1024, 1600];
const SRC_DIR = path.resolve("public/img/projects");
const OUT_DIR = path.join(SRC_DIR, "w");

const isNewer = async (out, src) => {
  try {
    return (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs;
  } catch {
    return false;
  }
};

await mkdir(OUT_DIR, { recursive: true });
const files = (await readdir(SRC_DIR)).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
let made = 0;
let skipped = 0;

for (const file of files) {
  const src = path.join(SRC_DIR, file);
  const { width } = await sharp(src).metadata();
  const base = file.replace(/\.[^.]+$/, "");
  for (const w of WIDTHS.filter((w) => width && w < width)) {
    const out = path.join(OUT_DIR, `${base}-${w}.webp`);
    if (await isNewer(out, src)) {
      skipped++;
      continue;
    }
    await sharp(src).resize({ width: w }).webp({ quality: 80, effort: 5 }).toFile(out);
    made++;
  }
}

console.log(`responsive-images: ${made} variantes nuevas, ${skipped} al día (${files.length} originales).`);
