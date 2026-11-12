/**
 * srcset para las imágenes de /img/projects/, usando las variantes que genera
 * scripts/responsive-images.mjs en /img/projects/w/<nombre>-<ancho>.webp.
 * Mantén WIDTHS igual en los dos archivos.
 */
const WIDTHS = [640, 1024, 1600];
const DIR = "/img/projects/";

/** Devuelve el srcset, o undefined si la imagen no tiene variantes (está fuera de /img/projects/). */
export function srcSet(src: string, width: number): string | undefined {
  if (!src.startsWith(DIR)) return undefined;
  const base = src.slice(DIR.length).replace(/\.[^.]+$/, "");
  const variants = WIDTHS.filter((w) => w < width).map((w) => `${DIR}w/${base}-${w}.webp ${w}w`);
  return [...variants, `${src} ${width}w`].join(", ");
}

/**
 * Valores de `sizes` según dónde va la imagen. El contenedor mide 1120 px con 16–24 px de margen;
 * en un caso de estudio (lg+) la columna de contenido mide ~810 px.
 */
export const SIZES = {
  /** Ancho completo del contenedor (visual principal del caso). */
  full: "(min-width: 1120px) 1072px, calc(100vw - 32px)",
  /** Columna de contenido de un caso de estudio. */
  column: "(min-width: 1120px) 810px, (min-width: 1024px) 70vw, calc(100vw - 32px)",
  /** Dos por fila dentro de la columna de contenido. */
  half: "(min-width: 1120px) 400px, (min-width: 768px) 45vw, calc(100vw - 32px)",
  /** Tarjeta destacada del inicio (AutoValor). */
  cardWide: "(min-width: 1120px) 660px, (min-width: 768px) 90vw, calc(100vw - 96px)",
  /** Tarjeta de un tercio en el inicio. */
  cardThird: "(min-width: 1120px) 300px, (min-width: 768px) 45vw, calc(100vw - 96px)",
} as const;
