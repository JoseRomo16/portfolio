"use client";

import { NOT_FOUND } from "@/lib/content";

/**
 * Cambia el idioma de la página 404 sin recargar. La 404 es un único HTML estático para todas
 * las rutas, así que ambos idiomas van en el documento y CSS muestra uno según
 * <html data-lang> (.only-es / .only-en en globals.css).
 */
export function NotFoundLangToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.lang === "en" ? "es" : "en";
    root.dataset.lang = next;
    root.lang = next;
  };
  return (
    <button
      type="button"
      onClick={toggle}
      data-testid="lang-switch"
      className="rounded-full px-3 py-1.5 text-[13px] font-medium text-link transition-colors hover:bg-ink/[0.06]"
    >
      <span className="only-es" lang="en">{NOT_FOUND.switchTo.es}</span>
      <span className="only-en" lang="es">{NOT_FOUND.switchTo.en}</span>
    </button>
  );
}
