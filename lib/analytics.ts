/**
 * Analítica con Umami Cloud (sin cookies, sin banner).
 *
 * - El script solo se incluye si existe NEXT_PUBLIC_UMAMI_WEBSITE_ID al compilar (en Vercel,
 *   variable de Production). En local, en CI y en las vistas previas no se registra nada.
 * - Los eventos van como atributos data-umami-event / data-umami-event-* (umamiEvent()).
 *   Si un bloqueador impide cargar el script, los atributos quedan inertes y nada se rompe.
 * - Excepción: la descarga del CV usa track() (ver CvLink en components/Chrome.tsx). Con un <a>
 *   que no abre pestaña nueva, el script de Umami cancela el clic y navega él mismo con
 *   location.href, lo que anula el atributo `download`.
 */
import { SITE_URL } from "./i18n";

export const UMAMI = {
  websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim() || undefined,
  src: "https://cloud.umami.is/script.js",
  /** Solo cuenta visitas en el dominio de producción (no en localhost ni en vistas previas). */
  domains: new URL(SITE_URL).host,
};

/** Nombres de eventos: en inglés, sustantivo-verbo, en minúsculas. */
export type UmamiEventName = "cv-download" | "demo-open" | "repo-open" | "email-copy" | "whatsapp-open" | "linkedin-open";

/**
 * Propiedades de un evento. Cada propiedad guardada cuenta como un evento en el plan Hobby
 * (100.000 al mes), así que se envían solo las necesarias.
 * - page: "home" | "case-study" | "404"
 * - project: slug del proyecto, cuando el clic es sobre un proyecto
 */
export type UmamiProps = { page: "home" | "case-study" | "404"; project?: string };

/** Atributos data-umami-event-* para esparcir en un <a target="_blank"> o un <button>. */
export function umamiEvent(name: UmamiEventName, props: UmamiProps): Record<string, string> {
  const attrs: Record<string, string> = { "data-umami-event": name };
  for (const [k, v] of Object.entries(props)) if (v) attrs[`data-umami-event-${k}`] = v;
  return attrs;
}

type UmamiGlobal = { track: (name: string, data?: Record<string, string>) => unknown };

/** Envía un evento desde código. No hace nada si el script no cargó (bloqueador, local, CI). */
export function track(name: UmamiEventName, props: UmamiProps) {
  try {
    const data = Object.fromEntries(Object.entries(props).filter(([, v]) => v)) as Record<string, string>;
    (window as unknown as { umami?: UmamiGlobal }).umami?.track(name, data);
  } catch {}
}
