import Link from "next/link";
import { container } from "@/lib/ui";
import { type Lang, projectPath, sectionPath, tx } from "@/lib/i18n";
import { CASE_UI, PROJECTS, type Project, type Table } from "@/lib/projects";
import { LangSuggest, SiteHeader } from "./Chrome";
import { Contact, Footer, SkipLink, TextLink } from "./Home";
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
      <h2 id={id} className="mb-8 text-[1.75rem] font-bold leading-tight tracking-[-0.03em] md:text-[2rem]">
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
    <div className="overflow-x-auto rounded-2xl bg-tile ring-1 ring-hair">
      <table className={`w-full border-collapse text-left text-[14px] sm:text-[15px] ${t.head.length > 3 ? "min-w-[32rem]" : ""}`}>
        <thead>
          <tr className="border-b border-hair">
            {t.head.map((h, i) => (
              <th key={i} scope="col" className={`px-3 py-3.5 text-[13px] font-semibold text-sub sm:px-5 ${i > 0 ? "text-right" : ""}`}>
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
                  <td key={ci} className="px-3 py-3.5 text-right tabular-nums text-sub2 sm:px-5">
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
            <nav aria-label={l === "es" ? "Ruta" : "Breadcrumb"}>
              <Link href={sectionPath(l, "projects")} className="inline-flex items-center gap-1 text-[14px] font-medium text-link hover:underline hover:underline-offset-4">
                <ChevronLeft c="size-3.5" /> {U.back[l]}
              </Link>
            </nav>
            <p className="mt-10 text-[14px] font-semibold text-sub">{p.tag[l]}</p>
            <h1 className="mt-3 text-[3rem] font-bold leading-[0.98] tracking-[-0.04em] sm:text-[4.5rem] lg:text-[5.5rem]">{name}</h1>
            <p className="mt-6 max-w-[46rem] text-[1.375rem] font-medium leading-snug tracking-[-0.015em] text-sub sm:text-[1.6rem]">{p.lede[l]}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              {p.links.demo && (
                <a href={p.links.demo} target="_blank" rel="noreferrer" {...umamiEvent("demo-open", { page: "case-study", project: p.slug })} className="inline-flex items-center gap-1.5 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-page transition-opacity hover:opacity-80">
                  {U.demo[l]} <ArrowUpRight />
                </a>
              )}
              <a
                href={p.links.repo}
                {...umamiEvent("repo-open", { page: "case-study", project: p.slug })}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium transition-colors ${p.links.demo ? "bg-soft text-ink hover:bg-soft-hover" : "bg-ink text-page hover:opacity-80"}`}
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

            <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-hair ring-1 ring-hair sm:grid-cols-2 lg:grid-cols-[1.2fr_0.6fr_0.9fr_1.6fr]">
              {[
                [U.meta.role, p.role[l]],
                [U.meta.year, p.year],
                [U.meta.status, p.status[l]],
              ].map(([k, v]) => (
                <div key={(k as { en: string }).en} className="bg-page p-5">
                  <dt className="text-[12px] font-semibold text-sub">{(k as { es: string; en: string })[l]}</dt>
                  <dd className="mt-1 text-[15px] font-medium leading-snug">{v as string}</dd>
                </div>
              ))}
              <div className="bg-page p-5 sm:col-span-2 lg:col-span-1">
                <dt className="text-[12px] font-semibold text-sub">{U.meta.stack[l]}</dt>
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
            <dl className={`grid grid-cols-2 gap-3 md:gap-4 ${p.metrics.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
              {p.metrics.map((m) => (
                <div key={m.label.en} className="rounded-3xl bg-tile px-6 py-6 ring-1 ring-hair">
                  <dt className="sr-only">{m.label[l]}</dt>
                  <dd>
                    <span className="block whitespace-nowrap text-[1.75rem] font-bold leading-none tracking-[-0.04em] tabular-nums md:text-[2.25rem]">{m.value[l]}</span>
                    <span className="mt-2 block text-[14px] leading-snug text-sub">{m.label[l]}</span>
                  </dd>
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
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.built.map((b) => (
                  <li key={b.title.en} className="rounded-2xl bg-tile p-6 ring-1 ring-hair">
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
                        <span className="mt-[11px] size-1 shrink-0 rounded-full bg-mute" aria-hidden />
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

            <section className="grid gap-4 border-t border-hair py-14 md:grid-cols-2 md:py-20">
              {(
                [
                  ["learned", S.learned, p.learned],
                  ["next", S.next, p.next],
                ] as const
              ).map(([id, title, items]) => (
                <div key={id} className="rounded-3xl bg-tile p-7 ring-1 ring-hair md:p-8" aria-labelledby={id} role="region">
                  <h2 id={id} className="text-[1.375rem] font-bold tracking-[-0.025em]">
                    {title[l]}
                  </h2>
                  <ul className="mt-4 space-y-3 text-[15px] leading-relaxed text-sub2">
                    {items.map((x) => (
                      <li key={x.en} className="flex gap-3">
                        <span className="mt-[10px] size-1 shrink-0 rounded-full bg-mute" aria-hidden />
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
              <Link href={projectPath(l, next.slug)} className="group block rounded-3xl bg-tile p-8 ring-1 ring-hair transition-[transform,box-shadow] duration-300 motion-safe:hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] md:p-10">
                <p className="text-[13px] font-semibold text-sub">{U.nextProject[l]}</p>
                <p className="mt-2 flex items-center justify-between gap-4 text-[2rem] font-bold leading-tight tracking-[-0.03em] md:text-[2.75rem]">
                  {tx(next.name, l)}
                  <ChevronRight c="size-7 shrink-0 text-sub transition-transform group-hover:translate-x-1" />
                </p>
                <p className="mt-2 max-w-[40rem] text-[16px] leading-relaxed text-sub">{next.lede[l]}</p>
              </Link>
            </nav>
          </div>
        </article>
        <Contact l={l} title={U.talk[l]} body={U.talkBody[l]} page="case-study" />
      </main>
      <Footer l={l} page="case-study" />
    </>
  );
}

