/**
 * Contenido general del sitio (inicio, experiencia, habilidades, formación, contacto).
 * Los proyectos y sus casos de estudio están en `lib/projects.ts`.
 * Cada texto va en los dos idiomas: { es, en }.
 */
import type { T, Tx } from "./i18n";

export const LINKS = {
  email: "joseluisabc123@gmail.com",
  whatsapp: "https://wa.me/573164855814",
  linkedin: "https://www.linkedin.com/in/jose-luis-romo-dev-data",
  github: "https://github.com/JoseRomo16",
  /** Cada idioma del sitio descarga su CV. Para actualizarlo, reemplaza el PDF con el mismo nombre. */
  cv: {
    es: "/cv/Jose_Romo_Software_Developer_CV_ES.pdf",
    en: "/cv/Jose_Romo_Software_Developer_CV_EN.pdf",
  },
  efset: "https://cert.efset.org/en/b5TZpS",
};

export const META = {
  title: {
    es: "Jose Luis Romo Melo — IA y Data Science",
    en: "Jose Luis Romo Melo — AI & Data Science",
  },
  description: {
    es: "Economista y desarrollador en Pasto, Colombia. IA aplicada, data science, análisis de datos y desarrollo de software, con casos de estudio y código público.",
    en: "Economist and developer based in Colombia. Applied AI, data science, data analysis and software development, with case studies and public code.",
  },
};

export const UI = {
  nav: {
    projects: { es: "Proyectos", en: "Projects" },
    now: { es: "Ahora", en: "Now" },
    experience: { es: "Experiencia", en: "Experience" },
    skills: { es: "Habilidades", en: "Skills" },
    education: { es: "Formación", en: "Education" },
    contact: { es: "Contacto", en: "Contact" },
    main: { es: "Principal", en: "Main" },
    skip: { es: "Saltar al contenido", en: "Skip to content" },
    menuOpen: { es: "Abrir menú", en: "Open menu" },
    menuClose: { es: "Cerrar menú", en: "Close menu" },
    top: { es: "Volver arriba", en: "Back to top" },
    langLabel: { es: "Read in English", en: "Leer en español" },
    langShort: { es: "EN", en: "ES" },
    themeToDark: { es: "Cambiar a tema oscuro", en: "Switch to dark theme" },
    themeToLight: { es: "Cambiar a tema claro", en: "Switch to light theme" },
  },
  langSuggest: {
    text: "This page is also available in English.",
    cta: "Read in English",
    close: "Dismiss",
  },
  footer: { es: "Hecho con Next.js, React y Tailwind CSS.", en: "Built with Next.js, React and Tailwind CSS." },
};

export const HERO = {
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
  cv: { es: "Descargar CV (PDF)", en: "Download CV (PDF)" },
  location: { es: "Pasto, Colombia", en: "Pasto, Colombia" },
  photoAlt: { es: "Retrato de Jose Luis Romo Melo", en: "Portrait of Jose Luis Romo Melo" },
};

/** "projects" y "certs" se calculan solos a partir de los datos. */
export const STATS: { key: string; value: T; label: T }[] = [
  { key: "hours", value: { es: "4.000+ h", en: "4,000+ h" }, label: { es: "de experiencia profesional", en: "of professional experience" } },
  { key: "english", value: { es: "C1", en: "C1" }, label: { es: "inglés certificado, EF SET", en: "certified English, EF SET" } },
  { key: "projects", value: { es: "", en: "" }, label: { es: "proyectos públicos con caso de estudio", en: "public projects with a case study" } },
  { key: "certs", value: { es: "", en: "" }, label: { es: "certificaciones técnicas", en: "technical certifications" } },
];

/**
 * AHORA MISMO — actualízalo cada uno o dos meses.
 * `kind` es la etiqueta corta de cada tarjeta.
 */
export const NOW = {
  title: { es: "Ahora mismo.", en: "Right now." },
  updated: { es: "Actualizado en noviembre de 2026", en: "Updated November 2026" },
  items: [
    {
      kind: { es: "Construyendo", en: "Building" },
      title: { es: "Finance Lab", en: "Finance Lab" },
      body: {
        es: "Replicar factores y anomalías de papers de finanzas cuantitativas, con backtesting. Empiezo por los fundamentos en notebooks.",
        en: "Replicating factors and anomalies from quantitative-finance papers, with backtesting. Starting with the foundations in notebooks.",
      },
    },
    {
      kind: { es: "Acabo de cerrar", en: "Just shipped" },
      title: { es: "AutoValor CO", en: "AutoValor CO" },
      body: {
        es: "Valoración de vehículos usados en producción: 10,0 % de error en carros y un rango que cumple lo que promete.",
        en: "Used-vehicle valuation in production: 10.0% error on cars and a price range that delivers what it promises.",
      },
      href: "autovalor-co",
    },
    {
      kind: { es: "Estudiando", en: "Studying" },
      title: { es: "Ingeniería de Software", en: "Software Engineering" },
      body: {
        es: "Politécnico Grancolombiano. En paralelo: agentes con LLMs, su evaluación y TypeScript de punta a punta.",
        en: "Politécnico Grancolombiano. Alongside it: LLM agents, how to evaluate them, and end-to-end TypeScript.",
      },
    },
  ],
};

export const SECTIONS = {
  projects: {
    title: { es: "Proyectos.", en: "Projects." },
    lead: {
      es: "Cada uno con su caso de estudio: el problema, las decisiones y los resultados medidos.",
      en: "Each one with a case study: the problem, the decisions and the measured results.",
    },
  },
  experience: {
    title: { es: "Experiencia.", en: "Experience." },
    lead: {
      es: "Equipos Scrum, software en producción y datos que sostienen decisiones.",
      en: "Scrum teams, production software and data that supports decisions.",
    },
  },
  skills: {
    title: { es: "Habilidades.", en: "Skills." },
    lead: { es: "Del modelo económico al código en producción.", en: "From the economic model to production code." },
    learning: { es: "Aprendiendo ahora", en: "Learning now" },
  },
  education: {
    title: { es: "Formación.", en: "Education." },
    lead: { es: "Economía, software e ingeniería, en ese orden.", en: "Economics, software and engineering, in that order." },
    current: { es: "En curso", en: "In progress" },
    certsTitle: { es: "Certificaciones", en: "Certifications" },
    english: { es: "Inglés", en: "English" },
    englishBody: { es: "EF SET 63/100, agosto de 2026.", en: "EF SET 63/100, August 2026." },
    spanish: { es: "Español nativo", en: "Native Spanish" },
    verify: { es: "Verificar", en: "Verify" },
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
};

export const EXPERIENCE: {
  org: string;
  meta: T;
  roles: { title: T; period: T; points: T[] }[];
  tags: Tx[];
}[] = [
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
          { es: "Automaticé la generación de documentos técnicos con Python (python-docx), reduciendo trabajo manual repetitivo.", en: "Automated technical document generation with Python (python-docx), cutting repetitive manual work." },
          { es: "Mantuve acuerdos de interfaz (endpoints y estructuras de datos) y documenté despliegues de datos y ML sobre Kubernetes, con trazabilidad en SharePoint y ReadTheDocs.", en: "Maintained interface contracts (endpoints and data structures) and documented data and ML deployments on Kubernetes, with traceability in SharePoint and ReadTheDocs." },
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
    tags: ["React", "SQL", "Python", "Kubernetes", "Azure DevOps", "Postman", "BPMN / UML", "Scrum"],
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
];

export const SKILLS: { key: string; span: string; name: T; items: Tx[]; learn?: Tx[] }[] = [
  { key: "ai", span: "sm:col-span-2", name: { es: "IA y LLMs", en: "AI & LLMs" }, items: ["RAG", "Tool calling", "LLM evaluation", "Prompt engineering", "OpenAI-compatible APIs"], learn: [{ es: "Agentes", en: "Agents" }, "AWS", "MLOps"] },
  { key: "ds", span: "", name: { es: "Data Science y ML", en: "Data science & ML" }, items: ["scikit-learn", "LightGBM", "SHAP", { es: "Regresión", en: "Regression" }, { es: "Predicción conformal", en: "Conformal prediction" }, "K-means"] },
  { key: "de", span: "", name: { es: "Ingeniería de datos", en: "Data engineering" }, items: ["SQL", "dbt", "DuckDB", "Parquet", "Pandera", "Scraping"] },
  { key: "bi", span: "", name: { es: "Análisis y BI", en: "Analytics & BI" }, items: ["Power BI", { es: "Excel avanzado", en: "Advanced Excel" }, "pandas", "Stata", "R"] },
  { key: "dev", span: "lg:col-span-2", name: { es: "Desarrollo de software", en: "Software development" }, items: ["Python", "TypeScript", "React", "Next.js", "NestJS", "Node.js", "FastAPI", "Java", "C#"] },
  { key: "db", span: "", name: { es: "Bases de datos", en: "Databases" }, items: ["PostgreSQL", "MySQL", "MongoDB", "DuckDB"] },
  { key: "ops", span: "lg:col-span-2", name: { es: "DevOps y calidad", en: "DevOps & quality" }, items: ["Docker", "Git", "GitHub Actions", "pytest", "Jest", "Playwright", "Render", "Vercel"] },
  { key: "method", span: "sm:col-span-2 lg:col-span-2", name: { es: "Métodos", en: "Methods" }, items: ["Scrum", "Azure DevOps", "BPMN / UML", "REST APIs", "ADRs", { es: "Documentación técnica", en: "Technical documentation" }] },
];

export const DEGREES: { name: T; org: string; period: T; current?: boolean }[] = [
  { name: { es: "Ingeniería de Software", en: "B.Sc. Software Engineering" }, org: "Politécnico Grancolombiano", period: { es: "2026 — 2028", en: "2026 — 2028" }, current: true },
  { name: { es: "Tecnólogo en Análisis y Desarrollo de Software", en: "Software Analysis & Development Technologist" }, org: "SENA", period: { es: "2023 — 2025", en: "2023 — 2025" } },
  { name: { es: "Economía", en: "B.A. Economics" }, org: "Universidad de Nariño", period: { es: "2018 — 2024", en: "2018 — 2024" } },
];

// CERTIFICACIONES: agrega { name, org, date }. El contador del inicio se actualiza solo.
// No pongas IDs de credencial del SENA: contienen tu número de cédula.
export const CERTS: { name: Tx; org: string; date: T }[] = [
  { name: "Associate Data Engineer in SQL", org: "DataCamp", date: { es: "Ago 2025", en: "Aug 2025" } },
  { name: "Intermediate Python", org: "DataCamp", date: { es: "Jul 2026", en: "Jul 2026" } },
  { name: { es: "Aplicación de la IA en la integración de datos", en: "AI applied to data integration" }, org: "SENA", date: { es: "Mar 2026", en: "Mar 2026" } },
  { name: { es: "Curso de Power BI", en: "Power BI" }, org: "Código Facilito", date: { es: "Jul 2026", en: "Jul 2026" } },
  { name: { es: "Excel avanzado: análisis y visualización", en: "Advanced Excel: analysis & visualization" }, org: "Código Facilito", date: { es: "Jul 2026", en: "Jul 2026" } },
  { name: { es: "Backend con Node.js y MongoDB", en: "Backend with Node.js & MongoDB" }, org: "SENA", date: { es: "Jul 2026", en: "Jul 2026" } },
  { name: { es: "Despliegue de aplicaciones con Docker", en: "Application deployment with Docker" }, org: "SENA", date: { es: "Sep 2025", en: "Sep 2025" } },
  { name: { es: "Construcción de bases de datos con MySQL", en: "Building databases with MySQL" }, org: "SENA", date: { es: "", en: "" } },
];
