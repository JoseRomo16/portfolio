"use client";

/**
 * Piezas interactivas compartidas: encabezado (navegación, idioma, tema),
 * sugerencia de idioma y botón de copiar correo.
 */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { UI } from "@/lib/content";
import { homePath, sectionPath, type Lang } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { type UmamiProps, track } from "@/lib/analytics";
import { ChevronRight, Moon, Sun } from "./Icons";


function toggleTheme() {
  const root = document.documentElement;
  const current = root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {}
}

/** Botón de tema. Los íconos y etiquetas se intercambian con CSS, sin parpadeo ni estado. */
export function ThemeToggle({ l, withLabel = false, className = "" }: { l: Lang; withLabel?: boolean; className?: string }) {
  // Con etiqueta visible se usa la corta ("Tema oscuro"); sin ella, la completa solo para lectores de pantalla.
  const label = (long: "themeToDark" | "themeToLight", short: "themeDark" | "themeLight") =>
    withLabel ? <span>{UI.nav[short][l]}</span> : <span className="sr-only">{UI.nav[long][l]}</span>;
  // .only-light/.only-dark cambian el display, así que el flex va en un span interno.
  return (
    <button type="button" onClick={toggleTheme} data-testid="theme-toggle" className={className}>
      <span className="only-light">
        <span className="inline-flex items-center justify-center gap-2">
          <Moon />
          {label("themeToDark", "themeDark")}
        </span>
      </span>
      <span className="only-dark">
        <span className="inline-flex items-center justify-center gap-2">
          <Sun />
          {label("themeToLight", "themeLight")}
        </span>
      </span>
    </button>
  );
}

const NAV_IDS = ["projects", "experience", "skills", "education"] as const;

/** Resalta en la navegación la sección que se está leyendo (solo en el inicio). */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled || !("IntersectionObserver" in window)) return;
    const sections = [...NAV_IDS, "contact"]
      .map((id) => document.getElementById(id)?.closest("section"))
      .filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.querySelector("[id]")?.id ?? null);
        }
      },
      // Una franja horizontal cerca del tercio superior de la pantalla decide qué sección está activa.
      { rootMargin: "-30% 0px -65% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

const iconBtn = "grid size-8 place-items-center rounded-full text-sub2 transition-colors hover:bg-ink/[0.06] hover:text-ink";

export function SiteHeader({ l, altHref, onHome = false }: { l: Lang; altHref: string; onHome?: boolean }) {
  const href = (id: string) => (onHome ? `#${id}` : sectionPath(l, id));
  const [open, setOpen] = useState(false);
  const active = useActiveSection(onHome);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const items = [...NAV_IDS, "contact" as const].map((id) => [id, UI.nav[id]] as const);
  const other: Lang = l === "es" ? "en" : "es";

  // Menú móvil abierto: Esc lo cierra (y devuelve el foco al botón), pasar a escritorio lo cierra
  // y el fondo no se desplaza.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      menuBtn.current?.focus();
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const remember = () => {
    try {
      localStorage.setItem("lang", other);
    } catch {}
  };
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b border-hair backdrop-blur-xl backdrop-saturate-150 ${open ? "bg-page" : "bg-page/80"}`}>
        <div className={`${container} flex h-14 items-center justify-between gap-4`}>
          <Link href={homePath(l)} className="text-[15px] font-semibold tracking-[-0.01em]">
            Jose Romo
          </Link>
          <nav aria-label={UI.nav.main[l]} className="hidden md:block">
            <ul className="flex items-center gap-8 text-[13px] text-sub2">
              {items.slice(0, -1).map(([id, label]) => (
                <li key={id}>
                  <a
                    href={href(id)}
                    aria-current={active === id ? "true" : undefined}
                    className="transition-colors hover:text-ink aria-[current]:font-medium aria-[current]:text-ink"
                  >
                    {label[l]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-1.5">
            {/* En móvil, idioma y tema viven dentro del menú. */}
            <Link
              href={altHref}
              onClick={remember}
              hrefLang={other}
              data-testid="lang-switch"
              className="hidden rounded-full px-2.5 py-1 text-[12px] font-semibold text-sub2 transition-colors hover:bg-ink/[0.06] hover:text-ink md:inline-block"
            >
              <span aria-hidden>{UI.nav.langShort[l]}</span>
              <span className="sr-only">{UI.nav.langLabel[l]}</span>
            </Link>
            <ThemeToggle l={l} className={`${iconBtn} hidden md:grid`} />
            <a
              href={href("contact")}
              className="ml-1 hidden rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-page transition-opacity hover:opacity-80 md:inline-block"
            >
              {UI.nav.contact[l]}
            </a>
            <button
              ref={menuBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className={`${iconBtn} md:hidden`}
            >
              <MenuIcon open={open} />
              <span className="sr-only">{open ? UI.nav.menuClose[l] : UI.nav.menuOpen[l]}</span>
            </button>
          </div>
        </div>
        <div id="mobile-nav" hidden={!open} className="border-t border-hair md:hidden">
          <nav aria-label={UI.nav.main[l]} className={`${container} pt-2`}>
            <ul>
              {items.map(([id, label]) => (
                <li key={id} className="border-b border-hair">
                  <a
                    href={href(id)}
                    onClick={() => setOpen(false)}
                    aria-current={active === id ? "true" : undefined}
                    className="flex items-center justify-between py-3.5 text-[17px] font-medium text-sub2 aria-[current]:text-ink"
                  >
                    {label[l]}
                    <ChevronRight c="size-4 text-mute" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={`${container} grid grid-cols-2 gap-2 py-4 text-[15px] font-medium`}>
            <Link
              href={altHref}
              onClick={remember}
              hrefLang={other}
              lang={other}
              className="rounded-full bg-soft px-4 py-3 text-center text-ink transition-colors hover:bg-soft-hover"
            >
              {UI.nav.langName[l]}
            </Link>
            <ThemeToggle l={l} withLabel className="rounded-full bg-soft px-4 py-3 text-ink transition-colors hover:bg-soft-hover" />
          </div>
        </div>
      </header>
      {/* Fondo del menú móvil: tocar fuera lo cierra. */}
      {open && <div aria-hidden className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setOpen(false)} />}
    </>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
      {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  );
}

/** En páginas en español, ofrece la versión en inglés a quien tenga el navegador en otro idioma. */
export function LangSuggest({ l, altHref }: { l: Lang; altHref: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (l !== "es") return;
    try {
      if (localStorage.getItem("lang") || sessionStorage.getItem("lang-suggest-closed")) return;
    } catch {}
    if (!navigator.language.toLowerCase().startsWith("es")) setShow(true);
  }, [l]);
  if (!show) return null;
  const close = () => {
    setShow(false);
    try {
      sessionStorage.setItem("lang-suggest-closed", "1");
    } catch {}
  };
  return (
    <div lang="en" role="region" aria-label={UI.langSuggest.label} className="fixed inset-x-0 top-14 z-40 border-b border-hair bg-tile">
      <div className={`${container} flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2.5 text-[14px]`}>
        <p className="text-sub2">{UI.langSuggest.text}</p>
        <div className="flex items-center gap-4">
          <Link
            href={altHref}
            onClick={() => {
              try {
                localStorage.setItem("lang", "en");
              } catch {}
            }}
            className="font-medium text-link hover:underline hover:underline-offset-4"
          >
            {UI.langSuggest.cta}
          </Link>
          <button type="button" onClick={close} className="text-sub hover:text-ink">
            {UI.langSuggest.close}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CopyEmail({ email, label, done, track: trackAttrs }: { email: string; label: string; done: string; track?: Record<string, string> }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };
  return (
    <>
      <button type="button" onClick={copy} {...trackAttrs} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
        {copied ? done : label}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? done : ""}
      </span>
    </>
  );
}

/**
 * Enlace de descarga del CV que registra "cv-download" con track(). No usa data-umami-event
 * porque Umami cancelaría el clic y navegaría al PDF, anulando el atributo download.
 */
export function CvLink({ href, page, className, children }: { href: string; page: UmamiProps["page"]; className?: string; children: React.ReactNode }) {
  return (
    <a href={href} download onClick={() => track("cv-download", { page })} className={className}>
      {children}
    </a>
  );
}
