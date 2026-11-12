/**
 * Visuales de los casos de estudio. Los gráficos se dibujan con HTML y SVG a partir
 * de cifras reales de cada repositorio, así que se ven nítidos y respetan el tema.
 */
import type { Lang, T } from "@/lib/i18n";
import { num, tx } from "@/lib/i18n";
import { CASE_UI, type Visual } from "@/lib/projects";
import { SIZES, srcSet } from "@/lib/images";
import { ChevronRight } from "./Icons";
import { LightboxGroup, type LightboxItem, ZoomTrigger } from "./Lightbox";

/* ───────────── Marcos ───────────── */

function Figure({ caption, l, children }: { caption: T; l: Lang; children: React.ReactNode }) {
  return (
    <figure>
      {children}
      <figcaption className="mt-3 text-[14px] leading-snug text-sub">{caption[l]}</figcaption>
    </figure>
  );
}

type ImgProps = { src: string; alt: string; w: number; h: number; sizes: string; className: string; eager?: boolean };

/** <img> con srcset de las variantes generadas en el prebuild; width/height evitan saltos de layout. */
export function Img({ src, alt, w, h, sizes, className, eager = false }: ImgProps) {
  const set = srcSet(src, w);
  return (
    <img
      src={src}
      srcSet={set}
      sizes={set ? sizes : undefined}
      alt={alt}
      width={w}
      height={h}
      className={className}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function ThemedShot({ light, dark, alt, w, h, sizes, priority }: { light: string; dark: string; alt: string; w: number; h: number; sizes: string; priority?: boolean }) {
  const cls = "block h-auto w-full";
  // La versión oscura siempre es lazy: oculta con display:none no se descarga hasta que se usa.
  return (
    <div className="overflow-hidden rounded-2xl bg-tile ring-1 ring-hair">
      <Img src={light} alt={alt} w={w} h={h} sizes={sizes} className={`only-light ${cls}`} eager={priority} />
      <Img src={dark} alt={alt} w={w} h={h} sizes={sizes} className={`only-dark ${cls}`} />
    </div>
  );
}

export function VisualBlock({ v, l, priority = false }: { v: Visual; l: Lang; priority?: boolean }) {
  // El visual principal ocupa todo el contenedor; los demás van en la columna de contenido.
  const single = priority ? SIZES.full : SIZES.column;
  const L = CASE_UI.lightbox;
  const labels = { open: L.open[l], close: L.close[l], prev: L.prev[l], next: L.next[l], counter: L.counter[l], dialog: L.dialog[l] };
  const source = (src: string, w: number) => ({ src, srcSet: srcSet(src, w) });

  if (v.kind === "shots") {
    const sizes = v.items.length > 1 ? SIZES.half : single;
    const items: LightboxItem[] = v.items.map((it) => ({
      light: source(it.light, it.w),
      dark: source(it.dark, it.w),
      alt: it.alt[l],
      caption: it.caption[l],
      w: it.w,
      h: it.h,
    }));
    return (
      <LightboxGroup items={items} labels={labels}>
        <div className={`grid gap-8 ${v.items.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {v.items.map((it, i) => (
            <Figure key={it.light} caption={it.caption} l={l}>
              <ZoomTrigger index={i} alt={it.alt[l]}>
                <ThemedShot light={it.light} dark={it.dark} alt={it.alt[l]} w={it.w} h={it.h} sizes={sizes} priority={priority} />
              </ZoomTrigger>
            </Figure>
          ))}
        </div>
      </LightboxGroup>
    );
  }
  if (v.kind === "image") {
    // Las figuras de matplotlib tienen fondo blanco: van en una tarjeta blanca en ambos temas.
    const item: LightboxItem = { light: source(v.src, v.w), alt: v.alt[l], caption: v.caption[l], w: v.w, h: v.h, white: true };
    return (
      <LightboxGroup items={[item]} labels={labels}>
        <Figure caption={v.caption} l={l}>
          <div className={v.narrow ? "max-w-[600px]" : ""}>
            <ZoomTrigger index={0} alt={v.alt[l]}>
              <div className="overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-hair sm:p-5">
                <Img
                  src={v.src}
                  alt={v.alt[l]}
                  w={v.w}
                  h={v.h}
                  sizes={v.narrow ? "(min-width: 640px) 560px, calc(100vw - 56px)" : single}
                  className="mx-auto block h-auto w-full max-w-[900px]"
                  eager={priority}
                />
              </div>
            </ZoomTrigger>
          </div>
        </Figure>
      </LightboxGroup>
    );
  }
  if (v.kind === "charts") {
    const items: LightboxItem[] = v.items.map((it) => ({
      light: source(it.src, it.w),
      alt: it.alt[l],
      caption: it.caption[l],
      w: it.w,
      h: it.h,
      white: true,
    }));
    return (
      <LightboxGroup items={items} labels={labels}>
        <div className="grid gap-6 md:grid-cols-2">
          {v.items.map((it, i) => (
            <div key={it.src} className={v.items.length % 2 === 1 && i === v.items.length - 1 ? "md:col-span-2 md:mx-auto md:w-1/2" : ""}>
              <Figure caption={it.caption} l={l}>
                <ZoomTrigger index={i} alt={it.alt[l]}>
                  <div className="overflow-hidden rounded-2xl bg-white p-3 ring-1 ring-hair">
                    <Img src={it.src} alt={it.alt[l]} w={it.w} h={it.h} sizes={SIZES.half} className="block h-auto w-full" />
                  </div>
                </ZoomTrigger>
              </Figure>
            </div>
          ))}
        </div>
      </LightboxGroup>
    );
  }
  const D = DIAGRAMS[v.name];
  return (
    <Figure caption={v.caption} l={l}>
      <div className="rounded-2xl bg-tile p-5 ring-1 ring-hair sm:p-8">
        <D l={l} />
      </div>
    </Figure>
  );
}

/* ───────────── AutoValor: flujo de datos ───────────── */

function AutoValorPipeline({ l }: { l: Lang }) {
  const steps: { dot?: string; title: T; body: T }[] = [
    { title: { es: "Captura", en: "Capture" }, body: { es: "TuCarro, carros y motos. robots.txt y pausas.", en: "TuCarro, cars and motorcycles. robots.txt and pauses." } },
    { dot: "#a86b3c", title: { es: "Bronze", en: "Bronze" }, body: { es: "Parquet inmutable en la rama data del repo.", en: "Immutable Parquet in the repo's data branch." } },
    { dot: "#9a9aa0", title: { es: "Silver", en: "Silver" }, body: { es: "dbt sobre DuckDB, limpieza y tipos. Pandera valida.", en: "dbt on DuckDB, cleaning and types. Pandera validates." } },
    { dot: "#c29a2b", title: { es: "Gold", en: "Gold" }, body: { es: "Tablas listas para modelar, una por vertical.", en: "Model-ready tables, one per vertical." } },
    { title: { es: "Modelos", en: "Models" }, body: { es: "LightGBM vs. OLS, rango conformal P10–P90, SHAP.", en: "LightGBM vs. OLS, conformal P10–P90 range, SHAP." } },
    { title: { es: "API", en: "API" }, body: { es: "FastAPI en Docker: /predict, /explain, /catalog.", en: "FastAPI in Docker: /predict, /explain, /catalog." } },
    { title: { es: "Sitio", en: "Site" }, body: { es: "Next.js estático y PWA. Mercado y Metodología se construyen desde archivos.", en: "Static Next.js and PWA. Market and Methodology are built from files." } },
  ];
  return (
    <div>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title.en} className="flex">
            <div className="w-full rounded-xl bg-card p-4 ring-1 ring-hair">
              <p className="flex items-center gap-2 text-[15px] font-semibold">
                {s.dot && <span className="size-2.5 rounded-full" style={{ background: s.dot }} aria-hidden />}
                <span className="text-[12px] font-medium text-sub tabular-nums">{i + 1}</span>
                {s.title[l]}
              </p>
              <p className="mt-1.5 text-[13px] leading-snug text-sub">{s.body[l]}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[13px] text-sub">
        {l === "es"
          ? "Todo corre en planes gratuitos: GitHub Actions para CI y Render para la API y el sitio."
          : "Everything runs on free plans: GitHub Actions for CI and Render for the API and site."}
      </p>
    </div>
  );
}

/* ───────────── BNPL: versiones ───────────── */

function Bar({ value, total, strong, label }: { value: number; total: number; strong: boolean; label: string }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-ink/[0.07]" role="img" aria-label={label}>
      <div
        className={`h-full rounded-r-[4px] ${strong ? "bg-ink" : "bg-mute"}`}
        style={{ width: `${(value / total) * 100}%` }}
        title={label}
      />
    </div>
  );
}

function Legend({ l }: { l: Lang }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-sub">
      <li className="flex items-center gap-2">
        <span className="h-2.5 w-4 rounded-sm bg-mute" aria-hidden /> {l === "es" ? "V1, línea base" : "V1, baseline"}
      </li>
      <li className="flex items-center gap-2">
        <span className="h-2.5 w-4 rounded-sm bg-ink" aria-hidden /> {l === "es" ? "V2, tras una iteración" : "V2, after one iteration"}
      </li>
    </ul>
  );
}

function BnplVersions({ l }: { l: Lang }) {
  const groups = [
    { name: { es: "Casos completos", en: "Whole cases" }, total: 15, v1: 5, v2: 12 },
    { name: { es: "Checks individuales", en: "Individual checks" }, total: 52, v1: 42, v2: 44 },
  ];
  return (
    <div className="space-y-8">
      <Legend l={l} />
      {groups.map((g) => (
        <div key={g.name.en}>
          <p className="text-[15px] font-semibold">
            {g.name[l]} <span className="font-normal text-sub">/ {g.total}</span>
          </p>
          <div className="mt-3 space-y-2.5">
            {(["v1", "v2"] as const).map((k) => (
              <div key={k} className="grid grid-cols-[minmax(0,1fr)_3rem] items-center gap-4">
                <Bar value={g[k]} total={g.total} strong={k === "v2"} label={`${k.toUpperCase()}: ${g[k]} / ${g.total}`} />
                <span className="text-right text-[1.25rem] font-bold leading-none tracking-[-0.03em] tabular-nums">{g[k]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-[14px] leading-snug text-sub">
        {l === "es"
          ? "V1 pasaba casi todos los checks sueltos y fallaba los que importan. Una respuesta puede ser fluida y ordenada y estar equivocada sobre el dinero de alguien."
          : "V1 passed most individual checks while failing the ones that matter. An answer can be fluent and well organised and still be wrong about someone's money."}
      </p>
    </div>
  );
}

function BnplCategories({ l }: { l: Lang }) {
  const rows = [
    { name: { es: "Datos personales", en: "Personal data" }, n: 3, v1: 3, v2: 3 },
    { name: { es: "Sin respuesta en la política", en: "Not covered by the policy" }, n: 2, v1: 0, v2: 2 },
    { name: { es: "Una regla anula otra", en: "One rule overrides another" }, n: 2, v1: 0, v2: 2 },
    { name: { es: "Política + datos del pedido", en: "Policy + order data" }, n: 1, v1: 0, v2: 1 },
    { name: { es: "Escalar a una persona", en: "Escalate to a human" }, n: 1, v1: 0, v2: 1 },
    { name: { es: "Solo política", en: "Policy only" }, n: 5, v1: 1, v2: 2 },
  ];
  return (
    <div className="space-y-6">
      <Legend l={l} />
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{l === "es" ? "Casos superados por categoría, V1 y V2" : "Cases passed by category, V1 and V2"}</caption>
        <thead className="sr-only">
          <tr>
            <th>{l === "es" ? "Categoría" : "Category"}</th>
            <th>V1</th>
            <th>V2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name.en} className="border-t border-hair first:border-t-0">
              <th scope="row" className="py-3 pr-4 align-top text-[14px] font-medium sm:w-[38%]">
                {r.name[l]}
                <span className="block text-[12px] font-normal text-sub">
                  {r.n} {l === "es" ? (r.n === 1 ? "caso" : "casos") : r.n === 1 ? "case" : "cases"}
                </span>
              </th>
              <td className="py-3" colSpan={2}>
                <div className="space-y-1.5">
                  {(["v1", "v2"] as const).map((k) => (
                    <div key={k} className="grid grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-3">
                      <Bar value={r[k]} total={r.n} strong={k === "v2"} label={`${r.name[l]} ${k.toUpperCase()}: ${r[k]} / ${r.n}`} />
                      <span className="text-right text-[13px] text-sub2 tabular-nums">
                        {r[k]}/{r.n}
                      </span>
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ───────────── K-means: silueta por K ───────────── */

function KmeansSilhouette({ l }: { l: Lang }) {
  const data = [
    [2, 0.296],
    [3, 0.469],
    [4, 0.495],
    [5, 0.552],
    [6, 0.536],
    [7, 0.521],
    [8, 0.451],
    [9, 0.45],
    [10, 0.442],
  ] as const;
  const max = 0.6;
  const H = 180;
  return (
    <div>
      <div className="flex h-[220px] items-end gap-1.5 sm:gap-3" role="img" aria-label={l === "es" ? "Barras del coeficiente de silueta para K de 2 a 10; el máximo, 0,55, está en K = 5." : "Bars of the silhouette score for K from 2 to 10; the maximum, 0.55, is at K = 5."}>
        {data.map(([k, v]) => {
          const best = k === 5;
          return (
            <div key={k} className="flex flex-1 flex-col items-center justify-end gap-2" title={`K = ${k}: ${num(v, l, 3)}`}>
              <span className={`text-[12px] tabular-nums ${best ? "font-semibold text-ink" : "text-sub"}`}>{num(v, l, 2)}</span>
              <div className={`w-full max-w-[44px] rounded-t-[4px] ${best ? "bg-ink" : "bg-mute/60"}`} style={{ height: `${(v / max) * H}px` }} />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-1.5 border-t border-hair pt-2 sm:gap-3" aria-hidden>
        {data.map(([k]) => (
          <span key={k} className={`flex-1 text-center text-[12px] tabular-nums ${k === 5 ? "font-semibold text-ink" : "text-sub"}`}>
            K={k}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ───────────── Finanzas: universo y métricas ───────────── */

function FinanceUniverse({ l }: { l: Lang }) {
  const classes: { name: T; items: string[] }[] = [
    { name: { es: "Acciones", en: "Stocks" }, items: ["AAPL", "MSFT"] },
    { name: { es: "ETFs", en: "ETFs" }, items: ["SPY", { es: "GLD · oro", en: "GLD · gold" }[l]] },
    { name: { es: "Cripto", en: "Crypto" }, items: ["BTC-USD"] },
    { name: { es: "Divisas", en: "Currencies" }, items: ["USD/COP", "EUR/USD"] },
    { name: { es: "Índice local", en: "Local index" }, items: ["COLCAP"] },
    { name: { es: "Commodity", en: "Commodity" }, items: [{ es: "Café arábica", en: "Arabica coffee" }[l]] },
  ];
  const metrics: { name: T; body: T }[] = [
    { name: { es: "Retornos", en: "Returns" }, body: { es: "Aritméticos y logarítmicos, diarios y acumulados.", en: "Arithmetic and log, daily and cumulative." } },
    { name: { es: "Volatilidad", en: "Volatility" }, body: { es: "Anualizada, y rodante en ventanas de 21 días.", en: "Annualised, and rolling over 21-day windows." } },
    { name: { es: "Drawdown máximo", en: "Max drawdown" }, body: { es: "La peor caída desde un máximo previo.", en: "The worst fall from a previous peak." } },
    { name: { es: "Sharpe", en: "Sharpe" }, body: { es: "Rendimiento por unidad de riesgo, con tasa libre de 5 %.", en: "Return per unit of risk, with a 5% risk-free rate." } },
    { name: { es: "VaR 95 %", en: "VaR 95%" }, body: { es: "Pérdida diaria que solo se supera 1 de cada 20 días.", en: "Daily loss exceeded only 1 day in 20." } },
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p className="text-[13px] font-semibold text-sub">{l === "es" ? "9 activos" : "9 assets"}</p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {classes.map((c) => (
            <li key={c.name.en} className="rounded-xl bg-card p-3.5 ring-1 ring-hair">
              <p className="text-[12px] font-medium text-sub">{c.name[l]}</p>
              <p className="mt-1 text-[15px] font-semibold leading-snug">{c.items.join(", ")}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-[13px] font-semibold text-sub">{l === "es" ? "5 métricas, el mismo cálculo para todos" : "5 metrics, the same calculation for all"}</p>
        <dl className="mt-3 divide-y divide-hair rounded-xl bg-card ring-1 ring-hair">
          {metrics.map((m) => (
            <div key={m.name.en} className="grid grid-cols-[7.5rem_1fr] gap-3 px-4 py-3 text-[14px]">
              <dt className="font-semibold">{m.name[l]}</dt>
              <dd className="text-sub">{m.body[l]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/* ───────────── Notes App: arquitectura ───────────── */

function NotesArchitecture({ l }: { l: Lang }) {
  const nodes: { name: string; tech: string; host: string; detail: T }[] = [
    { name: "SPA", tech: "Next.js · export estático", host: "Vercel", detail: { es: "Pestañas, filtro por categoría, tema claro y oscuro.", en: "Tabs, category filter, light and dark theme." } },
    { name: "REST API", tech: "NestJS · TypeORM", host: "Render", detail: { es: "Controlador → servicio → repositorio, por dominio.", en: "Controller → service → repository, per domain." } },
    { name: "PostgreSQL 16", tech: "Migraciones + seed", host: "Supabase", detail: { es: "notes, categories y la tabla puente note_categories.", en: "notes, categories and the note_categories join table." } },
  ];
  return (
    <div>
      <ol className="grid gap-2 md:grid-cols-3 md:gap-0">
        {nodes.map((n, i) => (
          <li key={n.name} className="relative flex md:pr-6">
            <div className="w-full rounded-xl bg-card p-5 ring-1 ring-hair">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-[17px] font-semibold">{n.name}</p>
                <span className="rounded-full bg-soft px-2 py-0.5 text-[12px] font-medium text-sub2">{n.host}</span>
              </div>
              <p className="mt-1 text-[13px] font-medium text-sub2">{l === "en" ? n.tech.replace("export estático", "static export").replace("Migraciones", "Migrations") : n.tech}</p>
              <p className="mt-2 text-[13px] leading-snug text-sub">{n.detail[l]}</p>
            </div>
            {i < nodes.length - 1 && (
              <span className="absolute right-1 top-1/2 hidden -translate-y-1/2 text-mute md:block" aria-hidden>
                <ChevronRight c="size-5" />
              </span>
            )}
          </li>
        ))}
      </ol>
      <p className="mt-4 text-[13px] text-sub">
        {l === "es"
          ? "En local, docker compose levanta las tres piezas con ./start.sh."
          : "Locally, docker compose starts all three with ./start.sh."}
      </p>
    </div>
  );
}

const DIAGRAMS = {
  "autovalor-pipeline": AutoValorPipeline,
  "bnpl-versions": BnplVersions,
  "bnpl-categories": BnplCategories,
  "kmeans-silhouette": KmeansSilhouette,
  "finance-universe": FinanceUniverse,
  "notes-architecture": NotesArchitecture,
} as const;

/** Mini gráfica de BNPL para la tarjeta del inicio. */
export function BnplMini({ l }: { l: Lang }) {
  return (
    <div className="rounded-2xl bg-card p-5 ring-1 ring-hair">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold">{l === "es" ? "Casos de evaluación superados" : "Evaluation cases passed"}</span>
        <span className="text-[12px] text-sub tabular-nums">/ 15</span>
      </div>
      <div className="mt-4 space-y-3">
        {[
          { k: "V1", v: 5, s: false, n: { es: "V1, línea base", en: "V1, baseline" } },
          { k: "V2", v: 12, s: true, n: { es: "V2, tras una iteración", en: "V2, after one iteration" } },
        ].map((b) => (
          <div key={b.k} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1">
            <span className="text-[12px] text-sub">{tx(b.n, l)}</span>
            <span className="row-span-2 self-end text-[1.5rem] font-bold leading-none tracking-[-0.04em] tabular-nums">{b.v}</span>
            <Bar value={b.v} total={15} strong={b.s} label={`${tx(b.n, l)}: ${b.v} / 15`} />
          </div>
        ))}
      </div>
    </div>
  );
}
