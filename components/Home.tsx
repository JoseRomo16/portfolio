import Link from "next/link";
import { CERTS, DEGREES, EXPERIENCE, HERO, LINKS, NOW, SECTIONS, SKILLS, STATS, UI } from "@/lib/content";
import { container } from "@/lib/ui";
import { type Lang, homePath, projectPath, tx } from "@/lib/i18n";
import { CASE_UI, EXTRA_PROJECTS, PROJECTS, getProject } from "@/lib/projects";
import { CopyEmail, CvLink, LangSuggest, SiteHeader } from "./Chrome";
import { type UmamiProps, umamiEvent } from "@/lib/analytics";
import { ArrowUpRight, ChevronRight, Download, GitHub, LinkedIn, Mail, WhatsApp } from "./Icons";
import { BnplMini, Img } from "./Visuals";
import { SIZES } from "@/lib/images";

export const tile =
  "rounded-3xl bg-tile ring-1 ring-hair transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]";

export function SectionHeader({ id, title, lead, aside }: { id: string; title: string; lead?: string; aside?: React.ReactNode }) {
  return (
    <header className="mb-12 flex flex-wrap items-end justify-between gap-x-8 gap-y-3 md:mb-16">
      <div className="max-w-[42rem]">
        <h2 id={id} className="text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] md:text-[3.5rem]">
          {title}
        </h2>
        {lead && <p className="mt-4 text-xl leading-snug tracking-[-0.01em] text-sub md:text-2xl">{lead}</p>}
      </div>
      {aside}
    </header>
  );
}

export function Chips({ items, l }: { items: (string | { es: string; en: string })[]; l: Lang }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <li key={tx(it, "en")} className="rounded-full bg-card px-2.5 py-1 text-[13px] font-medium text-sub2 ring-1 ring-hair">
          {tx(it, l)}
        </li>
      ))}
    </ul>
  );
}

export function TextLink({ href, children, external = true, track }: { href: string; children: React.ReactNode; external?: boolean; track?: Record<string, string> }) {
  const cls = "relative z-10 inline-flex items-center gap-1 text-[15px] font-medium text-link hover:underline hover:underline-offset-4";
  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={cls} {...track}>
      {children}
      <ArrowUpRight />
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      <ChevronRight c="size-3.5" />
    </Link>
  );
}

const Tag = ({ children }: { children: React.ReactNode }) => <p className="text-[13px] font-semibold text-sub">{children}</p>;

/** Título del proyecto que además convierte toda la tarjeta en enlace al caso de estudio. */
function CardTitle({ href, children, size = "md" }: { href: string; children: React.ReactNode; size?: "lg" | "md" }) {
  return (
    <h3 className={`mt-2 font-bold ${size === "lg" ? "text-[2rem] leading-tight tracking-[-0.03em] md:text-[2.5rem]" : "text-[1.5rem] tracking-[-0.03em]"}`}>
      <Link href={href} className="after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-link">
        {children}
      </Link>
    </h3>
  );
}

function CardLinks({ l, slug, repo, demo }: { l: Lang; slug: string; repo: string; demo?: string }) {
  const ctx = { page: "home", project: slug } as const;
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <span className="inline-flex items-center gap-1 text-[15px] font-semibold text-ink">
        {CASE_UI.caseStudy[l]} <ChevronRight c="size-3.5" />
      </span>
      {demo && (
        <TextLink href={demo} track={umamiEvent("demo-open", ctx)}>
          {CASE_UI.demo[l]}
        </TextLink>
      )}
      <TextLink href={repo} track={umamiEvent("repo-open", ctx)}>
        {CASE_UI.code[l]}
      </TextLink>
    </div>
  );
}

/* ───────────────────────────── Secciones ───────────────────────────── */

function Hero({ l }: { l: Lang }) {
  const auto: Record<string, string> = {
    projects: String(PROJECTS.length + EXTRA_PROJECTS.length),
    certs: String(CERTS.length + 1), // +1 = EF SET (inglés)
  };
  return (
    <section aria-labelledby="hero-title" className={`${container} pt-32 pb-16 md:pt-44 md:pb-20`}>
      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-[13px] font-medium text-sub2">
            <span className="size-2 rounded-full bg-[#30d158]" aria-hidden />
            {HERO.status[l]}
          </p>
          <h1 id="hero-title" className="mt-7 text-[3.25rem] font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[5.5rem]">
            Jose Luis
            <br />
            Romo Melo
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-sub sm:text-[2.1rem]">{HERO.title[l]}</p>
          <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-sub">{HERO.body[l]}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contact" className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-page transition-opacity hover:opacity-80">
              {HERO.contact[l]}
            </a>
            <a href="#projects" className="rounded-full bg-soft px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-soft-hover">
              {HERO.projects[l]}
            </a>
            <CvLink href={LINKS.cv[l]} page="home" className="inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-[15px] font-medium text-link hover:underline hover:underline-offset-4">
              <Download /> {HERO.cv[l]}
            </CvLink>
          </div>
        </div>
        <figure className="lg:col-span-5">
          {/* La foto original mide 433 px de ancho: por encima de ~360 px se ve borrosa en pantallas retina. */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[300px] overflow-hidden rounded-[2rem] bg-zinc-100 ring-1 ring-hair sm:max-w-[340px] lg:ml-auto lg:max-w-[380px]">
            {/* mix-blend-multiply funde el fondo blanco de la foto con el gris del contenedor */}
            <img src="/img/jose-romo.webp" alt={HERO.photoAlt[l]} width={433} height={576} className="absolute inset-x-0 bottom-0 h-[94%] w-full object-cover object-top mix-blend-multiply" />
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-[13px] backdrop-blur-xl">
              <span className="font-semibold text-black">{HERO.location[l]}</span>
              <span className="text-[#6e6e73]">UTC−5</span>
            </figcaption>
          </div>
        </figure>
      </div>
      <dl className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:gap-4 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.key} className="rounded-3xl bg-tile px-6 py-6 ring-1 ring-hair">
            <dt className="sr-only">{s.label[l]}</dt>
            <dd>
              <span className="block whitespace-nowrap text-[1.75rem] font-bold leading-none tracking-[-0.04em] tabular-nums sm:text-[2rem] md:text-[2.5rem]">
                {auto[s.key] ?? s.value[l]}
              </span>
              <span className="mt-2 block text-[14px] leading-snug text-sub">{s.label[l]}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Now({ l }: { l: Lang }) {
  return (
    <section aria-labelledby="now" className={`${container} pb-24 md:pb-32`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-hair pt-10">
        <h2 id="now" className="text-[1.75rem] font-bold tracking-[-0.03em]">
          {NOW.title[l]}
        </h2>
        <p className="text-[13px] text-sub">{NOW.updated[l]}</p>
      </div>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {NOW.items.map((it) => {
          const inner = (
            <>
              <p className="flex items-center gap-2 text-[13px] font-semibold text-sub">
                <span className="size-1.5 rounded-full bg-link" aria-hidden />
                {it.kind[l]}
              </p>
              <p className="mt-2 text-[19px] font-bold tracking-[-0.02em]">{it.title[l]}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-sub">{it.body[l]}</p>
            </>
          );
          return (
            <li key={it.title.en}>
              {"href" in it && it.href ? (
                <Link href={projectPath(l, it.href)} className={`${tile} block h-full p-6`}>
                  {inner}
                  <span className="mt-4 inline-flex items-center gap-1 text-[14px] font-medium text-link">
                    {CASE_UI.caseStudy[l]} <ChevronRight c="size-3.5" />
                  </span>
                </Link>
              ) : (
                <div className="h-full rounded-3xl bg-tile p-6 ring-1 ring-hair">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Projects({ l }: { l: Lang }) {
  const av = getProject("autovalor-co")!;
  const bn = getProject("bnpl-support-assistant")!;
  const notes = getProject("notes-app")!;
  const km = getProject("customer-segmentation")!;
  const fin = getProject("financial-assets")!;
  return (
    <section aria-labelledby="projects" className="bg-alt py-24 md:py-32">
      <div className={container}>
        <SectionHeader id="projects" title={SECTIONS.projects.title[l]} lead={SECTIONS.projects.lead[l]} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* AutoValor — destacada */}
          <article className={`${tile} relative flex flex-col gap-8 overflow-hidden p-8 md:col-span-2 lg:col-span-4 lg:row-span-2 md:p-10`}>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Tag>{av.tag[l]}</Tag>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-[12px] font-semibold ring-1 ring-hair">
                  <span className="size-1.5 rounded-full bg-[#30d158]" aria-hidden />
                  {CASE_UI.live[l]}
                </span>
              </div>
              <CardTitle href={projectPath(l, av.slug)} size="lg">
                {tx(av.name, l)}
              </CardTitle>
              <p className="mt-3 max-w-[34rem] text-[17px] leading-relaxed text-sub">{av.lede[l]}</p>
            </div>
            <dl className="grid gap-3 sm:grid-cols-3">
              {av.metrics.slice(0, 3).map((m) => (
                <div key={m.label.en} className="rounded-2xl bg-card p-4 ring-1 ring-hair">
                  <dt className="sr-only">{m.label[l]}</dt>
                  <dd>
                    <span className="block whitespace-nowrap text-[1.5rem] font-bold leading-none tracking-[-0.04em] tabular-nums md:text-[1.9rem]">{m.value[l]}</span>
                    <span className="mt-2 block text-[12px] leading-snug text-sub md:text-[13px]">{m.label[l]}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <div className="overflow-hidden rounded-xl ring-1 ring-hair">
              <Img src="/img/projects/autovalor-valorar-claro.webp" alt="" w={1440} h={900} sizes={SIZES.cardWide} className="only-light block h-auto w-full" />
              <Img src="/img/projects/autovalor-valorar-oscuro.webp" alt="" w={1440} h={900} sizes={SIZES.cardWide} className="only-dark block h-auto w-full" />
            </div>
            <div className="mt-auto flex flex-col gap-5">
              <Chips items={av.stack.slice(0, 7)} l={l} />
              <CardLinks l={l} slug={av.slug} repo={av.links.repo} demo={av.links.demo} />
            </div>
          </article>

          {/* BNPL */}
          <article className={`${tile} relative flex flex-col gap-8 p-8 lg:col-span-2 lg:row-span-2`}>
            <div>
              <Tag>{bn.tag[l]}</Tag>
              <CardTitle href={projectPath(l, bn.slug)}>{tx(bn.name, l)}</CardTitle>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">{bn.lede[l]}</p>
            </div>
            <BnplMini l={l} />
            <ul className="space-y-2 text-[15px] text-sub2">
              {[
                { es: "RAG con BM25 y citas a la sección exacta", en: "RAG with BM25 and citations to the exact section" },
                { es: "Verificación de identidad en código", en: "Identity verification enforced in code" },
                { es: "Arnés propio: 15 casos, 52 checks", en: "Custom harness: 15 cases, 52 checks" },
              ].map((p) => (
                <li key={p.en} className="flex gap-2.5">
                  <span className="mt-[9px] size-1 shrink-0 rounded-full bg-mute" aria-hidden />
                  {p[l]}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-5">
              <Chips items={bn.stack.slice(0, 5)} l={l} />
              <CardLinks l={l} slug={bn.slug} repo={bn.links.repo} />
            </div>
          </article>

          {/* Notes App */}
          <article className={`${tile} relative flex flex-col p-8 lg:col-span-2`}>
            <div className="flex items-center justify-between">
              <Tag>{notes.tag[l]}</Tag>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-[12px] font-semibold ring-1 ring-hair">
                <span className="size-1.5 rounded-full bg-[#30d158]" aria-hidden />
                {CASE_UI.live[l]}
              </span>
            </div>
            <CardTitle href={projectPath(l, notes.slug)}>{tx(notes.name, l)}</CardTitle>
            <p className="mt-3 text-[15px] leading-relaxed text-sub">{notes.lede[l]}</p>
            <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-hair">
              <Img src="/img/projects/notes-claro.webp" alt="" w={1920} h={1200} sizes={SIZES.cardThird} className="only-light block h-auto w-full" />
              <Img src="/img/projects/notes-oscuro.webp" alt="" w={1920} h={1200} sizes={SIZES.cardThird} className="only-dark block h-auto w-full" />
            </div>
            <div className="mt-auto flex flex-col gap-5 pt-6">
              <Chips items={["NestJS", "PostgreSQL", "Next.js", "Docker"]} l={l} />
              <CardLinks l={l} slug={notes.slug} repo={notes.links.repo} demo={notes.links.demo} />
            </div>
          </article>

          {/* K-means */}
          <article className={`${tile} relative flex flex-col p-8 lg:col-span-2`}>
            <Tag>{km.tag[l]}</Tag>
            <CardTitle href={projectPath(l, km.slug)}>{tx(km.name, l)}</CardTitle>
            <p className="mt-3 text-[15px] leading-relaxed text-sub">{km.lede[l]}</p>
            <div className="mt-6 overflow-hidden rounded-xl bg-white ring-1 ring-hair">
              <img src="/img/kmeans.webp" alt="" width={1100} height={724} loading="lazy" className="block w-full" />
            </div>
            <div className="mt-auto flex flex-col gap-5 pt-6">
              <Chips items={["scikit-learn", "pandas", "seaborn"]} l={l} />
              <CardLinks l={l} slug={km.slug} repo={km.links.repo} />
            </div>
          </article>

          {/* Finanzas */}
          <article className={`${tile} relative flex flex-col p-8 lg:col-span-2`}>
            <Tag>{fin.tag[l]}</Tag>
            <CardTitle href={projectPath(l, fin.slug)}>{tx(fin.name, l)}</CardTitle>
            <p className="mt-3 text-[15px] leading-relaxed text-sub">{fin.lede[l]}</p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {["Sharpe", "VaR 95 %", "Drawdown", l === "es" ? "Volatilidad" : "Volatility"].map((m) => (
                <li key={m} className="rounded-xl bg-card px-3 py-2.5 text-[14px] font-semibold ring-1 ring-hair">
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-5 pt-6">
              <Chips items={["pandas", "yfinance", "Plotly", "pytest"]} l={l} />
              <CardLinks l={l} slug={fin.slug} repo={fin.links.repo} />
            </div>
          </article>

          {/* Proyectos extra, sin caso de estudio */}
          {EXTRA_PROJECTS.map((m) => (
            <article key={m.repo} className={`${tile} flex flex-col p-8 lg:col-span-2`}>
              <Tag>{m.tag[l]}</Tag>
              <h3 className="mt-2 text-[1.5rem] font-bold tracking-[-0.03em]">{tx(m.name, l)}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">{m.body[l]}</p>
              <div className="mt-auto flex flex-col gap-5 pt-6">
                <Chips items={m.stack} l={l} />
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {m.demo && (
                    <TextLink href={m.demo} track={umamiEvent("demo-open", { page: "home", project: tx(m.name, "en") })}>
                      {CASE_UI.demo[l]}
                    </TextLink>
                  )}
                  <TextLink href={m.repo} track={umamiEvent("repo-open", { page: "home", project: tx(m.name, "en") })}>
                    {CASE_UI.code[l]}
                  </TextLink>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience({ l }: { l: Lang }) {
  return (
    <section aria-labelledby="experience" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeader id="experience" title={SECTIONS.experience.title[l]} lead={SECTIONS.experience.lead[l]} />
        <div className="space-y-4">
          {EXPERIENCE.map((job) => (
            <article key={job.org} className="rounded-3xl bg-tile p-8 ring-1 ring-hair md:p-10">
              <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-hair pb-6">
                <h3 className="text-[1.375rem] font-bold tracking-[-0.025em]">{job.org}</h3>
                <p className="text-[14px] text-sub">{job.meta[l]}</p>
              </header>
              <ol className="divide-y divide-hair">
                {job.roles.map((r) => (
                  <li key={r.title.en} className="grid gap-4 py-7 last:pb-0 md:grid-cols-[13rem_1fr] md:gap-10">
                    <p className="text-[14px] font-medium text-sub tabular-nums">{r.period[l]}</p>
                    <div>
                      <h4 className="text-[17px] font-semibold tracking-[-0.015em]">{r.title[l]}</h4>
                      <ul className="mt-3 max-w-[44rem] space-y-2.5 text-[15px] leading-relaxed text-sub">
                        {r.points.map((p) => (
                          <li key={p.en} className="flex gap-3">
                            <span className="mt-[10px] size-1 shrink-0 rounded-full bg-mute" aria-hidden />
                            {p[l]}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-7 md:pl-[15.5rem]">
                <Chips items={job.tags} l={l} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ l }: { l: Lang }) {
  return (
    <section aria-labelledby="skills" className="bg-alt py-24 md:py-32">
      <div className={container}>
        <SectionHeader id="skills" title={SECTIONS.skills.title[l]} lead={SECTIONS.skills.lead[l]} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((g) => (
            <article key={g.key} className={`flex flex-col rounded-3xl bg-tile p-7 ring-1 ring-hair ${g.span}`}>
              <h3 className="text-[19px] font-bold tracking-[-0.02em]">{g.name[l]}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">{g.items.map((i) => tx(i, l)).join(", ")}</p>
              {g.learn && (
                <div className="mt-auto pt-6">
                  <p className="text-[13px] font-semibold text-link">{SECTIONS.skills.learning[l]}</p>
                  <p className="mt-1 text-[15px] text-sub">{g.learn.map((i) => tx(i, l)).join(", ")}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education({ l }: { l: Lang }) {
  const E = SECTIONS.education;
  return (
    <section aria-labelledby="education" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeader id="education" title={E.title[l]} lead={E.lead[l]} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {DEGREES.map((d) => (
            <article key={d.org} className="flex min-h-[13rem] flex-col rounded-3xl bg-tile p-7 ring-1 ring-hair">
              {d.current ? (
                <span className="self-start rounded-full bg-ink px-2.5 py-1 text-[12px] font-semibold text-page">{E.current[l]}</span>
              ) : (
                <span className="text-[13px] font-medium text-sub tabular-nums">{d.period[l]}</span>
              )}
              <h3 className="mt-auto pt-8 text-[1.375rem] font-bold leading-tight tracking-[-0.025em]">{d.name[l]}</h3>
              <p className="mt-1.5 text-[15px] text-sub">
                {d.org}
                {d.current && <span className="tabular-nums">, {d.period[l]}</span>}
              </p>
            </article>
          ))}
          <article className="rounded-3xl bg-tile p-7 ring-1 ring-hair md:col-span-2 md:p-8">
            <h3 className="text-[19px] font-bold tracking-[-0.02em]">{E.certsTitle[l]}</h3>
            <ul className="mt-4 grid gap-x-8 lg:grid-cols-2">
              {CERTS.map((c) => (
                <li key={tx(c.name, "en")} className="flex items-baseline justify-between gap-4 border-b border-hair py-3">
                  <span className="text-[15px] leading-snug">
                    <span className="font-medium">{tx(c.name, l)}</span>
                    <span className="block text-[13px] text-sub">{c.org}</span>
                  </span>
                  {c.date[l] && <span className="shrink-0 text-[13px] text-sub tabular-nums">{c.date[l]}</span>}
                </li>
              ))}
            </ul>
          </article>
          <article className="flex flex-col rounded-3xl bg-tile p-7 ring-1 ring-hair md:p-8">
            <h3 className="text-[19px] font-bold tracking-[-0.02em]">{E.english[l]}</h3>
            <p className="mt-auto pt-8 text-[4.5rem] font-bold leading-none tracking-[-0.05em]">C1</p>
            <p className="mt-2 text-[15px] text-sub">{E.englishBody[l]}</p>
            <p className="mt-1 text-[15px] text-sub">{E.spanish[l]}</p>
            <div className="mt-5">
              <TextLink href={LINKS.efset}>{E.verify[l]}</TextLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export function Contact({ l, headingLevel = "h2", title, body, page = "home" }: { l: Lang; headingLevel?: "h2" | "h3"; title?: string; body?: string; page?: UmamiProps["page"] }) {
  const K = SECTIONS.contact;
  const H = headingLevel;
  const btn = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-colors";
  return (
    <section aria-labelledby="contact" className={`${container} pb-6`}>
      <div className="rounded-[2.5rem] bg-cta px-6 py-20 text-white ring-1 ring-hair sm:px-12 md:px-16 md:py-28">
        <H id="contact" className="max-w-[44rem] text-[2.5rem] font-bold leading-[1.02] tracking-[-0.04em] md:text-[4rem]">
          {title ?? K.title[l]}
        </H>
        <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-white/60">{body ?? K.body[l]}</p>
        <div className="mt-12 flex flex-wrap gap-3">
          <a href={`mailto:${LINKS.email}`} className={`${btn} bg-white text-black hover:bg-white/85`}>
            <Mail /> {K.email[l]}
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className={`${btn} bg-white/10 text-white hover:bg-white/20`} {...umamiEvent("linkedin-open", { page })}>
            <LinkedIn /> LinkedIn
          </a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" className={`${btn} bg-white/10 text-white hover:bg-white/20`}>
            <GitHub /> GitHub
          </a>
          <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className={`${btn} bg-white/10 text-white hover:bg-white/20`} {...umamiEvent("whatsapp-open", { page })}>
            <WhatsApp /> WhatsApp
          </a>
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pt-8 text-[15px]">
          <span className="break-all font-medium">{LINKS.email}</span>
          <CopyEmail email={LINKS.email} label={K.copy[l]} done={K.copied[l]} track={umamiEvent("email-copy", { page })} />
        </div>
      </div>
    </section>
  );
}

export function Footer({ l, page = "home" }: { l: Lang; page?: UmamiProps["page"] }) {
  const link = "transition-colors hover:text-ink";
  return (
    <footer className={`${container} flex flex-col gap-4 py-8 text-[13px] text-sub sm:flex-row sm:items-center sm:justify-between`}>
      <div className="flex flex-col gap-1">
        <span>© {new Date().getFullYear()} Jose Luis Romo Melo</span>
        <span>{UI.footer[l]}</span>
      </div>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <li><a href={`mailto:${LINKS.email}`} className={link}>{SECTIONS.contact.email[l]}</a></li>
        <li><a href={LINKS.linkedin} target="_blank" rel="noreferrer" className={link} {...umamiEvent("linkedin-open", { page })}>LinkedIn</a></li>
        <li><a href={LINKS.github} target="_blank" rel="noreferrer" className={link}>GitHub</a></li>
        <li><CvLink href={LINKS.cv[l]} page={page} className={link}>CV (PDF)</CvLink></li>
        <li><a href="#top" className={`${link} font-medium text-sub2`}>{UI.nav.top[l]} ↑</a></li>
      </ul>
    </footer>
  );
}

export function SkipLink({ l, target }: { l: Lang; target: string }) {
  return (
    <a
      href={target}
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-[4.25rem] focus-visible:z-[60] focus-visible:rounded-full focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-[14px] focus-visible:font-medium focus-visible:text-page focus-visible:shadow-lg"
    >
      {UI.nav.skip[l]}
    </a>
  );
}

export function HomePage({ l }: { l: Lang }) {
  const alt = homePath(l === "es" ? "en" : "es");
  return (
    <>
      <SkipLink l={l} target="#main" />
      <SiteHeader l={l} altHref={alt} onHome />
      <LangSuggest l={l} altHref={alt} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero l={l} />
        <Now l={l} />
        <Projects l={l} />
        <Experience l={l} />
        <Skills l={l} />
        <Education l={l} />
        <Contact l={l} />
      </main>
      <Footer l={l} />
    </>
  );
}
