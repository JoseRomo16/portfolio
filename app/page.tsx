"use client";

/**
 * Landing de Jose Luis Romo Melo — archivo único (React + Tailwind CSS).
 * Contenido bilingüe ES/EN en el objeto `C`. Para editar textos, cambia solo `C`.
 */

import { useEffect, useState, type ReactNode } from "react";

type Lang = "es" | "en";
type T = { es: string; en: string };
type MoreProject = { tag: T; name: T | string; body: T; stack: string[]; repo: string; demo?: string };

/* ───────────────────────────── Contenido ───────────────────────────── */

const LINKS = {
  email: "joseluisabc123@gmail.com",
  whatsapp: "https://wa.me/573164855814",
  whatsappLabel: "+57 316 485 5814",
  linkedin: "https://www.linkedin.com/in/jose-luis-romo-dev-data",
  github: "https://github.com/JoseRomo16",
  cv: "/cv/Jose_Luis_Romo_CV_EN.pdf",
  efset: "https://cert.efset.org/en/b5TZpS",
};

const C = {
  nav: {
    projects: { es: "Proyectos", en: "Projects" },
    experience: { es: "Experiencia", en: "Experience" },
    skills: { es: "Habilidades", en: "Skills" },
    education: { es: "Formación", en: "Education" },
    contact: { es: "Contacto", en: "Contact" },
  },
  hero: {
    status: { es: "Disponible para roles remotos", en: "Open to remote roles" },
    title: {
      es: "IA y Data Science con criterio de economista.",
      en: "AI and data science with an economist's judgment.",
    },
    body: {
      es: "Construyo asistentes con LLMs, modelos de machine learning y pipelines de datos, y los conecto con decisiones de negocio. También trabajo como Data Analyst y desarrollador de software.",
      en: "I build LLM assistants, machine-learning models and data pipelines, and tie them to business decisions. I also work as a data analyst and software developer.",
    },
    contact: { es: "Contactar", en: "Get in touch" },
    projects: { es: "Ver proyectos", en: "See projects" },
    cv: { es: "CV en inglés (PDF)", en: "CV (PDF)" },
    location: { es: "Pasto, Colombia", en: "Pasto, Colombia" },
  },
  stats: [
    { key: "hours", value: { es: "4.000+ h", en: "4,000+ h" }, label: { es: "de experiencia profesional", en: "of professional experience" } },
    { key: "english", value: { es: "C1", en: "C1" }, label: { es: "inglés certificado, EF SET", en: "certified English, EF SET" } },
    { key: "projects", value: { es: "", en: "" }, label: { es: "proyectos públicos en GitHub", en: "public projects on GitHub" } },
    { key: "certs", value: { es: "", en: "" }, label: { es: "certificaciones técnicas", en: "technical certifications" } },
  ],
  projects: {
    title: { es: "Proyectos.", en: "Projects." },
    lead: {
      es: "Código público, decisiones documentadas y resultados medidos.",
      en: "Public code, documented decisions and measured results.",
    },
    repo: { es: "Ver código", en: "View code" },
    demo: { es: "Abrir demo", en: "Open demo" },
    bnpl: {
      tag: { es: "IA · LLMs", en: "AI · LLMs" },
      name: "BNPL Support Assistant",
      body: {
        es: "Asistente de soporte que responde con citas a la política exacta, consulta pedidos con verificación de identidad en código y se abstiene cuando no tiene la respuesta.",
        en: "A support assistant that answers with citations to the exact policy, looks up orders behind a code-enforced identity check, and abstains when it doesn't know.",
      },
      chartTitle: { es: "Casos de evaluación superados", en: "Evaluation cases passed" },
      v1: { es: "V1 base", en: "V1 baseline" },
      v2: { es: "V2 tras una iteración", en: "V2 after one iteration" },
      points: [
        { es: "RAG con BM25 y tool calling", en: "RAG with BM25 and tool calling" },
        { es: "15 casos, 52 checks programáticos", en: "15 cases, 52 programmatic checks" },
        { es: "Proveedor de LLM intercambiable", en: "Swappable LLM provider" },
        { es: "Log de 7 decisiones técnicas", en: "Log of 7 technical decisions" },
      ],
      stack: ["Python", "FastAPI", "RAG", "LLM eval", "pytest"],
      repo: "https://github.com/JoseRomo16/bnpl-support-assistant",
    },
    autovalor: {
      tag: { es: "Data Engineering · ML", en: "Data Engineering · ML" },
      name: "AutoValor CO",
      body: {
        es: "Valoración de carros y motos usados en Colombia, con intervalo de predicción y explicación de cada precio.",
        en: "Used car and motorcycle valuation for Colombia, with a prediction interval and an explanation for every price.",
      },
      cars: { es: "carros", en: "cars" },
      motos: { es: "motos", en: "motorcycles" },
      clean: { es: "anuncios limpios y validados", en: "clean, validated listings" },
      phases: { es: "Fases", en: "Phases" },
      phaseNames: [
        { es: "Requisitos", en: "Scope" },
        { es: "Datos", en: "Data" },
        { es: "Modelo", en: "Model" },
        { es: "Resultados", en: "Results" },
        { es: "Producto", en: "Product" },
      ],
      done: 2,
      phaseSummary: {
        es: "Requisitos y datos listos. En curso: modelo.",
        en: "Scope and data done. In progress: model.",
      },
      stack: ["dbt", "DuckDB", "Pandera", "GitHub Actions", "LightGBM", "SHAP"],
      repo: "https://github.com/JoseRomo16/AutoValorCo",
    },
    notes: {
      tag: { es: "Full-stack", en: "Full-stack" },
      name: "Notes App",
      body: {
        es: "Notas con categorías y archivo. API en NestJS y PostgreSQL, SPA en Next.js, arranque en un comando con Docker.",
        en: "Notes with categories and archiving. NestJS + PostgreSQL API, Next.js SPA, one-command start with Docker.",
      },
      stack: ["TypeScript", "NestJS", "PostgreSQL", "Next.js", "Playwright"],
      live: { es: "En vivo", en: "Live" },
      deploy: [
        { part: "SPA", host: "Vercel" },
        { part: "REST API", host: "Render" },
        { part: "PostgreSQL", host: "Supabase" },
      ],
      repo: "https://github.com/JoseRomo16/ensolvers-deploy",
      demo: "https://ensolvers-deploy-ten.vercel.app",
    },
    kmeans: {
      tag: { es: "Data Science", en: "Data Science" },
      name: { es: "Segmentación de clientes", en: "Customer segmentation" },
      body: {
        es: "200 clientes en 5 segmentos con lectura de negocio. K = 5 validado por codo y silueta (0,55).",
        en: "200 customers in 5 segments with a business reading. K = 5 validated by elbow and silhouette (0.55).",
      },
      alt: {
        es: "Gráfico de dispersión de ingreso anual contra puntuación de gasto, con cinco clústeres de colores y sus centroides.",
        en: "Scatter plot of annual income against spending score, with five colored clusters and their centroids.",
      },
      stack: ["scikit-learn", "pandas", "seaborn"],
      repo: "https://github.com/JoseRomo16/customer-segmentation-kmeans",
    },
    finance: {
      tag: { es: "Análisis cuantitativo", en: "Quantitative analysis" },
      name: { es: "Activos financieros", en: "Financial assets" },
      body: {
        es: "Rendimiento y riesgo de 9 activos, de AAPL y Bitcoin al COLCAP, el café y el dólar en pesos.",
        en: "Return and risk for 9 assets, from AAPL and Bitcoin to COLCAP, coffee and USD/COP.",
      },
      metrics: ["Sharpe", "VaR 95 %", "Drawdown", { es: "Volatilidad", en: "Volatility" }],
      stack: ["pandas", "yfinance", "Plotly", "pytest"],
      repo: "https://github.com/JoseRomo16/financial-asset-analysis/tree/master",
    },
    /*
     * PROYECTOS NUEVOS: agrega objetos a este arreglo y aparecen solos como tarjetas
     * debajo de los proyectos destacados. El contador del inicio se actualiza solo.
     * Ejemplo:
     * {
     *   tag: { es: "IA · Agentes", en: "AI · Agents" },
     *   name: { es: "Mi proyecto", en: "My project" },
     *   body: { es: "Qué hace en una o dos frases.", en: "What it does in one or two sentences." },
     *   stack: ["Python", "LangGraph"],
     *   repo: "https://github.com/JoseRomo16/mi-proyecto",
     *   demo: "https://mi-proyecto.vercel.app", // opcional
     * },
     */
    more: [] as MoreProject[],
  },
  experience: {
    title: { es: "Experiencia.", en: "Experience." },
    lead: {
      es: "Equipos Scrum, software en producción y datos que sostienen decisiones.",
      en: "Scrum teams, production software and data that supports decisions.",
    },
    jobs: [
      {
        org: "GSE — Gestión de Seguridad Electrónica",
        meta: { es: "Bogotá · remoto", en: "Bogotá · remote" },
        roles: [
          {
            title: { es: "Analista de Documentación Técnica — Arquitectura y QA", en: "Technical Documentation Analyst — Architecture & QA" },
            period: { es: "Sep 2025 — Jul 2026", en: "Sep 2025 — Jul 2026" },
            points: [
              { es: "Diseñé diagramas BPMN, de clases, componentes y despliegue como referencia de arquitectura para todo el equipo.", en: "Designed BPMN, class, component and deployment diagrams as the architecture reference for the whole team." },
              { es: "Coordiné pruebas funcionales con líderes de proyecto y documenté resultados contra especificaciones de APIs REST en Postman.", en: "Coordinated functional testing with project leads and documented results against REST API specs in Postman." },
              { es: "Mantuve manuales, catálogos de servicios y acuerdos de interfaz en SharePoint y ReadTheDocs, con trazabilidad en todo el ciclo de vida.", en: "Maintained manuals, service catalogs and interface agreements in SharePoint and ReadTheDocs with full lifecycle traceability." },
            ],
          },
          {
            title: { es: "Desarrollador de Software Trainee — Frontend y QA", en: "Trainee Software Developer — Frontend & QA" },
            period: { es: "Mar 2025 — Sep 2025", en: "Mar 2025 — Sep 2025" },
            points: [
              { es: "Construí componentes en React integrados a la aplicación principal y validados en QA y PRE antes de cada release.", en: "Built React components integrated into the main application and validated in QA and PRE before each release." },
              { es: "Gestioné bases de datos SQL: consultas de validación, integridad de datos y reportes para el equipo.", en: "Managed SQL databases: validation queries, data integrity and team reporting." },
              { es: "Estructuré el backlog en Azure DevOps (épicas, features e historias de usuario) con criterios de aceptación.", en: "Structured the Azure DevOps backlog (epics, features, user stories) with acceptance criteria." },
            ],
          },
        ],
        tags: ["React", "SQL", "Azure DevOps", "Postman", "BPMN / UML", "Scrum"],
      },
      {
        org: "Universidad de Nariño",
        meta: { es: "Facultad de Ciencias Económicas · Pasto", en: "School of Economics · Pasto" },
        roles: [
          {
            title: { es: "Analista de Proyectos — Gestión de Datos", en: "Project Analyst — Data Management" },
            period: { es: "May 2024 — Oct 2025", en: "May 2024 — Oct 2025" },
            points: [
              { es: "Construí y mantuve bases de datos de estudiantes, docentes y cuentas de cobro, mejorando la precisión de la información para decisiones administrativas.", en: "Built and maintained student, faculty and billing databases, improving data accuracy for administrative decisions." },
              { es: "Apliqué análisis cuantitativo a la gestión administrativa de la facultad.", en: "Applied quantitative analysis to the school's administrative management." },
              { es: "Documenté proyectos educativos y coordiné eventos académicos dentro de presupuesto y cronograma.", en: "Documented educational projects and ran academic events on budget and on schedule." },
            ],
          },
        ],
        tags: ["Excel", { es: "Bases de datos", en: "Databases" }, { es: "Análisis cuantitativo", en: "Quantitative analysis" }],
      },
    ],
  },
  skills: {
    title: { es: "Habilidades.", en: "Skills." },
    lead: {
      es: "Del modelo económico al código en producción.",
      en: "From the economic model to production code.",
    },
    learning: { es: "Aprendiendo ahora", en: "Learning now" },
    groups: [
      { key: "ai", span: "lg:col-span-2", name: { es: "IA y LLMs", en: "AI & LLMs" }, items: ["RAG", "Tool calling", "LLM evaluation", "Prompt engineering", "OpenAI-compatible APIs"], learn: [{ es: "Agentes", en: "Agents" }, "AWS", "MLOps"] },
      { key: "ds", span: "", name: { es: "Data Science y ML", en: "Data science & ML" }, items: ["scikit-learn", "K-means", { es: "Regresión", en: "Regression" }, "SHAP", "LightGBM"] },
      { key: "de", span: "", name: { es: "Ingeniería de datos", en: "Data engineering" }, items: ["SQL", "dbt", "DuckDB", "Pandera", "Scraping"] },
      { key: "bi", span: "", name: { es: "Análisis y BI", en: "Analytics & BI" }, items: ["Power BI", { es: "Excel avanzado", en: "Advanced Excel" }, "pandas", "Stata", "R"] },
      { key: "dev", span: "lg:col-span-2", name: { es: "Desarrollo de software", en: "Software development" }, items: ["Python", "TypeScript", "React", "Next.js", "NestJS", "Node.js", "FastAPI", "Java", "C#"] },
      { key: "db", span: "", name: { es: "Bases de datos", en: "Databases" }, items: ["PostgreSQL", "MySQL", "MongoDB"] },
      { key: "ops", span: "lg:col-span-2", name: { es: "DevOps y calidad", en: "DevOps & quality" }, items: ["Docker", "Git", "GitHub Actions", "pytest", "Jest", "Playwright", "Postman"] },
      { key: "method", span: "sm:col-span-2 lg:col-span-2", name: { es: "Métodos", en: "Methods" }, items: ["Scrum", "Azure DevOps", "BPMN / UML", "REST APIs", { es: "Documentación técnica", en: "Technical documentation" }] },
    ],
  },
  education: {
    title: { es: "Formación.", en: "Education." },
    lead: {
      es: "Economía, software e ingeniería, en ese orden.",
      en: "Economics, software and engineering, in that order.",
    },
    degrees: [
      { name: { es: "Ingeniería de Software", en: "B.Sc. Software Engineering" }, org: "Politécnico Grancolombiano", period: { es: "2026 — 2028", en: "2026 — 2028" }, current: true },
      { name: { es: "Tecnólogo en Análisis y Desarrollo de Software", en: "Software Analysis & Development Technologist" }, org: "SENA", period: { es: "2023 — 2025", en: "2023 — 2025" } },
      { name: { es: "Economía", en: "B.A. Economics" }, org: "Universidad de Nariño", period: { es: "2018 — 2024", en: "2018 — 2024" } },
    ],
    current: { es: "En curso", en: "In progress" },
    certsTitle: { es: "Certificaciones", en: "Certifications" },
    // CERTIFICACIONES NUEVAS: agrega una línea { name, org, date }. El contador del inicio se actualiza solo.
    // `name` puede ser texto o { es, en }; `date` vacía ({ es: "", en: "" }) oculta la fecha.
    certs: [
      { name: "Associate Data Engineer in SQL", org: "DataCamp", date: { es: "Ago 2025", en: "Aug 2025" } },
      { name: "Intermediate Python", org: "DataCamp", date: { es: "Jul 2026", en: "Jul 2026" } },
      { name: { es: "Aplicación de la IA en la integración de datos", en: "AI applied to data integration" }, org: "SENA", date: { es: "Mar 2026", en: "Mar 2026" } },
      { name: { es: "Curso de Power BI", en: "Power BI" }, org: "Código Facilito", date: { es: "Jul 2026", en: "Jul 2026" } },
      { name: { es: "Excel avanzado: análisis y visualización", en: "Advanced Excel: analysis & visualization" }, org: "Código Facilito", date: { es: "Jul 2026", en: "Jul 2026" } },
      { name: { es: "Backend con Node.js y MongoDB", en: "Backend with Node.js & MongoDB" }, org: "SENA", date: { es: "Jul 2026", en: "Jul 2026" } },
      { name: { es: "Despliegue de aplicaciones con Docker", en: "Application deployment with Docker" }, org: "SENA", date: { es: "Sep 2025", en: "Sep 2025" } },
      { name: { es: "Construcción de bases de datos con MySQL", en: "Building databases with MySQL" }, org: "SENA", date: { es: "", en: "" } },
    ],
    english: { es: "Inglés", en: "English" },
    englishBody: { es: "EF SET 63/100, agosto de 2026.", en: "EF SET 63/100, August 2026." },
    verify: { es: "Verificar", en: "Verify" },
    spanish: { es: "Español nativo", en: "Native Spanish" },
  },
  contact: {
    title: { es: "Construyamos algo con tus datos.", en: "Let's build something with your data." },
    body: {
      es: "Busco roles remotos en IA, data science, análisis de datos o desarrollo de software. Respondo en menos de 24 horas.",
      en: "I'm looking for remote roles in AI, data science, data analysis or software development. I reply within 24 hours.",
    },
    email: { es: "Correo", en: "Email" },
    copy: { es: "Copiar correo", en: "Copy email" },
    copied: { es: "Correo copiado", en: "Email copied" },
  },
  footer: { es: "Hecho con Next.js, React y Tailwind CSS.", en: "Built with Next.js, React and Tailwind CSS." },
};

/* ───────────────────────────── Utilidades ───────────────────────────── */

type Tx = string | T;
const tx = (v: Tx, l: Lang) => (typeof v === "string" ? v : v[l]);

const FEATURED_PROJECTS = 5; // BNPL, AutoValor, Notes App, K-means, Activos financieros
const container = "mx-auto w-full max-w-[1120px] px-4 sm:px-6";
const tile =
  "rounded-3xl bg-tile ring-1 ring-hair transition-[transform,box-shadow] duration-300 ease-out motion-safe:hover:scale-[1.01] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]";

/* ───────────────────────────── Íconos ───────────────────────────── */

const Icon = {
  arrow: (c = "size-3.5") => (
    <svg viewBox="0 0 16 16" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M5 11 11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  github: (c = "size-[18px]") => (
    <svg viewBox="0 0 24 24" className={c} fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (c = "size-[18px]") => (
    <svg viewBox="0 0 24 24" className={c} fill="currentColor" aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  mail: (c = "size-[18px]") => (
    <svg viewBox="0 0 24 24" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  whatsapp: (c = "size-[18px]") => (
    <svg viewBox="0 0 24 24" className={c} fill="currentColor" aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35ZM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.43 9.43 0 0 1-1.45-5.03C2.56 6.83 6.8 2.6 12.04 2.6c2.54 0 4.92.99 6.71 2.78a9.42 9.42 0 0 1 2.78 6.7c0 5.23-4.25 9.42-9.49 9.42Zm8.08-17.5A11.32 11.32 0 0 0 12.04.66C5.74.66.62 5.78.62 12.08c0 2.01.53 3.98 1.53 5.71L.53 23.7l6.05-1.59a11.4 11.4 0 0 0 5.45 1.39h.01c6.3 0 11.42-5.12 11.42-11.42 0-3.05-1.19-5.92-3.34-8.08Z" />
    </svg>
  ),
  download: (c = "size-4") => (
    <svg viewBox="0 0 16 16" className={c} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

/* ───────────────────────────── Piezas ───────────────────────────── */

function SectionHeader({ id, title, lead }: { id: string; title: string; lead: string }) {
  return (
    <header className="mb-12 max-w-[42rem] md:mb-16">
      <h2 id={id} className="text-[2.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-ink md:text-[3.5rem]">
        {title}
      </h2>
      <p className="mt-4 text-xl leading-snug tracking-[-0.01em] text-sub md:text-2xl">{lead}</p>
    </header>
  );
}

function Chips({ items, l, dark = false }: { items: Tx[]; l: Lang; dark?: boolean }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((it) => (
        <li
          key={tx(it, "en")}
          className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${
            dark ? "bg-white/10 text-white/80" : "bg-card text-sub2 ring-1 ring-hair"
          }`}
        >
          {tx(it, l)}
        </li>
      ))}
    </ul>
  );
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-[15px] font-medium text-link hover:underline hover:underline-offset-4"
    >
      {children}
      {Icon.arrow()}
    </a>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <p className="text-[13px] font-semibold text-sub">{children}</p>;
}

/* ───────────────────────────── Secciones ───────────────────────────── */

function Nav({ l, setL }: { l: Lang; setL: (l: Lang) => void }) {
  const items = [
    ["#proyectos", C.nav.projects],
    ["#experiencia", C.nav.experience],
    ["#habilidades", C.nav.skills],
    ["#formacion", C.nav.education],
  ] as const;
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-hair bg-page/72 backdrop-blur-xl backdrop-saturate-150">
      <div className={`${container} flex h-14 items-center justify-between gap-4`}>
        <a href="#inicio" className="text-[15px] font-semibold tracking-[-0.01em]">
          Jose Romo
        </a>
        <nav aria-label={l === "es" ? "Principal" : "Main"} className="hidden md:block">
          <ul className="flex items-center gap-8 text-[13px] text-sub2">
            {items.map(([href, label]) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-ink">
                  {label[l]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div role="group" aria-label="Idioma / Language" className="flex rounded-full bg-ink/[0.06] p-0.5 text-[12px] font-semibold">
            {(["es", "en"] as const).map((x) => (
              <button
                key={x}
                type="button"
                onClick={() => setL(x)}
                aria-pressed={l === x}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  l === x ? "bg-card text-ink shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "text-sub hover:text-ink"
                }`}
              >
                {x.toUpperCase()}
              </button>
            ))}
          </div>
          <a
            href="#contacto"
            className="hidden rounded-full bg-ink px-3.5 py-1.5 text-[13px] font-medium text-page transition-opacity hover:opacity-80 sm:inline-block"
          >
            {C.nav.contact[l]}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ l }: { l: Lang }) {
  return (
    <section id="inicio" aria-labelledby="hero-title" className={`${container} pt-32 pb-16 md:pt-44 md:pb-24`}>
      <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="inline-flex items-center gap-2 rounded-full bg-soft px-3 py-1.5 text-[13px] font-medium text-sub2">
            <span className="relative flex size-2">
              <span className="absolute inset-0 rounded-full bg-[#30d158]" />
            </span>
            {C.hero.status[l]}
          </p>
          <h1 id="hero-title" className="mt-7 text-[3.25rem] font-bold leading-[0.95] tracking-[-0.035em] sm:text-7xl lg:text-[5.5rem]">
            Jose Luis
            <br />
            Romo Melo
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-sub sm:text-[2.1rem]">
            {C.hero.title[l]}
          </p>
          <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-sub">{C.hero.body[l]}</p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#contacto" className="rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-page transition-opacity hover:opacity-80">
              {C.hero.contact[l]}
            </a>
            <a href="#proyectos" className="rounded-full bg-soft px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-soft-hover">
              {C.hero.projects[l]}
            </a>
            <a
              href={LINKS.cv}
              download
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-[15px] font-medium text-link hover:underline hover:underline-offset-4"
            >
              {Icon.download()} {C.hero.cv[l]}
            </a>
          </div>
        </div>

        <figure className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[2rem] bg-zinc-100 ring-1 ring-black/[0.04] lg:ml-auto">
            {/* mix-blend-multiply funde el fondo blanco de la foto con el gris del contenedor */}
            <img
              src="/img/jose-romo.webp"
              alt="Jose Luis Romo Melo"
              width={433}
              height={576}
              className="absolute inset-x-0 bottom-0 h-[94%] w-full object-cover object-top mix-blend-multiply"
            />
            <figcaption className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 text-[13px] backdrop-blur-xl">
              <span className="font-semibold text-black">{C.hero.location[l]}</span>
              <span className="text-gray-500">UTC−5</span>
            </figcaption>
          </div>
        </figure>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:gap-4 lg:grid-cols-4">
        {C.stats.map((s) => {
          const auto: Record<string, string> = {
            projects: String(FEATURED_PROJECTS + C.projects.more.length),
            certs: String(C.education.certs.length + 1), // +1 = EF SET (inglés)
          };
          const value = auto[s.key] ?? s.value[l];
          return (
          <div key={s.label.en} className="rounded-3xl bg-tile px-6 py-6 ring-1 ring-hair">
            <dt className="sr-only">{s.label[l]}</dt>
            <dd>
              <span className="block whitespace-nowrap text-[1.75rem] font-bold leading-none tracking-[-0.04em] tabular-nums sm:text-[2rem] md:text-[2.5rem]">
                {value}
              </span>
              <span className="mt-2 block text-[14px] leading-snug text-sub">{s.label[l]}</span>
            </dd>
          </div>
          );
        })}
      </dl>
    </section>
  );
}

function Projects({ l }: { l: Lang }) {
  const P = C.projects;
  const bars = [
    { label: P.bnpl.v1[l], value: 5, color: "bg-mute" },
    { label: P.bnpl.v2[l], value: 12, color: "bg-ink" },
  ];
  return (
    <section aria-labelledby="proyectos" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeader id="proyectos" title={P.title[l]} lead={P.lead[l]} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
          {/* BNPL — tarjeta principal */}
          <article className={`${tile} flex flex-col gap-10 p-8 md:col-span-2 lg:col-span-4 lg:row-span-2 md:p-10`}>
            <div>
              <Tag>{P.bnpl.tag[l]}</Tag>
              <h3 className="mt-2 text-[2rem] font-bold leading-tight tracking-[-0.03em] md:text-[2.5rem]">{P.bnpl.name}</h3>
              <p className="mt-3 max-w-[34rem] text-[17px] leading-relaxed text-sub">{P.bnpl.body[l]}</p>
            </div>

            <figure className="rounded-2xl bg-card p-6 ring-1 ring-hair">
              <figcaption className="flex items-baseline justify-between gap-4">
                <span className="text-[14px] font-semibold">{P.bnpl.chartTitle[l]}</span>
                <span className="text-[13px] text-sub tabular-nums">/ 15</span>
              </figcaption>
              <div className="mt-5 space-y-4">
                {bars.map((b) => (
                  <div key={b.label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-1.5">
                    <span className="text-[13px] text-sub">{b.label}</span>
                    <span className="row-span-2 self-end text-[1.75rem] font-bold leading-none tracking-[-0.04em] tabular-nums">
                      {b.value}
                    </span>
                    <div className="h-2.5 overflow-hidden rounded-full bg-soft" role="img" aria-label={`${b.label}: ${b.value} / 15`}>
                      <div className={`h-full rounded-full ${b.color}`} style={{ width: `${(b.value / 15) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </figure>

            <div className="mt-auto flex flex-col gap-6">
              <ul className="grid gap-x-6 gap-y-2 text-[15px] text-sub2 sm:grid-cols-2">
                {P.bnpl.points.map((p) => (
                  <li key={p.en} className="flex gap-2.5">
                    <span className="mt-[9px] size-1 shrink-0 rounded-full bg-mute" aria-hidden />
                    {p[l]}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Chips items={P.bnpl.stack} l={l} />
                <TextLink href={P.bnpl.repo}>{P.repo[l]}</TextLink>
              </div>
            </div>
          </article>

          {/* AutoValor */}
          <article className={`${tile} flex flex-col p-8 lg:col-span-2 lg:row-span-2`}>
            <Tag>{P.autovalor.tag[l]}</Tag>
            <h3 className="mt-2 text-[1.75rem] font-bold tracking-[-0.03em]">{P.autovalor.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-sub">{P.autovalor.body[l]}</p>

            <dl className="mt-8 space-y-4">
              <div>
                <dt className="sr-only">{P.autovalor.cars[l]}</dt>
                <dd className="flex items-baseline gap-2">
                  <span className="text-[2.75rem] font-bold leading-none tracking-[-0.045em] tabular-nums">{l === "es" ? "7.207" : "7,207"}</span>
                  <span className="text-[15px] text-sub">{P.autovalor.cars[l]}</span>
                </dd>
              </div>
              <div>
                <dt className="sr-only">{P.autovalor.motos[l]}</dt>
                <dd className="flex items-baseline gap-2">
                  <span className="text-[2.75rem] font-bold leading-none tracking-[-0.045em] tabular-nums">{l === "es" ? "3.765" : "3,765"}</span>
                  <span className="text-[15px] text-sub">{P.autovalor.motos[l]}</span>
                </dd>
              </div>
              <p className="text-[13px] text-sub">{P.autovalor.clean[l]}</p>
            </dl>

            <div className="mt-8">
              <div className="flex items-baseline justify-between">
                <p className="text-[13px] font-semibold">{P.autovalor.phases[l]}</p>
                <p className="text-[13px] text-sub tabular-nums">
                  {P.autovalor.done} / {P.autovalor.phaseNames.length}
                </p>
              </div>
              <ol className="mt-2.5 grid grid-cols-5 gap-1" aria-label={P.autovalor.phases[l]}>
                {P.autovalor.phaseNames.map((ph, i) => (
                  <li key={ph.en} className={`h-1.5 rounded-full ${i < P.autovalor.done ? "bg-ink" : "bg-ink/10"}`}>
                    <span className="sr-only">{ph[l]}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-2.5 text-[13px] leading-snug text-sub">
                {P.autovalor.phaseSummary[l]}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-5 pt-8">
              <Chips items={P.autovalor.stack} l={l} />
              <TextLink href={P.autovalor.repo}>{P.repo[l]}</TextLink>
            </div>
          </article>

          {/* Notes App */}
          <article className={`${tile} flex flex-col p-8 lg:col-span-2`}>
            <div className="flex items-center justify-between">
              <Tag>{P.notes.tag[l]}</Tag>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-[12px] font-semibold text-ink ring-1 ring-hair">
                <span className="size-1.5 rounded-full bg-[#30d158]" aria-hidden />
                {P.notes.live[l]}
              </span>
            </div>
            <h3 className="mt-2 text-[1.5rem] font-bold tracking-[-0.03em]">{P.notes.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-sub">{P.notes.body[l]}</p>
            <ol className="mt-6 overflow-hidden rounded-xl bg-card text-[14px] ring-1 ring-hair" aria-label={l === "es" ? "Despliegue" : "Deployment"}>
              {P.notes.deploy.map((d) => (
                <li key={d.part} className="flex items-center justify-between gap-3 border-b border-hair px-3 py-2.5 last:border-b-0">
                  <span className="font-semibold">{d.part}</span>
                  <span className="text-sub">{d.host}</span>
                </li>
              ))}
            </ol>
            <div className="mt-auto flex flex-col gap-5 pt-6">
              <Chips items={P.notes.stack} l={l} />
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                <TextLink href={P.notes.demo}>{P.demo[l]}</TextLink>
                <TextLink href={P.notes.repo}>{P.repo[l]}</TextLink>
              </div>
            </div>
          </article>

          {/* K-means */}
          <article className={`${tile} flex flex-col overflow-hidden lg:col-span-2`}>
            <div className="p-8 pb-5">
              <Tag>{P.kmeans.tag[l]}</Tag>
              <h3 className="mt-2 text-[1.5rem] font-bold tracking-[-0.03em]">{P.kmeans.name[l]}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">{P.kmeans.body[l]}</p>
            </div>
            <div className="mx-4 overflow-hidden rounded-2xl bg-card ring-1 ring-hair">
              <img src="/img/kmeans.webp" alt={P.kmeans.alt[l]} width={1100} height={724} loading="lazy" className="w-full" />
            </div>
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 p-8 pt-5">
              <Chips items={P.kmeans.stack} l={l} />
              <TextLink href={P.kmeans.repo}>{P.repo[l]}</TextLink>
            </div>
          </article>

          {/* Activos financieros */}
          <article className={`${tile} flex flex-col p-8 lg:col-span-2`}>
            <Tag>{P.finance.tag[l]}</Tag>
            <h3 className="mt-2 text-[1.5rem] font-bold tracking-[-0.03em]">{P.finance.name[l]}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-sub">{P.finance.body[l]}</p>
            <ul className="mt-6 grid grid-cols-2 gap-2">
              {P.finance.metrics.map((m) => (
                <li key={tx(m, "en")} className="rounded-xl bg-card px-3 py-2.5 text-[14px] font-semibold ring-1 ring-hair">
                  {tx(m, l)}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-5 pt-6">
              <Chips items={P.finance.stack} l={l} />
              <TextLink href={P.finance.repo}>{P.repo[l]}</TextLink>
            </div>
          </article>

          {/* Proyectos nuevos desde C.projects.more */}
          {P.more.map((m) => (
            <article key={m.repo} className={`${tile} flex flex-col p-8 lg:col-span-2`}>
              <Tag>{m.tag[l]}</Tag>
              <h3 className="mt-2 text-[1.5rem] font-bold tracking-[-0.03em]">{tx(m.name, l)}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">{m.body[l]}</p>
              <div className="mt-auto flex flex-col gap-5 pt-6">
                <Chips items={m.stack} l={l} />
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {m.demo && <TextLink href={m.demo}>{P.demo[l]}</TextLink>}
                  <TextLink href={m.repo}>{P.repo[l]}</TextLink>
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
  const E = C.experience;
  return (
    <section aria-labelledby="experiencia" className="bg-alt py-24 md:py-32">
      <div className={container}>
        <SectionHeader id="experiencia" title={E.title[l]} lead={E.lead[l]} />
        <div className="space-y-4">
          {E.jobs.map((job) => (
            <article key={job.org} className="rounded-3xl bg-card p-8 ring-1 ring-hair md:p-10">
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
                <ul className="flex flex-wrap gap-1.5">
                  {job.tags.map((t) => (
                    <li key={tx(t, "en")} className="rounded-full bg-soft px-2.5 py-1 text-[13px] font-medium text-sub2">
                      {tx(t, l)}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills({ l }: { l: Lang }) {
  const S = C.skills;
  return (
    <section aria-labelledby="habilidades" className="py-24 md:py-32">
      <div className={container}>
        <SectionHeader id="habilidades" title={S.title[l]} lead={S.lead[l]} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {S.groups.map((g) => (
            <article key={g.key} className={`${tile} flex flex-col p-7 ${g.span} ${g.key === "ai" ? "sm:col-span-2" : ""}`}>
              <h3 className="text-[19px] font-bold tracking-[-0.02em]">{g.name[l]}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-sub">{g.items.map((i) => tx(i, l)).join(", ")}</p>
              {"learn" in g && g.learn && (
                <div className="mt-auto pt-6">
                  <p className="text-[13px] font-semibold text-link">{S.learning[l]}</p>
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
  const E = C.education;
  return (
    <section aria-labelledby="formacion" className="pb-24 md:pb-32">
      <div className={container}>
        <SectionHeader id="formacion" title={E.title[l]} lead={E.lead[l]} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {E.degrees.map((d) => (
            <article key={d.org} className={`${tile} flex min-h-[13rem] flex-col p-7`}>
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

          <article className={`${tile} p-7 md:col-span-2 md:p-8`}>
            <h3 className="text-[19px] font-bold tracking-[-0.02em]">{E.certsTitle[l]}</h3>
            <ul className="mt-4 grid gap-x-8 lg:grid-cols-2">
              {E.certs.map((c) => (
                <li key={tx(c.name, "en")} className="flex items-baseline justify-between gap-4 border-b border-hair py-3">
                  <span className="text-[15px] leading-snug">
                    <span className="font-medium text-ink">{tx(c.name, l)}</span>
                    <span className="block text-[13px] text-sub">{c.org}</span>
                  </span>
                  {c.date[l] && <span className="shrink-0 text-[13px] text-sub tabular-nums">{c.date[l]}</span>}
                </li>
              ))}
            </ul>
          </article>

          <article className={`${tile} flex flex-col p-7 md:p-8`}>
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

function Contact({ l }: { l: Lang }) {
  const K = C.contact;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };
  const btn =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-[15px] font-medium transition-colors";
  return (
    <section aria-labelledby="contacto" className={`${container} pb-6`}>
      <div className="rounded-[2.5rem] bg-cta ring-1 ring-hair px-6 py-20 text-white sm:px-12 md:px-16 md:py-28">
        <h2 id="contacto" className="max-w-[44rem] text-[2.5rem] font-bold leading-[1.02] tracking-[-0.04em] md:text-[4rem]">
          {K.title[l]}
        </h2>
        <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-white/60">{K.body[l]}</p>

        <div className="mt-12 flex flex-wrap gap-3">
          <a href={`mailto:${LINKS.email}`} className={`${btn} bg-white text-black hover:bg-white/85`}>
            {Icon.mail()} {K.email[l]}
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className={`${btn} bg-white/10 text-white hover:bg-white/20`}>
            {Icon.linkedin()} LinkedIn
          </a>
          <a href={LINKS.github} target="_blank" rel="noreferrer" className={`${btn} bg-white/10 text-white hover:bg-white/20`}>
            {Icon.github()} GitHub
          </a>
          <a href={LINKS.whatsapp} target="_blank" rel="noreferrer" className={`${btn} bg-white/10 text-white hover:bg-white/20`}>
            {Icon.whatsapp()} WhatsApp
          </a>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pt-8 text-[15px]">
          <span className="font-medium break-all">{LINKS.email}</span>
          <button type="button" onClick={copy} className="text-white/60 underline-offset-4 hover:text-white hover:underline">
            {copied ? K.copied[l] : K.copy[l]}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? K.copied[l] : ""}
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer({ l }: { l: Lang }) {
  return (
    <footer className={`${container} flex flex-col gap-1 py-8 text-[13px] text-sub sm:flex-row sm:justify-between`}>
      <span>© {new Date().getFullYear()} Jose Luis Romo Melo</span>
      <span>{C.footer[l]}</span>
    </footer>
  );
}

/* ───────────────────────────── Página ───────────────────────────── */

export default function Page() {
  const [l, setLang] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "es" || saved === "en") setLang(saved);
      else if (!navigator.language.toLowerCase().startsWith("es")) setLang("en");
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = l;
  }, [l]);

  const setL = (x: Lang) => {
    setLang(x);
    try {
      localStorage.setItem("lang", x);
    } catch {}
  };

  return (
    <>
      <a
        href="#proyectos"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-page"
      >
        {l === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <Nav l={l} setL={setL} />
      <main>
        <Hero l={l} />
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
