import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/Chrome";
import { FontPreload, UmamiScript } from "@/components/RootHtml";
import { Footer } from "@/components/Home";
import { ChevronRight } from "@/components/Icons";
import { NotFoundLangToggle } from "@/components/NotFound";
import { NOT_FOUND } from "@/lib/content";
import { type Lang, homePath, projectPath, sectionPath, tx } from "@/lib/i18n";
import { PROJECTS } from "@/lib/projects";
import { container } from "@/lib/ui";

/**
 * 404 propio. El sitio tiene dos layouts raíz (es / en) y ninguno común, así que Next usa
 * este archivo (experimental.globalNotFound) para generar out/404.html, que Vercel sirve en
 * cualquier ruta inexistente. Lleva los dos idiomas: un script antes de pintar elige el de la
 * URL (/en/... → inglés) y el botón del encabezado permite cambiarlo.
 */
export const metadata: Metadata = {
  title: NOT_FOUND.meta,
  robots: { index: false },
};

const HEAD_SCRIPT = [
  `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`,
  `if(/^\\/en(\\/|$)/.test(location.pathname)){document.documentElement.dataset.lang='en';document.documentElement.lang='en'}`,
].join(";");

function View({ l }: { l: Lang }) {
  const T = NOT_FOUND;
  const btn = "inline-flex items-center rounded-full px-6 py-3 text-[15px] font-medium transition-opacity hover:opacity-80";
  return (
    <>
      <main className={`${container} pt-32 pb-24 md:pt-40`}>
        <p className="text-[14px] font-semibold text-sub tabular-nums">{T.code[l]}</p>
        <h1 className="mt-3 max-w-[40rem] text-[2.75rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[4rem]">{T.title[l]}</h1>
        <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-sub">{T.body[l]}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={homePath(l)} className={`${btn} bg-ink text-page`}>
            {T.home[l]}
          </a>
          <a href={sectionPath(l, "contact")} className={`${btn} bg-soft text-ink`}>
            {T.contact[l]}
          </a>
        </div>

        <section aria-labelledby={`cases-${l}`} className="mt-20">
          <h2 id={`cases-${l}`} className="text-[1.375rem] font-bold tracking-[-0.025em]">
            {T.cases[l]}
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <li key={p.slug}>
                <a
                  href={projectPath(l, p.slug)}
                  className="group flex h-full flex-col rounded-2xl bg-tile p-5 ring-1 ring-hair transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                >
                  <span className="text-[13px] font-semibold text-sub">{p.tag[l]}</span>
                  <span className="mt-1 flex items-center justify-between gap-3 text-[17px] font-semibold tracking-[-0.015em]">
                    {tx(p.name, l)}
                    <ChevronRight c="size-4 shrink-0 text-mute transition-transform motion-safe:group-hover:translate-x-0.5" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer l={l} page="404" />
    </>
  );
}

export default function GlobalNotFound() {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
        <FontPreload />
        <UmamiScript />
      </head>
      <body id="top" className="font-sans">
        <header className="fixed inset-x-0 top-0 z-50 border-b border-hair bg-page/80 backdrop-blur-xl backdrop-saturate-150">
          <div className={`${container} flex h-14 items-center justify-between gap-4`}>
            <Link href={homePath("es")} className="only-es text-[15px] font-semibold tracking-[-0.01em]">
              Jose Romo
            </Link>
            <Link href={homePath("en")} className="only-en text-[15px] font-semibold tracking-[-0.01em]">
              Jose Romo
            </Link>
            <div className="flex items-center gap-1.5">
              <NotFoundLangToggle />
              <div className="only-es">
                <ThemeToggle l="es" className="grid size-8 place-items-center rounded-full text-sub2 transition-colors hover:bg-ink/[0.06] hover:text-ink" />
              </div>
              <div className="only-en">
                <ThemeToggle l="en" className="grid size-8 place-items-center rounded-full text-sub2 transition-colors hover:bg-ink/[0.06] hover:text-ink" />
              </div>
            </div>
          </div>
        </header>
        <div className="only-es">
          <View l="es" />
        </div>
        <div className="only-en" lang="en">
          <View l="en" />
        </div>
      </body>
    </html>
  );
}
