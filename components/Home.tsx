import Link from "next/link";
import { CERTS, DEGREES, EXPERIENCE, HERO, LINKS, NOW, SECTIONS, SKILLS, STATS, UI } from "@/lib/content";
import { container } from "@/lib/ui";
import { type Lang, homePath, projectPath, tx } from "@/lib/i18n";
import { CASE_UI, EXTRA_PROJECTS, type Project, getProject } from "@/lib/projects";
import { CopyEmail, CvLink, LangSuggest, SiteHeader } from "./Chrome";
import { type UmamiProps, umamiEvent } from "@/lib/analytics";
import { ArrowUpRight, ChevronRight, Download, GitHub, LinkedIn, Mail, WhatsApp } from "./Icons";
import { Img, VisualBlock } from "./Visuals";
import { SIZES } from "@/lib/images";

/* ───────────────────────────── Sistema ─────────────────────────────
   - Títulos de sección: etiqueta pequeña en mono, mayúsculas y espaciada. El tamaño grande lo llevan
     el nombre y los títulos de proyecto (Newsreader).
   - Sin cajas en las secciones informativas: espacio y divisores (border-t).
   - Píldoras (rounded-full) solo para estados ("Disponible", "En vivo", "En curso").
     Botones y etiquetas técnicas: rounded-md.
   - Acento cobalto solo en el CTA principal, enlaces, estados activos y cifras clave. */

export const label = "font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-sub";
export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-[15px] font-medium text-on-accent transition-opacity hover:opacity-90";
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[15px] font-medium text-ink ring-1 ring-hair transition-colors hover:bg-ink/[0.05]";

/** Etiqueta de sección con su divisor. `as="p"` cuando el título real de la sección es otro. */
export function SectionLabel({ id, children, aside, as = "h2" }: { id?: string; children: React.ReactNode; aside?: React.ReactNode; as?: "h2" | "h3" | "p" }) {
  const H = as;
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-hair pt-5">
      <H id={id} className={label}>
        {children}
      </H>
      {aside}
    </div>
  );
}

export function TextLink({ href, children, external = true, track }: { href: string; children: React.ReactNode; external?: boolean; track?: Record<string, string> }) {
  const cls = "relative z-10 inline-flex items-center gap-1 text-[15px] font-medium text-link underline-offset-4 hover:underline";
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

/** Indicador de estado. Es el único elemento con forma de píldora. */
function Status({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-[12px] font-medium text-sub2 ring-1 ring-hair">
      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </span>
  );
}

/** Enlaces de un proyecto: caso de estudio, demo y código. */
function ProjectLinks({ l, p, primary = false }: { l: Lang; p: Project; primary?: boolean }) {
  const ctx = { page: "home", project: p.slug } as const;
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {primary ? (
        <Link href={projectPath(l, p.slug)} className={btnSecondary}>
          {CASE_UI.caseStudy[l]} <ChevronRight c="size-3.5" />
        </Link>
      ) : (
        <TextLink href={projectPath(l, p.slug)} external={false}>
          {CASE_UI.caseStudy[l]}
        </TextLink>
      )}
      {p.links.demo && (
        <TextLink href={p.links.demo} track={umamiEvent("demo-open", ctx)}>
          {CASE_UI.demo[l]}
        </TextLink>
      )}
      <TextLink href={p.links.repo} track={umamiEvent("repo-open", ctx)}>
        {CASE_UI.code[l]}
      </TextLink>
    </div>
  );
}

/* ───────────────────────────── Inicio ───────────────────────────── */

function Hero({ l }: { l: Lang }) {
  return (
    <section aria-labelledby="hero-title" className={`${container} pt-28 pb-14 md:pt-40 md:pb-16`}>
      <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
        <div>
          <Status>{HERO.status[l]}</Status>
          <h1 id="hero-title" className="mt-8 font-display text-[3.5rem] font-medium leading-[0.95] tracking-[-0.02em] sm:text-[5rem] lg:text-[6.25rem]">
            Jose Luis
            <br />
            Romo Melo
          </h1>
          <p className="mt-8 max-w-[40rem] text-[1.3rem] font-medium leading-snug tracking-[-0.01em] sm:text-[1.55rem]">{HERO.title[l]}</p>
          <p className="mt-5 max-w-[38rem] text-[17px] leading-relaxed text-sub">{HERO.body[l]}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#contact" className={btnPrimary}>
              {HERO.contact[l]}
            </a>
            <a href="#projects" className="inline-flex items-center gap-1 text-[15px] font-medium text-ink underline-offset-4 hover:underline">
              {HERO.projects[l]} <ChevronRight c="size-3.5" />
            </a>
            <CvLink href={LINKS.cv[l]} page="home" className="inline-flex items-center gap-1.5 text-[15px] font-medium text-link underline-offset-4 hover:underline">
              <Download /> {HERO.cv[l]}
            </CvLink>
          </div>
        </div>
        <figure className="mx-auto w-full max-w-[16rem] lg:mx-0 lg:max-w-none">
          {/* La foto tiene fondo blanco: mix-blend-multiply lo funde con el papel. El marco es claro en
              ambos temas para que la foto no se oscurezca. */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#efede8] ring-1 ring-hair">
            <img src="/img/jose-romo.webp" alt={HERO.photoAlt[l]} width={433} height={576} className="absolute inset-x-0 bottom-0 h-[95%] w-full object-cover object-top mix-blend-multiply" />
          </div>
          <figcaption className="mt-3 flex justify-between font-mono text-[12px] text-sub">
            <span>{HERO.location[l]}</span>
            <span>UTC−5</span>
          </figcaption>
        </figure>
      </div>

      <dl className="mt-16 grid border-t border-hair sm:grid-cols-3">
        {STATS.map((s) => (
          <div key={s.key} className="border-hair py-6 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0 max-sm:border-b max-sm:last:border-b-0">
            <dt className="sr-only">{s.label[l]}</dt>
            <dd>
              <span className="block whitespace-nowrap font-mono text-[2rem] font-medium leading-none tracking-[-0.02em] text-accent md:text-[2.4rem]">{s.value[l]}</span>
              <span className="mt-3 block text-[15px] leading-snug text-sub2">{s.label[l]}</span>
              <span className="mt-1 block font-mono text-[12px] text-sub">{s.source[l]}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Franja de estado compacta, tipo changelog. */
function Now({ l }: { l: Lang }) {
  return (
    <section aria-labelledby="now" className={container}>
      <div className="grid gap-x-8 gap-y-4 border-y border-hair py-5 md:grid-cols-[7rem_repeat(4,minmax(0,1fr))] md:items-baseline">
        <div className="flex items-baseline gap-3 md:block">
          <h2 id="now" className={label}>
            {NOW.title[l]}
          </h2>
          <p className="font-mono text-[12px] text-sub md:mt-1">{NOW.updated[l]}</p>
        </div>
        {NOW.items.map((it) => (
          <div key={it.kind.en} className="grid grid-cols-[7rem_1fr] items-baseline gap-3 md:block">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-sub">{it.kind[l]}</p>
            {it.href ? (
              <Link href={projectPath(l, it.href)} className="text-[15px] font-medium text-link underline-offset-4 hover:underline md:mt-1 md:inline-block">
                {it.title[l]}
              </Link>
            ) : (
              <p className="text-[15px] font-medium md:mt-1">{it.title[l]}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Proyecto insignia: bloque editorial de dos columnas, texto y cifras a un lado, visual al otro. */
function Flagship({ l, p, visual, reverse = false, live = false, first = false }: { l: Lang; p: Project; visual: React.ReactNode; reverse?: boolean; live?: boolean; first?: boolean }) {
  return (
    <article className={`grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-20 ${first ? "" : "border-t border-hair"}`}>
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-sub">{p.tag[l]}</p>
          {live && <Status>{CASE_UI.live[l]}</Status>}
        </div>
        <h3 className="mt-4 font-display text-[2.5rem] font-medium leading-[1.02] tracking-[-0.015em] md:text-[3.25rem]">
          <Link href={projectPath(l, p.slug)} className="underline-offset-[6px] hover:underline hover:decoration-1">
            {tx(p.name, l)}
          </Link>
        </h3>
        <p className="mt-4 max-w-[34rem] text-[17px] leading-relaxed text-sub">{p.lede[l]}</p>
        <dl className="mt-8 max-w-[34rem]">
          {p.metrics.slice(0, 3).map((m) => (
            <div key={m.label.en} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-t border-hair py-3 last:border-b">
              <dt className="sr-only">{m.label[l]}</dt>
              <dd className="contents">
                <span className="whitespace-nowrap font-mono text-[1.25rem] font-medium text-accent">{m.value[l]}</span>
                <span className="text-[14px] leading-snug text-sub2">{m.label[l]}</span>
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-8">
          <ProjectLinks l={l} p={p} primary />
        </div>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{visual}</div>
    </article>
  );
}

function Projects({ l }: { l: Lang }) {
  const av = getProject("autovalor-co")!;
  const bn = getProject("bnpl-support-assistant")!;
  const more = ["notes-app", "customer-segmentation", "financial-assets"].map((s) => getProject(s)!);
  return (
    <section aria-labelledby="projects" className={`${container} pt-24 md:pt-32`}>
      <SectionLabel id="projects" aside={<p className="max-w-[30rem] text-[15px] text-sub">{SECTIONS.projects.lead[l]}</p>}>
        {SECTIONS.projects.title[l]}
      </SectionLabel>

      <Flagship
        l={l}
        p={av}
        live
        first
        visual={
          <div className="overflow-hidden rounded-lg ring-1 ring-hair">
            <Img src="/img/projects/autovalor-valorar-claro.webp" alt={av.hero.kind === "shots" ? av.hero.items[0].alt[l] : ""} w={1440} h={900} sizes={SIZES.cardWide} className="only-light block h-auto w-full" />
            <Img src="/img/projects/autovalor-valorar-oscuro.webp" alt={av.hero.kind === "shots" ? av.hero.items[0].alt[l] : ""} w={1440} h={900} sizes={SIZES.cardWide} className="only-dark block h-auto w-full" />
          </div>
        }
      />
      <Flagship l={l} p={bn} reverse visual={<VisualBlock v={bn.hero} l={l} />} />

      <div className="mt-6">
        <SectionLabel as="h3">{SECTIONS.projects.more[l]}</SectionLabel>
        <ul>
          {more.map((p) => (
            <li key={p.slug} className="grid gap-x-10 gap-y-3 border-b border-hair py-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]">
              <div>
                <h4 className="font-display text-[1.65rem] font-medium leading-tight tracking-[-0.01em]">
                  <Link href={projectPath(l, p.slug)} className="underline-offset-4 hover:underline hover:decoration-1">
                    {tx(p.name, l)}
                  </Link>
                </h4>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-sub">{p.tag[l]}</p>
              </div>
              <div className="max-w-[36rem]">
                <p className="text-[16px] leading-relaxed text-sub2">{p.lede[l]}</p>
                <p className="mt-2 text-[14px] text-sub">{p.stack.slice(0, 5).join(", ")}</p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:items-start">
                <ProjectLinks l={l} p={p} />
              </div>
            </li>
          ))}
          {EXTRA_PROJECTS.map((m) => (
            <li key={m.repo} className="grid gap-x-10 gap-y-3 border-b border-hair py-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto]">
              <div>
                <h4 className="font-display text-[1.65rem] font-medium leading-tight">{tx(m.name, l)}</h4>
                <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.1em] text-sub">{m.tag[l]}</p>
              </div>
              <div className="max-w-[36rem]">
                <p className="text-[16px] leading-relaxed text-sub2">{m.body[l]}</p>
                <p className="mt-2 text-[14px] text-sub">{m.stack.join(", ")}</p>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 md:flex-col">
                {m.demo && (
                  <TextLink href={m.demo} track={umamiEvent("demo-open", { page: "home", project: tx(m.name, "en") })}>
                    {CASE_UI.demo[l]}
                  </TextLink>
                )}
                <TextLink href={m.repo} track={umamiEvent("repo-open", { page: "home", project: tx(m.name, "en") })}>
                  {CASE_UI.code[l]}
                </TextLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Experience({ l }: { l: Lang }) {
  return (
    <section aria-labelledby="experience" className={`${container} pt-24 md:pt-32`}>
      <SectionLabel id="experience">{SECTIONS.experience.title[l]}</SectionLabel>
      <ol>
        {EXPERIENCE.flatMap((job) =>
          job.roles.map((r, i) => {
            const last = i === job.roles.length - 1;
            return (
              <li key={r.title.en} className="grid gap-x-12 gap-y-4 border-b border-hair py-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
                <div>
                  <p className="font-mono text-[13px] text-sub2">{r.period[l]}</p>
                  <p className="mt-2 text-[16px] font-semibold">{job.org}</p>
                  <p className="text-[14px] text-sub">{job.meta[l]}</p>
                  {job.note && <p className="mt-3 max-w-[15rem] text-[13px] leading-snug text-sub">{job.note[l]}</p>}
                </div>
                <div className="max-w-[44rem]">
                  <h3 className="text-[19px] font-semibold leading-snug tracking-[-0.01em]">{r.title[l]}</h3>
                  <ul className="mt-4 space-y-2.5 text-[16px] leading-relaxed text-sub2">
                    {r.points.map((p) => (
                      <li key={p.en} className="flex gap-3">
                        <span className="mt-[11px] h-px w-3 shrink-0 bg-mute" aria-hidden />
                        {p[l]}
                      </li>
                    ))}
                  </ul>
                  {last && (
                    <p className="mt-5 text-[14px] leading-relaxed text-sub">
                      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.12em]">{SECTIONS.experience.stack[l]}</span>
                      {job.stack[l]}
                    </p>
                  )}
                </div>
              </li>
            );
          }),
        )}
      </ol>
    </section>
  );
}

function Skills({ l }: { l: Lang }) {
  const S = SECTIONS.skills;
  return (
    <section aria-labelledby="skills" className={`${container} pt-24 md:pt-32`}>
      <SectionLabel id="skills">{S.title[l]}</SectionLabel>
      <table className="mt-6 w-full border-collapse text-left">
        <thead className="max-md:sr-only">
          <tr>
            <th scope="col" className="w-[18rem] pb-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-sub">
              {S.domain[l]}
            </th>
            <th scope="col" className="pb-3 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-sub">
              {S.stack[l]}
            </th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map((s) => (
            <tr key={s.key} className="border-t border-hair max-md:block max-md:py-5">
              <th scope="row" className="py-5 pr-8 align-baseline text-[17px] font-semibold max-md:block max-md:p-0">
                {s.domain[l]}
              </th>
              <td className="py-5 align-baseline text-[16px] leading-relaxed text-sub2 max-md:mt-1.5 max-md:block max-md:p-0">{s.stack[l]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function Education({ l }: { l: Lang }) {
  const E = SECTIONS.education;
  const featured = CERTS.filter((c) => c.featured);
  const rest = CERTS.filter((c) => !c.featured);
  const total = CERTS.length;
  const certRow = (c: (typeof CERTS)[number]) => (
    <li key={tx(c.name, "en")} className="flex items-baseline justify-between gap-6 border-t border-hair py-3.5">
      <span className="text-[15px] leading-snug">
        <span className="font-medium">{tx(c.name, l)}</span>
        <span className="text-sub"> · {c.org}</span>
      </span>
      {c.date[l] && <span className="shrink-0 font-mono text-[12px] text-sub">{c.date[l]}</span>}
    </li>
  );
  return (
    <section aria-labelledby="education" className={`${container} pt-24 md:pt-32`}>
      <SectionLabel id="education">{E.title[l]}</SectionLabel>
      <div className="mt-10 grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-20">
        <div>
          <h3 className={label}>{E.degrees[l]}</h3>
          <ul className="mt-4">
            {DEGREES.map((d) => (
              <li key={d.org} className="grid gap-x-6 gap-y-1 border-t border-hair py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
                <div>
                  <p className="font-display text-[1.6rem] font-medium leading-tight tracking-[-0.01em]">{d.name[l]}</p>
                  <p className="mt-1 text-[15px] text-sub">{d.org}</p>
                </div>
                <div className="flex items-center gap-3">
                  {d.current && <Status>{E.current[l]}</Status>}
                  <span className="font-mono text-[13px] text-sub2">{d.period[l]}</span>
                </div>
              </li>
            ))}
          </ul>

          <h3 className={`${label} mt-14`}>{E.certsTitle[l]}</h3>
          <ul className="mt-4">{featured.map(certRow)}</ul>
          {rest.length > 0 && (
            <details className="group border-t border-hair">
              <summary className="flex cursor-pointer items-center gap-2 py-3.5 text-[15px] font-medium text-link underline-offset-4 hover:underline">
                <ChevronRight c="rotate-on-open size-3.5 transition-transform" />
                {E.allCerts[l].replace("{n}", String(total))}
              </summary>
              <ul>{rest.map(certRow)}</ul>
            </details>
          )}
        </div>

        <aside aria-labelledby="english" className="border-t border-hair pt-5 lg:self-start">
          <h3 id="english" className={label}>
            {E.english[l]}
          </h3>
          <p className="mt-6 font-display text-[5.5rem] font-medium leading-none tracking-[-0.02em]">C1</p>
          <p className="mt-4 font-mono text-[13px] text-sub2">{E.englishBody[l]}</p>
          <p className="mt-1 text-[15px] text-sub">{E.spanish[l]}</p>
          <div className="mt-5">
            <TextLink href={LINKS.efset}>{E.verify[l]}</TextLink>
          </div>
        </aside>
      </div>
    </section>
  );
}

export function Contact({ l, headingLevel = "h2", title, body, page = "home" }: { l: Lang; headingLevel?: "h2" | "h3"; title?: string; body?: string; page?: UmamiProps["page"] }) {
  const K = SECTIONS.contact;
  const H = headingLevel;
  const link = "inline-flex items-center gap-1.5 text-[15px] font-medium text-ink underline-offset-4 hover:underline";
  return (
    <section aria-labelledby="contact" className={`${container} pt-24 pb-10 md:pt-32`}>
      <SectionLabel as="p">{K.label[l]}</SectionLabel>
      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <H id="contact" className="font-display text-[3rem] font-medium leading-[1] tracking-[-0.02em] md:text-[4.5rem]">
            {title ?? K.title[l]}
          </H>
          <p className="mt-6 max-w-[36rem] text-[17px] leading-relaxed text-sub">{body ?? K.body[l]}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href={`mailto:${LINKS.email}`} className={btnPrimary}>
              <Mail /> {K.write[l]}
            </a>
            <CopyEmail email={LINKS.email} label={K.copy[l]} done={K.copied[l]} track={umamiEvent("email-copy", { page })} className={btnSecondary} />
          </div>
          <p className="mt-4 break-all font-mono text-[13px] text-sub">{LINKS.email}</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:items-start lg:gap-y-3">
          <li>
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className={link} {...umamiEvent("linkedin-open", { page })}>
              <LinkedIn c="size-4" /> LinkedIn
            </a>
          </li>
          <li>
            <a href={LINKS.github} target="_blank" rel="noreferrer" className={link}>
              <GitHub c="size-4" /> GitHub
            </a>
          </li>
          <li>
            <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className={link} {...umamiEvent("whatsapp-open", { page })}>
              <WhatsApp c="size-4" /> WhatsApp
            </a>
          </li>
          <li>
            <CvLink href={LINKS.cv[l]} page={page} className={link}>
              <Download /> {K.cv[l]}
            </CvLink>
          </li>
        </ul>
      </div>
    </section>
  );
}

export function Footer({ l, page = "home" }: { l: Lang; page?: UmamiProps["page"] }) {
  const link = "transition-colors hover:text-ink";
  return (
    <footer className={`${container} mt-10 flex flex-col gap-4 border-t border-hair py-8 text-[13px] text-sub sm:flex-row sm:items-center sm:justify-between`}>
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
      className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-[4.25rem] focus-visible:z-[60] focus-visible:rounded-md focus-visible:bg-ink focus-visible:px-4 focus-visible:py-2 focus-visible:text-[14px] focus-visible:font-medium focus-visible:text-page focus-visible:shadow-lg"
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
