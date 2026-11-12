/**
 * Proyectos y casos de estudio.
 *
 * - El orden del arreglo es el orden en la página y en "Siguiente proyecto".
 * - Cada proyecto genera su página: /proyectos/<slug> y /en/projects/<slug>.
 * - Las cifras salen de los repositorios (READMEs, ITERATION.md, ADRs, notebooks).
 *   Si cambian allá, cámbialas aquí.
 */
import type { T, Tx } from "./i18n";

export type Visual =
  | { kind: "shots"; items: { light: string; dark: string; alt: T; caption: T; w: number; h: number }[] }
  | { kind: "image"; src: string; alt: T; caption: T; w: number; h: number; narrow?: boolean }
  /** Varios gráficos de matplotlib en cuadrícula (fondo blanco en ambos temas). */
  | { kind: "charts"; items: { src: string; alt: T; caption: T; w: number; h: number }[] }
  | {
      kind: "diagram";
      name: "autovalor-pipeline" | "bnpl-categories" | "bnpl-versions" | "kmeans-silhouette" | "finance-universe" | "notes-architecture";
      caption: T;
    };

export type Table = { head: Tx[]; rows: Tx[][]; note?: T };

export type Project = {
  slug: string;
  name: Tx;
  tag: T;
  year: string;
  status: T;
  role: T;
  /** Una frase: qué es. Aparece en la tarjeta y bajo el título del caso. */
  lede: T;
  stack: string[];
  links: { repo: string; demo?: string; demoNote?: T; extra?: { label: T; href: string }[] };
  metrics: { value: T; label: T }[];
  hero: Visual;
  problem: T[];
  built: { title: T; body: T }[];
  builtVisual?: Visual;
  decisions: { title: T; body: T; source?: { label: string; href: string } }[];
  results: { intro?: T[]; table?: Table; visual?: Visual; points?: T[]; charts?: Visual; gallery?: Visual };
  limits?: T[];
  learned: T[];
  next: T[];
};

const AV = "https://github.com/JoseRomo16/AutoValorCo";
const BN = "https://github.com/JoseRomo16/bnpl-support-assistant";

export const PROJECTS: Project[] = [
  /* ───────────────────────────── AutoValor CO ───────────────────────────── */
  {
    slug: "autovalor-co",
    name: "AutoValor CO",
    tag: { es: "Data Science · ML · Producto", en: "Data Science · ML · Product" },
    year: "2026",
    status: { es: "Completo y en producción", en: "Complete and live" },
    role: { es: "Proyecto propio, de punta a punta: datos, modelos, API y sitio", en: "Solo, end to end: data, models, API and site" },
    lede: {
      es: "Cuánto vale un carro o una moto usada en Colombia, con su rango probable y los factores que mueven el precio.",
      en: "What a used car or motorcycle is worth in Colombia, with its likely range and the factors that move the price.",
    },
    stack: ["Python", "dbt", "DuckDB", "Pandera", "LightGBM", "SHAP", "FastAPI", "Docker", "Next.js", "GitHub Actions"],
    links: {
      repo: AV,
      demo: "https://autovalor-web.onrender.com",
      demoNote: {
        es: "La primera valoración puede tardar cerca de un minuto: el plan gratuito duerme la API.",
        en: "The first valuation can take about a minute: the free plan puts the API to sleep.",
      },
      extra: [{ label: { es: "Documentación de la API", en: "API docs" }, href: "https://autovalor-api.onrender.com/docs" }],
    },
    metrics: [
      { value: { es: "10,0 %", en: "10.0%" }, label: { es: "error medio en carros, fuera de muestra (meta: ≤ 15 %)", en: "mean error on cars, out of sample (target: ≤ 15%)" } },
      { value: { es: "80,2 %", en: "80.2%" }, label: { es: "cobertura del rango P10–P90 (promete 80 %)", en: "coverage of the P10–P90 range (promises 80%)" } },
      { value: { es: "12.948", en: "12,948" }, label: { es: "anuncios de carros y motos modelados", en: "car and motorcycle listings modelled" } },
      { value: { es: "7", en: "7" }, label: { es: "decisiones de arquitectura documentadas (ADRs)", en: "documented architecture decisions (ADRs)" } },
    ],
    hero: {
      kind: "shots",
      items: [
        {
          light: "/img/projects/autovalor-valorar-claro.webp",
          dark: "/img/projects/autovalor-valorar-oscuro.webp",
          w: 1440,
          h: 900,
          alt: {
            es: "Pantalla Valorar de AutoValor: un Toyota 2019 con 60.000 km en Antioquia, precio estimado de 106 millones, rango de 73 a 231 millones, etiqueta Ganga y los factores que mueven el precio.",
            en: "AutoValor's Value screen: a 2019 Toyota with 60,000 km in Antioquia, estimated price of 106 million pesos, range of 73 to 231 million, a Bargain label and the factors that move the price.",
          },
          caption: {
            es: "Valorar: precio estimado, rango P10–P90, etiqueta ganga / justo / caro y factores SHAP.",
            en: "Value: estimated price, P10–P90 range, bargain / fair / pricey label and SHAP factors.",
          },
        },
      ],
    },
    problem: [
      {
        es: "Comprar o vender un usado en Colombia es negociar a ciegas. Los anuncios piden lo que quieren y la referencia habitual, la guía de Fasecolda, es de suscripción.",
        en: "Buying or selling a used vehicle in Colombia means negotiating blind. Listings ask whatever they want, and the usual reference, the Fasecolda guide, is subscription-only.",
      },
      {
        es: "Quería una herramienta que dijera cuánto se pide en el mercado por un vehículo como el tuyo, qué tan segura es esa cifra y qué la mueve, y que todo funcionara sin costo de operación.",
        en: "I wanted a tool that tells you what the market asks for a vehicle like yours, how sure that figure is and what drives it, and that runs at zero operating cost.",
      },
    ],
    built: [
      {
        title: { es: "Captura respetuosa", en: "Polite capture" },
        body: {
          es: "Scrapers de TuCarro para carros y motos que respetan robots.txt, hacen pausas y nunca guardan datos de vendedores (Ley 1581 de 2012).",
          en: "TuCarro scrapers for cars and motorcycles that respect robots.txt, pause between requests and never store seller data (Colombian data-protection law).",
        },
      },
      {
        title: { es: "Lago de datos medallion", en: "Medallion data lake" },
        body: {
          es: "Bronze inmutable en Parquet, guardado en una rama del propio repositorio. Silver y gold con dbt sobre DuckDB, y contratos de calidad con Pandera.",
          en: "Immutable Parquet bronze, stored in a branch of the repo itself. Silver and gold with dbt on DuckDB, and data contracts with Pandera.",
        },
      },
      {
        title: { es: "Modelos con rango calibrado", en: "Models with a calibrated range" },
        body: {
          es: "LightGBM frente a una línea base hedónica OLS, sobre log(precio). Calibración conformal para que el rango P10–P90 cubra de verdad el 80 % fuera de muestra.",
          en: "LightGBM against a hedonic OLS baseline, on log(price). Conformal calibration so the P10–P90 range really covers 80% out of sample.",
        },
      },
      {
        title: { es: "Explicación de cada precio", en: "An explanation for every price" },
        body: {
          es: "Factores SHAP por vehículo: cuánto sube o baja el precio la marca, la edad, el kilometraje o el departamento.",
          en: "Per-vehicle SHAP factors: how much the brand, age, mileage or department raise or lower the price.",
        },
      },
      {
        title: { es: "API y sitio", en: "API and site" },
        body: {
          es: "FastAPI en Docker con /predict, /explain y /catalog. Sitio estático en Next.js, bilingüe, con tema claro y oscuro e instalable como PWA.",
          en: "FastAPI in Docker with /predict, /explain and /catalog. A static Next.js site, bilingual, with light and dark themes, installable as a PWA.",
        },
      },
      {
        title: { es: "Calidad verificable", en: "Verifiable quality" },
        body: {
          es: "Más de 600 pruebas de Python con cobertura mínima del 70 %, E2E con Playwright contra la API real, auditoría de contraste en CI y un test que falla si el README no coincide con el modelo.",
          en: "600+ Python tests with a 70% coverage floor, Playwright E2E against the real API, a contrast audit in CI and a test that fails if the README drifts from the model.",
        },
      },
    ],
    builtVisual: {
      kind: "diagram",
      name: "autovalor-pipeline",
      caption: {
        es: "De la captura al sitio. Mercado y Metodología se construyen a partir de archivos versionados; solo Valorar llama a la API.",
        en: "From capture to site. Market and Methodology are built from versioned files; only Value calls the API.",
      },
    },
    decisions: [
      {
        title: { es: "Validar agrupando por vehículo", en: "Validate grouped by vehicle" },
        body: {
          es: "El mismo carro reaparece con otro ID entre capturas. Partir por filas filtraba el holdout y mostraba un error mejor del real, así que la validación usa K-fold agrupado por vehículo.",
          en: "The same car reappears under a new ID across captures. Splitting by rows leaked the holdout and showed a better error than the real one, so validation uses K-fold grouped by vehicle.",
        },
        source: { label: "ADR 0003", href: `${AV}/blob/main/docs/adr/0003-tree-model-validation.md` },
      },
      {
        title: { es: "Publicar la etiqueta solo si el rango la sostiene", en: "Publish the label only where the range supports it" },
        body: {
          es: "Una regla escrita en el código: la etiqueta ganga / justo / caro sale solo si la cobertura medida está entre 78 % y 82 % y el ancho medio es de máximo 60 %. Carros la cumplen; motos, no.",
          en: "A rule written in code: the bargain / fair / pricey label ships only if measured coverage is between 78% and 82% and mean width is at most 60%. Cars pass; motorcycles don't.",
        },
      },
      {
        title: { es: "Paridad entre entrenamiento y servicio", en: "Training–serving parity" },
        body: {
          es: "El formulario pide departamento, pero el modelo usaba ciudad, y el rango publicado cubría menos de lo que decía. Saqué la ciudad, medí con los valores que la API envía de verdad y agregué una prueba que impide que la brecha vuelva.",
          en: "The form asks for department but the model used city, so the published range covered less than it claimed. I dropped city, measured with the values the API actually sends, and added a test that keeps the gap closed.",
        },
        source: { label: "ADR 0006", href: `${AV}/blob/main/docs/adr/0006-drop-city-feature.md` },
      },
      {
        title: { es: "Detenerse ante el bloqueo, no esquivarlo", en: "Stop at the wall instead of evading it" },
        body: {
          es: "Cuando TuCarro empezó a pedir verificación de cuenta, la captura se detuvo en la primera respuesta. Rotar IP, proxies o navegadores es evasión. La API oficial de Mercado Libre se probó con token y no entrega vehículos, así que el proyecto cerró con un corte fijo.",
          en: "When TuCarro started asking for account verification, the capture stopped at the first response. Rotating IPs, proxies or browsers is evasion. The official Mercado Libre API was tested with a token and doesn't serve vehicles, so the project closed on a fixed dataset.",
        },
        source: { label: "ADR 0005", href: `${AV}/blob/main/docs/adr/0005-capture-source-after-verification-wall.md` },
      },
      {
        title: { es: "Costo cero como restricción de diseño", en: "Zero cost as a design constraint" },
        body: {
          es: "Histórico en una rama de git en lugar de almacenamiento pago, modelo empaquetado dentro de la imagen, frontend estático y API en el plan gratuito de Render.",
          en: "History in a git branch instead of paid storage, the model baked into the image, a static frontend and the API on Render's free plan.",
        },
        source: { label: "ADR 0004", href: `${AV}/blob/main/docs/adr/0004-capture-history-storage.md` },
      },
    ],
    results: {
      intro: [
        {
          es: "Error medido sobre anuncios que el modelo nunca vio, con los mismos valores que la API envía al valorar. La partición temporal, que evalúa en los anuncios más nuevos, va al lado como segunda medición.",
          en: "Error measured on listings the model never saw, with the same values the API sends when valuing. The temporal split, which evaluates on the newest listings, sits alongside as a second measurement.",
        },
      ],
      table: {
        head: ["", { es: "Carros", en: "Cars" }, { es: "Motos", en: "Motorcycles" }],
        rows: [
          [{ es: "Anuncios en total", en: "Total listings" }, { es: "8.443", en: "8,443" }, { es: "4.505", en: "4,505" }],
          [{ es: "Error medio (MAPE)", en: "Mean error (MAPE)" }, { es: "10,0 %", en: "10.0%" }, { es: "20,4 %", en: "20.4%" }],
          [{ es: "Error medio, partición temporal", en: "Mean error, temporal split" }, { es: "11,4 %", en: "11.4%" }, { es: "21,9 %", en: "21.9%" }],
          [{ es: "Línea base OLS", en: "OLS baseline" }, { es: "12,9 %", en: "12.9%" }, { es: "33,2 %", en: "33.2%" }],
          [{ es: "Cobertura del rango (objetivo 80 %)", en: "Range coverage (target 80%)" }, { es: "80,2 %", en: "80.2%" }, { es: "80,5 %", en: "80.5%" }],
          [{ es: "Ancho medio del rango", en: "Mean range width" }, "39 %", "70 %"],
          [{ es: "Etiqueta ganga / justo / caro", en: "Bargain / fair / pricey label" }, { es: "Publicada", en: "Published" }, { es: "Retenida por el ancho", en: "Withheld for width" }],
        ],
        note: { es: "Modelo servido: LightGBM, versión 2026-11-02.", en: "Served model: LightGBM, version 2026-11-02." },
      },
      points: [
        {
          es: "La depreciación anual va de 5,1 % (Volkswagen) a 9,5 % (Ford) en carros, y de 0,9 % (Yamaha) a 6,4 % (Bajaj) en motos.",
          en: "Annual depreciation ranges from 5.1% (Volkswagen) to 9.5% (Ford) for cars, and from 0.9% (Yamaha) to 6.4% (Bajaj) for motorcycles.",
        },
        {
          es: "Cada 10.000 km le restan $231.000 al carro mediano ($88 millones, 53.600 km).",
          en: "Every 10,000 km takes COP 231,000 off the median car (COP 88 million, 53,600 km).",
        },
        {
          es: "El mismo carro se pide 7,6 % más caro en Santander que en Bogotá.",
          en: "The same car is listed 7.6% higher in Santander than in Bogotá.",
        },
      ],
      charts: {
        kind: "charts",
        items: [
          {
            src: "/img/projects/autovalor-depreciacion-carros.webp",
            w: 1016,
            h: 875,
            alt: {
              es: "Barras de depreciación anual de carros por marca, con intervalos: Ford 9,5 %, BMW 9,3 %, Audi 9,0 %, Mercedes-Benz 8,6 %, Nissan 7,2 %, y la más baja Volkswagen con 5,1 %.",
              en: "Bars of annual car depreciation by brand, with intervals: Ford 9.5%, BMW 9.3%, Audi 9.0%, Mercedes-Benz 8.6%, Nissan 7.2%, and the lowest, Volkswagen, at 5.1%.",
            },
            caption: { es: "Carros: cuánto cuesta cada año de edad, por marca.", en: "Cars: what each year of age costs, by brand." },
          },
          {
            src: "/img/projects/autovalor-error-segmento-carros.webp",
            w: 1098,
            h: 875,
            alt: {
              es: "Error del modelo por marca de carro, todas por debajo de la meta de 15 %: de 14,1 % en Mercedes-Benz a 5,8 % en Mazda.",
              en: "Model error by car brand, all below the 15% target: from 14.1% for Mercedes-Benz to 5.8% for Mazda.",
            },
            caption: { es: "Dónde se equivoca el modelo: todas las marcas quedan bajo la meta de 15 %.", en: "Where the model is wrong: every brand stays under the 15% target." },
          },
          {
            src: "/img/projects/autovalor-valor-retenido-motos.webp",
            w: 941,
            h: 639,
            alt: {
              es: "Curvas de valor retenido de motos por marca a 10 años: Yamaha conserva cerca del 92 % y Bajaj cerca del 51 %.",
              en: "Motorcycle value-retained curves by brand over 10 years: Yamaha keeps about 92% and Bajaj about 51%.",
            },
            caption: { es: "Motos: valor que conserva cada marca con los años.", en: "Motorcycles: the value each brand keeps over the years." },
          },
        ],
      },
      gallery: {
        kind: "shots",
        items: [
          {
            light: "/img/projects/autovalor-mercado-claro.webp",
            dark: "/img/projects/autovalor-mercado-oscuro.webp",
            w: 1440,
            h: 900,
            alt: { es: "Pantalla Mercado de AutoValor con curvas de depreciación por marca.", en: "AutoValor's Market screen with depreciation curves by brand." },
            caption: { es: "Mercado: depreciación, kilometraje, diferencias regionales y dónde se equivoca el modelo.", en: "Market: depreciation, mileage, regional gaps and where the model is wrong." },
          },
          {
            light: "/img/projects/autovalor-metodologia-claro.webp",
            dark: "/img/projects/autovalor-metodologia-oscuro.webp",
            w: 1440,
            h: 900,
            alt: { es: "Pantalla Metodología de AutoValor con datos, modelos y métricas.", en: "AutoValor's Methodology screen with data, models and metrics." },
            caption: { es: "Metodología: datos, modelos, métricas fuera de muestra y limitaciones.", en: "Methodology: data, models, out-of-sample metrics and limitations." },
          },
        ],
      },
    },
    limits: [
      {
        es: "Son precios pedidos, no de cierre: en un mercado donde se regatea, lo que se pide queda por encima de lo que se paga.",
        en: "These are asking prices, not closing prices: in a market where people haggle, the ask sits above what gets paid.",
      },
      {
        es: "Los datos son un corte fijo de cuatro capturas (30 sep — 19 oct 2026). Las cifras describen el mercado de esas semanas.",
        en: "The data is a fixed cut of four captures (Sep 30 — Oct 19, 2026). The figures describe the market of those weeks.",
      },
    ],
    learned: [
      {
        es: "Un rango de predicción es una promesa medible. Calibrarlo y verificar que se cumple fuera de muestra vale más que bajar un punto el error.",
        en: "A prediction range is a measurable promise. Calibrating it and checking it holds out of sample is worth more than shaving a point off the error.",
      },
      {
        es: "Las fugas de datos se esconden en detalles del dominio, como un mismo carro con otro ID. Hay que entender los datos antes de confiar en una métrica.",
        en: "Data leaks hide in domain details, like the same car under a different ID. You have to understand the data before trusting a metric.",
      },
      {
        es: "Saber cuándo cerrar un proyecto también es una decisión de ingeniería.",
        en: "Knowing when to close a project is an engineering decision too.",
      },
    ],
    next: [
      {
        es: "Si apareciera una fuente legítima de precios de cierre, reentrenar con ella y medir la brecha frente al precio pedido.",
        en: "If a legitimate source of closing prices appeared, retrain on it and measure the gap against the asking price.",
      },
      {
        es: "Con varios meses de histórico, publicar el índice mensual de precios, que ya está construido y probado.",
        en: "With several months of history, publish the monthly price index, which is already built and tested.",
      },
    ],
  },

  /* ───────────────────────────── BNPL ───────────────────────────── */
  {
    slug: "bnpl-support-assistant",
    name: "BNPL Support Assistant",
    tag: { es: "IA · LLMs · Evaluación", en: "AI · LLMs · Evaluation" },
    year: "2026",
    status: { es: "Completo", en: "Complete" },
    role: { es: "Diseño, desarrollo y evaluación", en: "Design, development and evaluation" },
    lede: {
      es: "Un asistente de soporte para pagos a cuotas que responde con citas a la política exacta, verifica identidad en código y se abstiene cuando no tiene la respuesta.",
      en: "A support assistant for buy-now-pay-later payments that answers with citations to the exact policy, verifies identity in code, and abstains when it doesn't know.",
    },
    stack: ["Python", "RAG", "BM25", "Tool calling", "FastAPI", "pytest", "Groq"],
    links: { repo: BN, extra: [{ label: { es: "Análisis de la iteración", en: "Iteration write-up" }, href: `${BN}/blob/main/ITERATION.md` }] },
    metrics: [
      { value: { es: "5 → 12", en: "5 → 12" }, label: { es: "casos de evaluación superados de 15, tras una iteración", en: "evaluation cases passed out of 15, after one iteration" } },
      { value: { es: "0 → 2", en: "0 → 2" }, label: { es: "preguntas sin respuesta en la política, ahora rechazadas bien", en: "questions the policy doesn't cover, now correctly declined" } },
      { value: { es: "3 / 3", en: "3 / 3" }, label: { es: "casos de datos personales protegidos en todas las versiones", en: "personal-data cases protected in every version" } },
      { value: { es: "25", en: "25" }, label: { es: "pruebas automatizadas, sin red", en: "automated tests, no network" } },
    ],
    hero: {
      kind: "diagram",
      name: "bnpl-versions",
      caption: {
        es: "Mismo modelo y mismo arnés de evaluación: los casos completos subieron mucho más que los checks individuales.",
        en: "Same model and same evaluation harness: whole cases rose far more than individual checks.",
      },
    },
    problem: [
      {
        es: "Un asistente que habla de dinero no puede inventar. Una respuesta fluida y segura pero equivocada sobre un cargo o un reembolso es peor que ninguna respuesta.",
        en: "An assistant that talks about money can't make things up. A fluent, confident, wrong answer about a fee or a refund is worse than no answer.",
      },
      {
        es: "El reto era construir uno que respondiera solo desde la política y los datos del pedido, que citara su fuente y que supiera decir \"no tengo una política que cubra esto\".",
        en: "The challenge was to build one that answers only from the policy and the order data, cites its source, and knows how to say \"I don't have a policy that covers this\".",
      },
    ],
    built: [
      {
        title: { es: "Un corpus escrito para atrapar errores", en: "A corpus written to catch errors" },
        body: {
          es: "Escribí la política antes que cualquier prompt, con trampas sembradas: vacíos deliberados, reglas que se anulan entre documentos y temas que no cubre.",
          en: "I wrote the policy before any prompt, with planted traps: deliberate gaps, rules that override each other across documents, and topics it doesn't cover.",
        },
      },
      {
        title: { es: "Recuperación con citas", en: "Retrieval with citations" },
        body: {
          es: "Fragmentos por sección y BM25 local. Cada respuesta cita la sección exacta, legible para una persona que la revise.",
          en: "Section-level chunks and local BM25. Every answer cites the exact section, readable by a human reviewer.",
        },
      },
      {
        title: { es: "Herramientas con reglas en código", en: "Tools with rules in code" },
        body: {
          es: "search_policies y lookup_order. Para ver un pedido hay que dar ID y correo coincidentes: el control vive en el repositorio, no en el prompt.",
          en: "search_policies and lookup_order. Seeing an order requires a matching ID and email: the control lives in the repository, not the prompt.",
        },
      },
      {
        title: { es: "Arnés de evaluación propio", en: "A custom evaluation harness" },
        body: {
          es: "15 casos y 52 checks programáticos por categoría: datos personales, preguntas sin respuesta, reglas que se anulan, escalamiento y política simple.",
          en: "15 cases and 52 programmatic checks by category: personal data, unanswerable questions, overriding rules, escalation and plain policy.",
        },
      },
      {
        title: { es: "Proveedor de LLM intercambiable", en: "Swappable LLM provider" },
        body: {
          es: "Una sola interfaz para OpenRouter, Groq, Cerebras y Google, más un cliente offline determinista para pruebas sin red.",
          en: "One interface for OpenRouter, Groq, Cerebras and Google, plus a deterministic offline client for tests without network.",
        },
      },
    ],
    decisions: [
      {
        title: { es: "La autorización va en código, nunca en el prompt", en: "Authorization lives in code, never in the prompt" },
        body: {
          es: "Un prompt es una petición, no un control. Los 3 casos de datos personales pasaron incluso con el prompt más débil, y siguieron pasando con un modelo cinco veces más pequeño.",
          en: "A prompt is a request, not a control. All 3 personal-data cases passed even with the weakest prompt, and kept passing on a model a fifth the size.",
        },
        source: { label: "DECISIONS.md · 3", href: `${BN}/blob/main/DECISIONS.md` },
      },
      {
        title: { es: "BM25 en lugar de embeddings, y medir lo que eso cuesta", en: "BM25 instead of embeddings, and measuring the cost" },
        body: {
          es: "Citas legibles y una evaluación determinista. El costo apareció: \"waive\" y \"waiver\" no coincidían. Lo documenté como la parte más débil del diseño.",
          en: "Readable citations and a deterministic eval. The cost showed up: \"waive\" and \"waiver\" didn't match. I documented it as the weakest part of the design.",
        },
        source: { label: "DECISIONS.md · 2", href: `${BN}/blob/main/DECISIONS.md` },
      },
      {
        title: { es: "Corregir la causa, no el síntoma", en: "Fix the cause, not the symptom" },
        body: {
          es: "Dos fallas parecían de prompt, pero la sección correcta nunca llegaba al contexto. Las arreglé con stemming en la búsqueda e inyectando la política según el estado del pedido, no con más instrucciones.",
          en: "Two failures looked like prompt issues, but the right section never reached the context. I fixed them with stemming in retrieval and status-driven policy injection, not more instructions.",
        },
        source: { label: "ITERATION.md", href: `${BN}/blob/main/ITERATION.md` },
      },
      {
        title: { es: "Abstenerse es un comportamiento medido", en: "Abstaining is a measured behaviour" },
        body: {
          es: "Dos casos existen solo para comprobar que el asistente rechaza lo que la política no cubre. Para pagos, prefiero poco útil y honesto antes que seguro y equivocado.",
          en: "Two cases exist only to check that the assistant declines what the policy doesn't cover. For payments, I'd rather be unhelpful and honest than confident and wrong.",
        },
        source: { label: "DECISIONS.md · 7", href: `${BN}/blob/main/DECISIONS.md` },
      },
    ],
    results: {
      intro: [
        {
          es: "Las cuatro fallas principales quedaron resueltas: dejó de inventar políticas, de llenar vacíos, de ignorar reglas que se anulan y de responder sin citas.",
          en: "The four headline failures were fixed: it stopped inventing policy, filling gaps, ignoring overriding rules and answering without citations.",
        },
      ],
      visual: {
        kind: "diagram",
        name: "bnpl-categories",
        caption: {
          es: "Casos superados por categoría. Datos personales nunca falló; lo que más mejoró fue rechazar lo que la política no cubre.",
          en: "Cases passed by category. Personal data never failed; the biggest gain was declining what the policy doesn't cover.",
        },
      },
      points: [
        {
          es: "Una prueba empeoró: el comprador dice \"nunca llegó\" y la política dice \"no entregado\". V2 se niega a adivinar en vez de responder con secciones que no aplican. La falla ya existía; V2 la hizo visible.",
          en: "One case got worse: the shopper says \"never arrived\" and the policy says \"not delivered\". V2 refuses to guess instead of answering from unrelated sections. The failure was always there; V2 made it visible.",
        },
        {
          es: "Dos \"fallas\" eran errores de mi propio arnés: un check que no veía la negación y un espacio Unicode. Corregí el arnés y volví a correr V1 y V2 para que la comparación fuera justa.",
          en: "Two \"failures\" were bugs in my own harness: a check blind to negation and a Unicode space. I fixed it and re-ran V1 and V2 so the comparison was fair.",
        },
        {
          es: "Con un modelo cinco veces más pequeño, las correcciones hechas en código se mantuvieron completas y las hechas en el prompt se degradaron.",
          en: "On a model a fifth the size, the fixes made in code held completely and the ones made in the prompt degraded.",
        },
      ],
    },
    limits: [
      {
        es: "Con 15 casos, un caso es 6,7 puntos. Dos corridas de V2 dieron 12 y 13 de 15: la dirección y el patrón por categoría se reproducen; la cifra exacta, no.",
        en: "With 15 cases, one case is 6.7 points. Two V2 runs scored 12 and 13 out of 15: the direction and category pattern reproduce; the exact figure doesn't.",
      },
    ],
    learned: [
      {
        es: "Lo que de verdad importa (no filtrar datos, no saltarse una regla) tiene que vivir en la capa de herramientas, no en el prompt.",
        en: "What really matters (not leaking data, not skipping a rule) belongs in the tool layer, not the prompt.",
      },
      {
        es: "Cuando el modelo y el arnés de evaluación no coinciden, el arnés también es sospechoso.",
        en: "When the model and the eval harness disagree, the harness is a suspect too.",
      },
    ],
    next: [
      {
        es: "Trabajar la recuperación, no el prompt: un mapa de sinónimos como arreglo rápido y búsqueda híbrida BM25 + embeddings como arreglo real.",
        en: "Work on retrieval, not the prompt: a synonym map as the quick fix and hybrid BM25 + embeddings as the real one.",
      },
      {
        es: "Dejar que el modelo reescriba la consulta antes de buscar, y correr cada caso tres veces para reportar la variación.",
        en: "Let the model rewrite the query before retrieving, and run each case three times to report the spread.",
      },
    ],
  },

  /* ───────────────────────────── Notes App ───────────────────────────── */
  {
    slug: "notes-app",
    name: "Notes App",
    tag: { es: "Full-stack", en: "Full-stack" },
    year: "2026",
    status: { es: "Completo y en producción", en: "Complete and live" },
    role: { es: "Desarrollo full-stack y despliegue", en: "Full-stack development and deployment" },
    lede: {
      es: "Notas con categorías y archivo: una API en NestJS sobre PostgreSQL y una SPA en Next.js, conectadas solo por REST.",
      en: "Notes with categories and archiving: a NestJS API on PostgreSQL and a Next.js SPA, connected only over REST.",
    },
    stack: ["TypeScript", "NestJS", "TypeORM", "PostgreSQL", "Next.js", "Docker", "Jest", "Playwright", "Storybook"],
    links: {
      repo: "https://github.com/JoseRomo16/ensolvers-deploy",
      demo: "https://ensolvers-deploy-ten.vercel.app",
      demoNote: {
        es: "La API duerme tras un rato sin uso: la primera carga puede tardar unos 30 segundos.",
        en: "The API sleeps after inactivity: the first load can take about 30 seconds.",
      },
    },
    metrics: [
      { value: { es: "36", en: "36" }, label: { es: "pruebas: 24 de backend y 12 E2E en navegador", en: "tests: 24 backend and 12 browser E2E" } },
      { value: { es: "1", en: "1" }, label: { es: "comando para levantarlo todo con Docker", en: "command to start everything with Docker" } },
      { value: { es: "3", en: "3" }, label: { es: "servicios en planes gratuitos: Vercel, Render y Supabase", en: "services on free plans: Vercel, Render and Supabase" } },
    ],
    hero: {
      kind: "shots",
      items: [
        {
          light: "/img/projects/notes-claro.webp",
          dark: "/img/projects/notes-oscuro.webp",
          w: 1920,
          h: 1200,
          alt: {
            es: "Notes App: panel de categorías, formulario de nueva nota, pestañas Activas y Archivadas, filtro por categoría y tarjetas de notas.",
            en: "Notes App: categories panel, new-note form, Active and Archived tabs, a category filter and note cards.",
          },
          caption: {
            es: "La aplicación con datos de ejemplo: categorías, notas activas y archivadas y filtro por categoría.",
            en: "The app with sample data: categories, active and archived notes, and a category filter.",
          },
        },
      ],
    },
    problem: [
      {
        es: "Una aplicación de notas parece simple, y por eso sirve para mostrar lo que no se ve: capas separadas, migraciones reales, pruebas contra una base de datos de verdad y un despliegue que cualquiera pueda reproducir.",
        en: "A notes app looks simple, which is exactly why it shows what usually goes unseen: separated layers, real migrations, tests against a real database and a deployment anyone can reproduce.",
      },
    ],
    built: [
      {
        title: { es: "Capas que no se mezclan", en: "Layers that don't mix" },
        body: {
          es: "Cada dominio de NestJS tiene controlador, servicio y repositorio. Solo el repositorio habla con TypeORM, y los módulos se comunican por servicios.",
          en: "Each NestJS domain has a controller, service and repository. Only the repository talks to TypeORM, and modules talk through services.",
        },
      },
      {
        title: { es: "Datos y migraciones", en: "Data and migrations" },
        body: {
          es: "PostgreSQL 16 con migraciones y un seed idempotentes, y relación muchos a muchos entre notas y categorías con borrado en cascada.",
          en: "PostgreSQL 16 with idempotent migrations and seed, and a many-to-many relation between notes and categories with cascading deletes.",
        },
      },
      {
        title: { es: "Arranque en un comando", en: "One-command start" },
        body: {
          es: "start.sh revisa puertos, crea los .env, aplica migraciones, siembra datos y espera el health check antes de abrir la SPA.",
          en: "start.sh checks ports, creates the .env files, applies migrations, seeds data and waits for the health check before opening the SPA.",
        },
      },
      {
        title: { es: "Pruebas en tres niveles", en: "Tests at three levels" },
        body: {
          es: "Unitarias del servicio con repositorios simulados, E2E de la API contra una base temporal propia y 12 pruebas de Playwright sobre la SPA real.",
          en: "Service unit tests with mocked repositories, API E2E against a throwaway database of its own, and 12 Playwright tests on the real SPA.",
        },
      },
    ],
    builtVisual: {
      kind: "diagram",
      name: "notes-architecture",
      caption: {
        es: "Dos aplicaciones independientes que solo se hablan por REST, cada una en su plataforma.",
        en: "Two independent apps that only talk over REST, each on its own platform.",
      },
    },
    decisions: [
      {
        title: { es: "Separar capas para poder cambiar la base de datos", en: "Separate layers so the database can change" },
        body: {
          es: "Pasar de SQLite a PostgreSQL solo tocó el driver, la migración y la configuración. Ningún controlador, servicio ni prueba cambió.",
          en: "Moving from SQLite to PostgreSQL only touched the driver, the migration and the config. No controller, service or test changed.",
        },
      },
      {
        title: { es: "Archivar es un estado, no otra tabla", en: "Archiving is a state, not another table" },
        body: {
          es: "Una nota archivada es la misma nota en otro estado, y las historias de usuario solo piden dos listas. Un booleano lo resuelve sin duplicar datos.",
          en: "An archived note is the same note in a different state, and the user stories only ask for two lists. A boolean handles it without duplicating data.",
        },
      },
      {
        title: { es: "Pruebas que no tocan los datos de desarrollo", en: "Tests that never touch development data" },
        body: {
          es: "La suite de la API crea y borra su propia base de datos en cada corrida, así que se puede ejecutar sin miedo en cualquier máquina.",
          en: "The API suite creates and drops its own database on every run, so it can run safely on any machine.",
        },
      },
    ],
    results: {
      intro: [
        {
          es: "Las dos fases del reto quedaron completas: notas con crear, editar, borrar y archivar, y categorías con asignación y filtro. Todo corre en planes gratuitos y se puede probar en vivo.",
          en: "Both phases of the exercise are complete: notes with create, edit, delete and archive, and categories with assignment and filtering. Everything runs on free plans and can be tried live.",
        },
      ],
    },
    learned: [
      {
        es: "Una buena separación de capas se nota el día que hay que cambiar algo grande y casi nada se rompe.",
        en: "Good layer separation shows on the day you change something big and almost nothing breaks.",
      },
    ],
    next: [
      {
        es: "Agregar autenticación (era opcional en el reto) y búsqueda de texto completo en PostgreSQL.",
        en: "Add authentication (optional in the exercise) and full-text search in PostgreSQL.",
      },
    ],
  },

  /* ───────────────────────────── K-means ───────────────────────────── */
  {
    slug: "customer-segmentation",
    name: { es: "Segmentación de clientes", en: "Customer segmentation" },
    tag: { es: "Data Science", en: "Data Science" },
    year: "2026",
    status: { es: "Completo", en: "Complete" },
    role: { es: "Análisis y modelado", en: "Analysis and modelling" },
    lede: {
      es: "200 clientes de un centro comercial agrupados en 5 segmentos con K-means, cada uno con una lectura de negocio y una estrategia.",
      en: "200 shopping-mall customers grouped into 5 segments with K-means, each with a business reading and a strategy.",
    },
    stack: ["Python", "pandas", "scikit-learn", "seaborn", "Jupyter"],
    links: { repo: "https://github.com/JoseRomo16/customer-segmentation-kmeans" },
    metrics: [
      { value: { es: "5", en: "5" }, label: { es: "segmentos con estrategia de negocio", en: "segments with a business strategy" } },
      { value: { es: "0,55", en: "0.55" }, label: { es: "coeficiente de silueta, el más alto entre K = 2 y 10", en: "silhouette score, the highest between K = 2 and 10" } },
      { value: { es: "4.512", en: "4,512" }, label: { es: "impresiones del post en LinkedIn", en: "impressions of the LinkedIn post" } },
    ],
    hero: {
      kind: "image",
      src: "/img/kmeans.webp",
      w: 1100,
      h: 724,
      alt: {
        es: "Dispersión de ingreso anual contra puntuación de gasto, con cinco clústeres de colores y sus centroides.",
        en: "Scatter plot of annual income against spending score, with five coloured clusters and their centroids.",
      },
      caption: { es: "Los cinco segmentos sobre ingreso anual y puntuación de gasto.", en: "The five segments over annual income and spending score." },
    },
    problem: [
      {
        es: "Un centro comercial trata a todos sus clientes igual. La pregunta era si los datos de ingreso y gasto separan grupos con comportamientos distintos, y qué hacer con cada uno.",
        en: "A shopping mall treats all its customers the same. The question was whether income and spending data separate groups with different behaviour, and what to do with each.",
      },
    ],
    built: [
      {
        title: { es: "Exploración", en: "Exploration" },
        body: {
          es: "Distribuciones, género, correlaciones y la relación entre ingreso y gasto, con un informe en PDF.",
          en: "Distributions, gender, correlations and the income–spending relationship, with a PDF report.",
        },
      },
      {
        title: { es: "Modelo", en: "Model" },
        body: {
          es: "Escalamiento, selección de K con dos métodos, entrenamiento y predicción sobre 5 clientes apartados como prueba.",
          en: "Scaling, choosing K with two methods, training, and prediction on 5 customers held out as a test.",
        },
      },
      {
        title: { es: "Lectura de negocio", en: "Business reading" },
        body: {
          es: "Cada segmento con nombre, perfil y una acción concreta de marketing.",
          en: "Each segment with a name, a profile and a concrete marketing action.",
        },
      },
    ],
    decisions: [
      {
        title: { es: "Dos criterios para elegir K", en: "Two criteria to choose K" },
        body: {
          es: "El método del codo sugiere dónde cae la ganancia, pero es subjetivo. Lo confirmé con el coeficiente de silueta, que alcanza su máximo en K = 5.",
          en: "The elbow method suggests where the gain drops off, but it's subjective. I confirmed it with the silhouette score, which peaks at K = 5.",
        },
      },
      {
        title: { es: "Solo las variables que segmentan", en: "Only the variables that segment" },
        body: {
          es: "Usé ingreso y puntuación de gasto y escalé ambos. Así ninguna domina la distancia por estar en otra unidad.",
          en: "I used income and spending score and scaled both, so neither dominates the distance by being in a different unit.",
        },
      },
    ],
    results: {
      visual: {
        kind: "diagram",
        name: "kmeans-silhouette",
        caption: { es: "Coeficiente de silueta para cada K. El máximo está en K = 5.", en: "Silhouette score for each K. It peaks at K = 5." },
      },
      table: {
        head: [{ es: "Segmento", en: "Segment" }, { es: "Ingreso anual", en: "Annual income" }, { es: "Gasto", en: "Spending" }, { es: "Qué hacer", en: "What to do" }],
        rows: [
          [{ es: "Objetivo", en: "Target" }, { es: "Alto, ~86 k$", en: "High, ~$86k" }, { es: "Alto, ~82", en: "High, ~82" }, { es: "Fidelizar", en: "Retain" }],
          [{ es: "Oportunidad", en: "Opportunity" }, { es: "Alto, ~89 k$", en: "High, ~$89k" }, { es: "Bajo, ~18", en: "Low, ~18" }, { es: "Activar el gasto", en: "Unlock spending" }],
          [{ es: "Impulsivo", en: "Impulsive" }, { es: "Bajo, ~26 k$", en: "Low, ~$26k" }, { es: "Alto, ~79", en: "High, ~79" }, { es: "Promociones", en: "Promotions" }],
          [{ es: "Cauteloso", en: "Cautious" }, { es: "Bajo, ~26 k$", en: "Low, ~$26k" }, { es: "Bajo, ~22", en: "Low, ~22" }, { es: "Menor prioridad", en: "Lower priority" }],
          [{ es: "Estándar", en: "Standard" }, { es: "Medio, ~55 k$", en: "Medium, ~$55k" }, { es: "Medio, ~50", en: "Medium, ~50" }, { es: "Mantener", en: "Maintain" }],
        ],
      },
      gallery: {
        kind: "image",
        src: "/img/projects/kmeans-codo.webp",
        w: 783,
        h: 479,
        narrow: true,
        alt: { es: "Gráfico del método del codo: la inercia cae rápido hasta K = 5 y luego se aplana.", en: "Elbow-method chart: inertia drops fast up to K = 5 and then flattens." },
        caption: { es: "Método del codo: la inercia deja de caer con fuerza en K = 5.", en: "Elbow method: inertia stops dropping sharply at K = 5." },
      },
    },
    learned: [
      {
        es: "Un clúster vale lo que vale su interpretación. El modelo es la parte fácil; nombrar el segmento y decidir qué hacer con él es el trabajo.",
        en: "A cluster is worth what its interpretation is worth. The model is the easy part; naming the segment and deciding what to do with it is the work.",
      },
    ],
    next: [
      {
        es: "Sumar edad y frecuencia de compra (RFM con transacciones reales) y comparar con modelos de mezcla gaussiana.",
        en: "Add age and purchase frequency (RFM with real transactions) and compare against Gaussian mixture models.",
      },
    ],
  },

  /* ───────────────────────────── Finanzas ───────────────────────────── */
  {
    slug: "financial-assets",
    name: { es: "Análisis de activos financieros", en: "Financial asset analysis" },
    tag: { es: "Análisis cuantitativo", en: "Quantitative analysis" },
    year: "2026",
    status: { es: "Completo", en: "Complete" },
    role: { es: "Análisis y desarrollo", en: "Analysis and development" },
    lede: {
      es: "Rendimiento y riesgo de 9 activos bajo un mismo marco: de Apple y Bitcoin al COLCAP, el café y el dólar en pesos.",
      en: "Return and risk for 9 assets under one framework: from Apple and Bitcoin to COLCAP, coffee and the dollar in pesos.",
    },
    stack: ["Python", "pandas", "NumPy", "SciPy", "yfinance", "Plotly", "pytest"],
    links: { repo: "https://github.com/JoseRomo16/financial-asset-analysis/tree/master" },
    metrics: [
      { value: { es: "9", en: "9" }, label: { es: "activos de 6 clases distintas", en: "assets across 6 classes" } },
      { value: { es: "5", en: "5" }, label: { es: "métricas de riesgo y rendimiento", en: "risk and return metrics" } },
      { value: { es: "11", en: "11" }, label: { es: "pruebas unitarias del módulo de métricas", en: "unit tests for the metrics module" } },
    ],
    hero: {
      kind: "diagram",
      name: "finance-universe",
      caption: {
        es: "El universo del análisis: activos globales y colombianos comparados con las mismas métricas.",
        en: "The universe of the analysis: global and Colombian assets compared with the same metrics.",
      },
    },
    problem: [
      {
        es: "Comparar una acción, una criptomoneda, una divisa y un commodity no es directo: tienen volatilidades y comportamientos muy distintos. Quería un marco común y reproducible para medirlos igual.",
        en: "Comparing a stock, a cryptocurrency, a currency and a commodity isn't straightforward: their volatility and behaviour differ a lot. I wanted a common, reproducible framework to measure them the same way.",
      },
    ],
    built: [
      {
        title: { es: "Flujo de datos reproducible", en: "Reproducible data flow" },
        body: {
          es: "Descarga, limpieza y persistencia de precios históricos en un módulo de Python, no en celdas sueltas de notebook.",
          en: "Downloading, cleaning and persisting historical prices in a Python module, not in loose notebook cells.",
        },
      },
      {
        title: { es: "Módulo de métricas con pruebas", en: "A tested metrics module" },
        body: {
          es: "Retornos aritméticos y logarítmicos, volatilidad anualizada, drawdown máximo, Sharpe y VaR histórico al 95 %, con 11 pruebas unitarias.",
          en: "Arithmetic and log returns, annualised volatility, maximum drawdown, Sharpe and 95% historical VaR, with 11 unit tests.",
        },
      },
      {
        title: { es: "Cuatro notebooks y visualizaciones", en: "Four notebooks and visualisations" },
        body: {
          es: "Descarga, retornos, riesgo y un tablero final, con gráficos estáticos y versiones interactivas en Plotly.",
          en: "Download, returns, risk and a final dashboard, with static charts and interactive Plotly versions.",
        },
      },
    ],
    decisions: [
      {
        title: { es: "La lógica en src/, los notebooks solo la usan", en: "Logic in src/, notebooks only use it" },
        body: {
          es: "Así las métricas se prueban una vez y se reutilizan en los siguientes proyectos del portafolio financiero.",
          en: "That way the metrics are tested once and reused in the next projects of the finance portfolio.",
        },
      },
      {
        title: { es: "Incluir activos colombianos", en: "Include Colombian assets" },
        body: {
          es: "COLCAP, café y USD/COP ponen el análisis en un contexto que conozco como economista y que pocos portafolios cubren.",
          en: "COLCAP, coffee and USD/COP put the analysis in a context I know as an economist and that few portfolios cover.",
        },
      },
    ],
    results: {
      intro: [
        {
          es: "Una base de código reutilizable y probada para medir rendimiento y riesgo, que es el punto de partida de mi siguiente proyecto: replicar factores de papers de finanzas cuantitativas con backtesting.",
          en: "A reusable, tested codebase for measuring return and risk, which is the starting point of my next project: replicating factors from quantitative-finance papers with backtesting.",
        },
      ],
    },
    learned: [
      {
        es: "Una métrica de riesgo sin pruebas es una opinión. Probar Sharpe o VaR con casos conocidos evita errores silenciosos que cambian conclusiones.",
        en: "A risk metric without tests is an opinion. Testing Sharpe or VaR against known cases avoids silent errors that change conclusions.",
      },
    ],
    next: [
      {
        es: "Un tablero interactivo para elegir activos y periodo, y el paso a factores y backtesting en Finance Lab.",
        en: "An interactive dashboard to pick assets and period, and the move to factors and backtesting in Finance Lab.",
      },
    ],
  },
];

export const getProject = (slug: string) => PROJECTS.find((p) => p.slug === slug);

/** Proyectos simples sin caso de estudio (opcional). Aparecen como tarjetas al final. */
export const EXTRA_PROJECTS: { tag: T; name: Tx; body: T; stack: string[]; repo: string; demo?: string }[] = [];

export const CASE_UI = {
  back: { es: "Todos los proyectos", en: "All projects" },
  caseStudy: { es: "Ver caso de estudio", en: "Read case study" },
  code: { es: "Ver código", en: "View code" },
  demo: { es: "Abrir demo", en: "Open demo" },
  live: { es: "En vivo", en: "Live" },
  meta: {
    role: { es: "Rol", en: "Role" },
    year: { es: "Año", en: "Year" },
    status: { es: "Estado", en: "Status" },
    stack: { es: "Stack", en: "Stack" },
  },
  sections: {
    problem: { es: "El problema", en: "The problem" },
    built: { es: "Qué construí", en: "What I built" },
    decisions: { es: "Decisiones clave", en: "Key decisions" },
    results: { es: "Resultados", en: "Results" },
    limits: { es: "Límites, dichos de frente", en: "Limits, stated plainly" },
    learned: { es: "Lo que aprendí", en: "What I learned" },
    next: { es: "Qué haría después", en: "What I'd do next" },
  },
  nextProject: { es: "Siguiente proyecto", en: "Next project" },
  metric: { es: "Métrica", en: "Metric" },
  toc: { es: "En esta página", en: "On this page" },
  /** Visor de imágenes de los casos de estudio. "{i}" y "{n}" se reemplazan por la posición. */
  lightbox: {
    open: { es: "Ampliar imagen", en: "Enlarge image" },
    close: { es: "Cerrar", en: "Close" },
    prev: { es: "Imagen anterior", en: "Previous image" },
    next: { es: "Imagen siguiente", en: "Next image" },
    counter: { es: "{i} de {n}", en: "{i} of {n}" },
    dialog: { es: "Visor de imágenes", en: "Image viewer" },
  },
  talk: { es: "¿Te interesa cómo trabajo?", en: "Interested in how I work?" },
  talkBody: {
    es: "Escríbeme y conversamos sobre tu equipo y tus datos.",
    en: "Write to me and let's talk about your team and your data.",
  },
};
