"use client";

/**
 * Visor de capturas y figuras de los casos de estudio, con <dialog> nativo.
 *
 * - <LightboxGroup> envuelve una galería (un VisualBlock) y tiene un solo <dialog>.
 * - <ZoomTrigger> es el <button> que envuelve cada imagen; la imagen la sigue renderizando el servidor.
 * - Esc cierra (nativo), clic en el fondo cierra, ← → pasan de imagen si hay varias,
 *   el foco vuelve al botón que lo abrió y el fondo no se desplaza mientras está abierto.
 * - Las versiones clara y oscura usan .only-light / .only-dark, así que siguen el tema activo.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "./Icons";

export type LightboxSource = { src: string; srcSet?: string };
export type LightboxItem = {
  light: LightboxSource;
  /** Solo en capturas con versión oscura. */
  dark?: LightboxSource;
  alt: string;
  caption: string;
  w: number;
  h: number;
  /** Figuras de matplotlib: fondo blanco en ambos temas. */
  white?: boolean;
};
export type LightboxLabels = { open: string; close: string; prev: string; next: string; counter: string; dialog: string };

const OpenCtx = createContext<{ open: (i: number, from: HTMLButtonElement) => void; label: string } | null>(null);

export function LightboxGroup({ items, labels, children }: { items: LightboxItem[]; labels: LightboxLabels; children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const many = items.length > 1;

  const open = useCallback((i: number, from: HTMLButtonElement) => {
    opener.current = from;
    setIndex(i);
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const go = useCallback((step: number) => setIndex((i) => (i + step + items.length) % items.length), [items.length]);

  // Al cerrar (Esc, botón o fondo): se libera el scroll y el foco vuelve al botón que abrió el visor.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      document.documentElement.style.overflow = "";
      opener.current?.focus();
    };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!many) return;
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };

  const it = items[index];
  const navBtn =
    "grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20";
  const img = (s: LightboxSource, cls: string) => (
    <img
      src={s.src}
      srcSet={s.srcSet}
      sizes={s.srcSet ? "100vw" : undefined}
      alt={it.alt}
      width={it.w}
      height={it.h}
      className={`${cls} h-auto max-h-[calc(100dvh-14rem)] sm:max-h-[calc(100dvh-11rem)] w-auto max-w-full object-contain`}
    />
  );

  return (
    <OpenCtx.Provider value={{ open, label: labels.open }}>
      {children}
      <dialog
        ref={dialog}
        aria-label={labels.dialog}
        onKeyDown={onKeyDown}
        // Clic en el fondo: el destino es el propio <dialog>, que ocupa toda la pantalla.
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-black p-0 text-white backdrop:bg-transparent"
      >
        <div className="pointer-events-none flex h-full flex-col">
          <div className="pointer-events-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <p className="text-[14px] tabular-nums text-white/70" aria-live="polite">
              {many ? labels.counter.replace("{i}", String(index + 1)).replace("{n}", String(items.length)) : ""}
            </p>
            <button
              type="button"
              autoFocus
              onClick={() => dialog.current?.close()}
              className="rounded-full bg-white/10 px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-white/20"
            >
              {labels.close}
            </button>
          </div>
          {/* En móvil la imagen ocupa todo el ancho y las flechas bajan a una fila propia. */}
          <div className="flex min-h-0 flex-1 flex-wrap content-center items-center justify-center gap-3 px-3 sm:flex-nowrap sm:px-6">
            {many && (
              <button type="button" onClick={() => go(-1)} className={`pointer-events-auto ${navBtn}`}>
                <ChevronLeft c="size-5" />
                <span className="sr-only">{labels.prev}</span>
              </button>
            )}
            <figure className="pointer-events-auto order-first flex w-full min-w-0 flex-col items-center sm:order-none sm:w-auto">
              <div className={`overflow-hidden rounded-xl ${it.white ? "bg-white p-2 sm:p-4" : ""}`}>
                {it.dark ? (
                  <>
                    {img(it.light, "only-light")}
                    {img(it.dark, "only-dark")}
                  </>
                ) : (
                  img(it.light, "block")
                )}
              </div>
              <figcaption className="mt-3 max-w-[48rem] px-2 text-center text-[14px] leading-snug text-white/75">{it.caption}</figcaption>
            </figure>
            {many && (
              <button type="button" onClick={() => go(1)} className={`pointer-events-auto ${navBtn}`}>
                <ChevronRight c="size-5" />
                <span className="sr-only">{labels.next}</span>
              </button>
            )}
          </div>
        </div>
      </dialog>
    </OpenCtx.Provider>
  );
}

/** Botón que envuelve una imagen y abre el visor en la posición `index` de su galería. */
export function ZoomTrigger({ index, alt, children }: { index: number; alt: string; children: React.ReactNode }) {
  const ctx = useContext(OpenCtx);
  if (!ctx) return <>{children}</>;
  return (
    <button
      type="button"
      onClick={(e) => ctx.open(index, e.currentTarget)}
      aria-label={`${ctx.label}: ${alt}`}
      aria-haspopup="dialog"
      className="group relative block w-full cursor-zoom-in rounded-2xl text-left"
    >
      {children}
      {/* Indicación sutil: aparece al pasar el cursor o con el foco del teclado. */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-black/55 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 4h6v6M10 20H4v-6M20 4l-6.5 6.5M4 20l6.5-6.5" />
        </svg>
      </span>
    </button>
  );
}
