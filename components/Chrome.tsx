"use client";

/**
 * Piezas interactivas compartidas: encabezado (navegación, idioma, tema),
 * sugerencia de idioma y botón de copiar correo.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { UI } from "@/lib/content";
import { homePath, sectionPath, type Lang } from "@/lib/i18n";
import { container } from "@/lib/ui";
import { ChevronRight, Moon, Sun } from "./Icons";


function ThemeToggle({ l }: { l: Lang }) {
  const toggle = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = current === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      className="grid size-8 place-items-center rounded-full text-sub2 transition-colors hover:bg-ink/[0.06] hover:text-ink"
    >
      {/* Los íconos y etiquetas se intercambian con CSS, sin parpadeo ni estado */}
      <span className="only-light">
        <Moon />
        <span className="sr-only">{UI.nav.themeToDark[l]}</span>
      </span>
      <span className="only-dark">
        <Sun />
        <span className="sr-only">{UI.nav.themeToLight[l]}</span>
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

export function SiteHeader({ l, altHref, onHome = false }: { l: Lang; altHref: string; onHome?: boolean }) {
  const href = (id: string) => (onHome ? `#${id}` : sectionPath(l, id));
  const [open, setOpen] = useState(false);
  const active = useActiveSection(onHome);
  const items = NAV_IDS.map((id) => [id, UI.nav[id]] as const);

  // El menú móvil se cierra con Escape y al pasar a escritorio.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const remember = () => {
    try {
      localStorage.setItem("lang", l === "es" ? "en" : "es");
    } catch {}
  };
  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b border-hair backdrop-blur-xl backdrop-saturate-150 ${open ? "bg-page shadow-[0_12px_30px_rgba(0,0,0,0.12)]" : "bg-page/80"}`}>
      <div className={`${container} flex h-14 items-center justify-between gap-4`}>
        <Link href={homePath(l)} className="text-[15px] font-semibold tracking-[-0.01em]">
          Jose Romo
        </Link>
        <nav aria-label={UI.nav.main[l]} className="hidden md:block">
          <ul className="flex items-center gap-8 text-[13px] text-sub2">
            {items.map(([id, label]) => (
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
          <Link
            href={altHref}
            onClick={remember}
            hrefLang={l === "es" ? "en" : "es"}
            className="rounded-full px-2.5 py-1 text-[12px] font-semibold text-sub2 transition-colors hover:bg-ink/[0.06] hover:text-ink"
          >
            <span aria-hidden>{UI.nav.langShort[l]}</span>
            <span className="sr-only">{UI.nav.langLabel[l]}</span>
          </Link>
          <ThemeToggle l={l} />
          <a
            href={href("contact")}
            className="ml-1 hidden rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-page transition-opacity hover:opacity-80 sm:inline-block"
          >
            {UI.nav.contact[l]}
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid size-8 place-items-center rounded-full text-sub2 transition-colors hover:bg-ink/[0.06] hover:text-ink md:hidden"
          >
            <MenuIcon open={open} />
            <span className="sr-only">{open ? UI.nav.menuClose[l] : UI.nav.menuOpen[l]}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label={UI.nav.main[l]} className="border-t border-hair md:hidden">
          <ul className={`${container} py-2`}>
            {[...items, ["contact", UI.nav.contact] as const].map(([id, label]) => (
              <li key={id}>
                <a
                  href={href(id)}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "true" : undefined}
                  className="flex items-center justify-between border-b border-hair py-3.5 text-[17px] font-medium text-sub2 last:border-0 aria-[current]:text-ink"
                >
                  {label[l]}
                  <ChevronRight c="size-4 text-mute" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
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
    <div lang="en" className="fixed inset-x-0 top-14 z-40 border-b border-hair bg-tile">
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

export function CopyEmail({ email, label, done }: { email: string; label: string; done: string }) {
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
      <button type="button" onClick={copy} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
        {copied ? done : label}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? done : ""}
      </span>
    </>
  );
}
