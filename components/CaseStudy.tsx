import Link from "next/link";
import { container } from "@/lib/ui";
import { type Lang, projectPath, sectionPath, tx } from "@/lib/i18n";
import { CASE_UI, PROJECTS, type Project, type Table } from "@/lib/projects";
import { LangSuggest, SiteHeader } from "./Chrome";
import { Contact, Footer, SkipLink, TextLink, btnPrimary, btnSecondary, label, metricCell } from "./Home";
import { ArrowUpRight, ChevronLeft, ChevronRight, GitHub } from "./Icons";
import { umamiEvent } from "@/lib/analytics";
import { CaseToc } from "./CaseToc";
import { VisualBlock } from "./Visuals";

/**
 * Sección del caso: título en línea, encima del contenido. En escritorio la columna izquierda
 * la ocupa el índice "En esta página" (CaseToc), que ya nombra cada sección y marca la activa.
 */
function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-hair py-14 first:border-t-0 first:pt-0 md:py-20 md:first:pt-0">
      <h2 id={id} className="mb-8 font-display text-[2rem] font-medium leading-tight tracking-[-0.01em] md:text-[2.4rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}

const Prose = ({ items, l }: { items: { es: string; en: string }[]; l: Lang }) => (
  <div className="max-w-[44rem] space-y-4 text-[17px] leading-relaxed text-sub2">
    {items.map((p) => (
      <p key={p.en}>{p[l]}</p>
    ))}
  </div>
);

function DataTable({ t, l }: { t: Table; l: Lang }) {
  return (
    // En móvil la tabla puede desplazarse en horizontal: el contenedor recibe foco para hacerlo con el teclado.
    <div tabIndex={0} role="region" aria-label={CASE_UI.table[l]} className="overflow-x-auto rounded-lg bg-tile ring-1 ring-hair">
      <table className={`w-full border-collapse text-left text-[14px] sm:text-[15px] ${t.head.length > 3 ? "min-w-[32rem]" : ""}`}>
        <thead>
          <tr className="border-b border-hair">
            {t.head.map((h, i) => (
              <th key={i} scope="col" className={`px-3 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-sub sm:px-5 ${i > 0 ? "text-right" : ""}`}>
                {/* Un encabezado vacío no se anuncia: los lectores de pantalla reciben "Métrica". */}
                {tx(h, l) || <span className="sr-only">{CASE_UI.metric[l]}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t.rows.map((r, ri) => (
            <tr key={ri} className="border-b border-hair last:border-b-0">
              {r.map((c, ci) =>
                ci === 0 ? (
                  <th key={ci} scope="row" className="px-3 py-3.5 font-medium sm:px-5">
                    {tx(c, l)}
                  </th>
                ) : (
                  <td key={ci} className="px-3 py-3.5 text-right font-mono text-[13px] text-sub2 sm:px-5 sm:text-[14px]">
                    {tx(c, l)}
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {t.note && <p className="border-t border-hair px-5 py-3 text-[13px] text-sub">{t.note[l]}</p>}
    </div>
  );
}

export function CaseStudyPage({ p, l }: { p: Project; l: Lang }) {
  const U = CASE_UI;
  const S = U.sections;
  const i = PROJECTS.findIndex((x) => x.slug === p.slug);
  const next = PROJECTS[(i + 1) % PROJECTS.length];
  const alt = projectPath(l === "es" ? "en" : "es", p.slug);
  const name = tx(p.name, l);
  // Índice: solo las secciones que existen en este caso, en el orden de la página.
  const toc = (["problem", "built", "decisions", "results", "limits", "learned", "next"] as const)
    .filter((id) => id !== "limits" || p.limits)
    .map((id) => ({ id, label: S[id][l] }));

  return (
    <>
      <SkipLink l={l} target="#case" />
      <SiteHeader l={l} altHref={alt} />
      <LangSuggest l={l} altHref={alt} />
      <main id="case" tabIndex={-1} className="outline-none">
        <article>
          {/* Encabezado */}
          <header className={`${container} pt-28 md:pt-36`}>
            <nav aria-label={U.breadcrumb[l]}>
              <Link href={sectionPath(l, "projects")} className="inline-flex items-center gap-1 text-[14px] font-medium text-link hover:underline hover:underline-offset-4">
                <ChevronLeft c="size-3.5" /> {U.back[l]}
              </Link>
            </nav>
            <p className={`mt-10 ${label}`}>{p.tag[l]}</p>
            <h1 className="mt-4 font-display text-[3.25rem] font-medium leading-[0.98] tracking-[-0.02em] sm:text-[4.75rem] lg:text-[6rem]">{name}</h1>
            <p className="mt-6 max-w-[46rem] text-[1.375rem] font-medium leading-snug tracking-[-0.015em] text-sub sm:text-[1.6rem]">{p.lede[l]}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {p.links.demo && (
                <a href={p.links.demo} target="_blank" rel="noreferrer" {...umamiEvent("demo-open", { page: "case-study", project: p.slug })} className={btnPrimary}>
                  {U.demo[l]} <ArrowUpRight />
                </a>
              )}
              <a
                href={p.links.repo}
                {...umamiEvent("repo-open", { page: "case-study", project: p.slug })}
                target="_blank"
                rel="noreferrer"
                className={p.links.demo ? btnSecondary : btnPrimary}
              >
                <GitHub /> {U.code[l]}
              </a>
              {p.links.extra?.map((x) => (
                <TextLink key={x.href} href={x.href}>
                  {x.label[l]}
                </TextLink>
              ))}
            </div>
            {p.links.demoNote && <p className="mt-3 text-[13px] text-sub">{p.links.demoNote[l]}</p>}

            <dl className="mt-12 grid gap-x-8 border-t border-hair sm:grid-cols-2 lg:grid-cols-[1.2fr_0.5fr_0.9fr_1.7fr]">
              {[
                [U.meta.role, p.role[l]],
                [U.meta.year, p.year],
                [U.meta.status, p.status[l]],
              ].map(([k, v]) => (
                <div key={(k as { en: string }).en} className="border-b border-hair py-4 lg:border-b-0">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-sub">{(k as { es: string; en: string })[l]}</dt>
                  <dd className="mt-1 text-[15px] font-medium leading-snug">{v as string}</dd>
                </div>
              ))}
              <div className="py-4 sm:col-span-2 lg:col-span-1">
                <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-sub">{U.meta.stack[l]}</dt>
                <dd className="mt-1 text-[15px] font-medium leading-snug">{p.stack.join(", ")}</dd>
              </div>
            </dl>
          </header>

          {/* Visual principal */}
          <div className={`${container} mt-12 md:mt-16`}>
            <VisualBlock v={p.hero} l={l} priority />
          </div>

          {/* Cifras */}
          <div className={`${container} mt-12`}>
            <dl className={`grid border-y border-hair sm:grid-cols-2 ${p.metrics.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {p.metrics.map((m) => (
                <div key={m.label.en} className={`${metricCell} border-hair py-6 max-sm:border-b max-sm:last:border-b-0 sm:px-6 sm:[&:not(:first-child)]:border-l sm:max-lg:[&:nth-child(3)]:border-l-0 sm:max-lg:[&:nth-child(3)]:pl-0 sm:first:pl-0`}>
                  <dt className="order-2 mt-3 text-[14px] leading-snug text-sub2">{m.label[l]}</dt>
                  <dd className="order-1 whitespace-nowrap font-mono text-[1.75rem] font-medium leading-none tracking-[-0.02em] text-accent md:text-[2.1rem]">{m.value[l]}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={`${container} mt-16 md:mt-24 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12`}>
            <aside className="hidden lg:block">
              <CaseToc title={U.toc[l]} items={toc} />
            </aside>
            <div className="min-w-0">
            <Block id="problem" title={S.problem[l]}>
              <Prose items={p.problem} l={l} />
            </Block>

            <Block id="built" title={S.built[l]}>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {p.built.map((b) => (
                  <li key={b.title.en} className="border-t border-hair pt-5 pb-7">
                    <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{b.title[l]}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-sub">{b.body[l]}</p>
                  </li>
                ))}
              </ul>
              {p.builtVisual && (
                <div className="mt-10">
                  <VisualBlock v={p.builtVisual} l={l} />
                </div>
              )}
            </Block>

            <Block id="decisions" title={S.decisions[l]}>
              <ul className="divide-y divide-hair">
                {p.decisions.map((d) => (
                  <li key={d.title.en} className="py-6 first:pt-0 last:pb-0">
                    <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{d.title[l]}</h3>
                    <p className="mt-2 max-w-[44rem] text-[16px] leading-relaxed text-sub">{d.body[l]}</p>
                    {d.source && (
                      <a href={d.source.href} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-[14px] font-medium text-link hover:underline hover:underline-offset-4">
                        {d.source.label} <ArrowUpRight />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </Block>

            <Block id="results" title={S.results[l]}>
              <div className="space-y-10">
                {p.results.intro && <Prose items={p.results.intro} l={l} />}
                {p.results.visual && <VisualBlock v={p.results.visual} l={l} />}
                {p.results.table && <DataTable t={p.results.table} l={l} />}
                {p.results.points && (
                  <ul className="max-w-[44rem] space-y-3 text-[16px] leading-relaxed text-sub2">
                    {p.results.points.map((x) => (
                      <li key={x.en} className="flex gap-3">
                        <span className="mt-[12px] h-px w-3 shrink-0 bg-mute" aria-hidden />
                        {x[l]}
                      </li>
                    ))}
                  </ul>
                )}
                {p.results.charts && <VisualBlock v={p.results.charts} l={l} />}
                {p.results.gallery && <VisualBlock v={p.results.gallery} l={l} />}
              </div>
            </Block>

            {p.limits && (
              <Block id="limits" title={S.limits[l]}>
                <Prose items={p.limits} l={l} />
              </Block>
            )}

            <section className="grid gap-x-12 gap-y-10 border-t border-hair py-14 md:grid-cols-2 md:py-20">
              {(
                [
                  ["learned", S.learned, p.learned],
                  ["next", S.next, p.next],
                ] as const
              ).map(([id, title, items]) => (
                <div key={id} aria-labelledby={id} role="region">
                  <h2 id={id} className="font-display text-[1.75rem] font-medium tracking-[-0.01em]">
                    {title[l]}
                  </h2>
                  <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-sub2">
                    {items.map((x) => (
                      <li key={x.en} className="flex gap-3">
                        <span className="mt-[11px] h-px w-3 shrink-0 bg-mute" aria-hidden />
                        {x[l]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            </div>
          </div>

          <div className={container}>
            {/* Siguiente proyecto */}
            <nav aria-label={U.nextProject[l]} className="border-t border-hair py-14 md:py-20">
              <Link href={projectPath(l, next.slug)} className="group block">
                <p className={label}>{U.nextProject[l]}</p>
                <p className="mt-4 flex items-center justify-between gap-4 font-display text-[2.5rem] font-medium leading-tight tracking-[-0.015em] group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[6px] md:text-[3.5rem]">
                  {tx(next.name, l)}
                  <ChevronRight c="size-7 shrink-0 text-sub transition-transform group-hover:translate-x-1" />
                </p>
                <p className="mt-2 max-w-[40rem] text-[16px] leading-relaxed text-sub">{next.lede[l]}</p>
              </Link>
            </nav>
          </div>
        </article>
        <Contact l={l} body={U.talkBody[l]} page="case-study" />
      </main>
      <Footer l={l} page="case-study" />
    </>
  );
}

