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
    // Etiquetas cortas para los botones del menú móvil.
    langName: { es: "English", en: "Español" },
    themeDark: { es: "Tema oscuro", en: "Dark theme" },
    themeLight: { es: "Tema claro", en: "Light theme" },
  },
  // Se muestra solo a navegadores en otro idioma, por eso va únicamente en inglés.
  langSuggest: {
    label: "Language suggestion",
    text: "This page is also available in English.",
    cta: "Read in English",
    close: "Dismiss",
  },
  footer: { es: "Hecho con Next.js, React y Tailwind CSS.", en: "Built with Next.js, React and Tailwind CSS." },
};

/** Página 404 (app/global-not-found.tsx). */
export const NOT_FOUND = {
  meta: "404 — Jose Luis Romo Melo",
  code: { es: "Error 404", en: "Error 404" },
  title: { es: "Esta página no existe.", en: "This page doesn't exist." },
  body: {
    es: "Puede que el enlace esté mal escrito o que la página haya cambiado de lugar. Desde aquí puedes volver al inicio o ir directo a un caso de estudio.",
    en: "The link may be mistyped, or the page may have moved. From here you can go back home or jump straight to a case study.",
  },
  home: { es: "Ir al inicio", en: "Go home" },
  contact: { es: "Contactar", en: "Get in touch" },
  cases: { es: "Casos de estudio", en: "Case studies" },
  /** Botón que cambia el idioma de esta misma página. */
  switchTo: { es: "View this page in English", en: "Ver esta página en español" },
};

export const HERO = {
  status: { es: "Disponible para roles remotos, híbridos y/o presenciales", en: "Open to remote roles, hybrid and/or on-site roles" },
  /** Propuesta en una frase. Ingeniería de Software está en curso: no decir "ingeniero". */
  title: {
    es: "Economista y desarrollador de software. IA aplicada, machine learning y pipelines de datos en producción.",
    en: "Economist and software developer. Applied AI, machine learning and data pipelines in production.",
  },
  body: {
    es: "Construyo asistentes con LLMs que se evalúan, modelos con rangos de predicción calibrados y pipelines de datos con pruebas, y los conecto con decisiones de negocio. También trabajo como analista de datos y desarrollador full stack.",
    en: "I build LLM assistants that get evaluated, models with calibrated prediction ranges and tested data pipelines, and tie them to business decisions. I also work as a data analyst and full-stack developer.",
  },
  contact: { es: "Contactar", en: "Get in touch" },
  projects: { es: "Ver proyectos", en: "See projects" },
  cv: { es: "Descargar CV (PDF)", en: "Download CV (PDF)" },
  location: { es: "Pasto, Colombia", en: "Pasto, Colombia" },
  photoAlt: { es: "Retrato de Jose Luis Romo Melo", en: "Portrait of Jose Luis Romo Melo" },
};

/** Las tres cifras del inicio: las de mayor peso real, cada una con su fuente. */
export const STATS: { key: string; value: T; label: T; source: T }[] = [
  {
    key: "autovalor",
    value: { es: "10,0 %", en: "10.0%" },
    label: { es: "de error medio fuera de muestra en carros (MAPE)", en: "mean out-of-sample error on cars (MAPE)" },
    source: { es: "AutoValor CO", en: "AutoValor CO" },
  },
  {
    key: "bnpl",
    value: { es: "5 → 12", en: "5 → 12" },
    label: { es: "de 15 casos superados tras una iteración", en: "of 15 cases passed after one iteration" },
    source: { es: "BNPL Support Assistant", en: "BNPL Support Assistant" },
  },
  {
    key: "hours",
    value: { es: "4.000+ h", en: "4,000+ h" },
    label: { es: "de experiencia profesional", en: "of professional experience" },
    source: { es: "2024 — 2026", en: "2024 — 2026" },
  },
];

/**
 * AHORA — franja de estado bajo el inicio. Actualízala cada uno o dos meses.
 * `href` (opcional) enlaza al caso de estudio con ese slug.
 */
export const NOW: {
  title: T;
  updated: T;
  items: { kind: T; title: T; href?: string }[];
} = {
  title: { es: "Ahora", en: "Now" },
  updated: { es: "nov 2026", en: "Nov 2026" },
  items: [
    { kind: { es: "Construyendo", en: "Building" }, title: { es: "Finance Lab: factores y backtesting", en: "Finance Lab: factors and backtesting" } },
    { kind: { es: "Recién cerrado", en: "Just shipped" }, title: { es: "AutoValor CO", en: "AutoValor CO" }, href: "autovalor-co" },
    { kind: { es: "Estudiando", en: "Studying" }, title: { es: "Ingeniería de Software", en: "Software Engineering" } },
    { kind: { es: "Aprendiendo", en: "Learning" }, title: { es: "Agentes, MLOps y AWS", en: "Agents, MLOps and AWS" } },
  ],
};

export const SECTIONS = {
  projects: {
    title: { es: "Proyectos", en: "Projects" },
    lead: {
      es: "Cada proyecto tiene su caso de estudio con el problema, las decisiones y los resultados medidos.",
      en: "Every project has a case study with the problem, the decisions and the measured results.",
    },
    flagship: { es: "Insignia", en: "Flagship" },
    more: { es: "Otros proyectos", en: "More projects" },
  },
  experience: { title: { es: "Experiencia", en: "Experience" }, stack: { es: "Stack", en: "Stack" } },
  skills: {
    title: { es: "Habilidades", en: "Skills" },
    domain: { es: "Dominio", en: "Domain" },
    stack: { es: "Stack principal", en: "Core stack" },
  },
  education: {
    title: { es: "Formación", en: "Education" },
    degrees: { es: "Títulos", en: "Degrees" },
    current: { es: "En curso", en: "In progress" },
    certsTitle: { es: "Certificaciones", en: "Certifications" },
    /** {n} se reemplaza por el número de credenciales que quedan dentro del desplegable. */
    moreCerts: { es: "Ver {n} credenciales más", en: "Show {n} more credentials" },
    english: { es: "Inglés", en: "English" },
    englishBody: { es: "EF SET 63/100, agosto de 2026", en: "EF SET 63/100, August 2026" },
    spanish: { es: "Español nativo", en: "Native Spanish" },
    verify: { es: "Verificar certificado", en: "Verify certificate" },
  },
  contact: {
    label: { es: "Contacto", en: "Contact" },
    title: { es: "Hablemos", en: "Let's talk" },
    body: {
      es: "Busco roles en IA aplicada, ciencia de datos, análisis de datos o desarrollo de software. Respondo en menos de 24 horas.",
      en: "I'm looking for roles in applied AI, data science, data analysis or software development. I reply within 24 hours.",
    },
    write: { es: "Escribir un correo", en: "Write an email" },
    email: { es: "Correo", en: "Email" },
    copy: { es: "Copiar correo", en: "Copy email" },
    copied: { es: "Correo copiado", en: "Email copied" },
    cv: { es: "CV en PDF", en: "CV (PDF)" },
  },
};

export const EXPERIENCE: {
  org: string;
  meta: T;
  /** Aclaración visible bajo la organización (por ejemplo, fechas que se cruzan con otro cargo). */
  note?: T;
  roles: { title: T; period: T; points: T[] }[];
  /** Stack en una frase, sin etiquetas sueltas. */
  stack: T;
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
    stack: {
      es: "React, SQL y Python; Postman para APIs REST; Azure DevOps, BPMN/UML y Scrum; documentación de despliegues sobre Kubernetes.",
      en: "React, SQL and Python; Postman for REST APIs; Azure DevOps, BPMN/UML and Scrum; deployment documentation on Kubernetes.",
    },
  },
  {
    org: "Universidad de Nariño",
    meta: { es: "Facultad de Ciencias Económicas · Pasto", en: "School of Economics · Pasto" },
    roles: [
      {
        title: { es: "Analista de Proyectos — Gestión de Datos", en: "Project Analyst — Data Management" },
        period: { es: "May 2023 — Oct 2024", en: "May 2023 — Oct 2024" },
        points: [
          { es: "Construí y mantuve bases de datos de estudiantes, docentes y cuentas de cobro, mejorando la precisión de la información para decisiones administrativas.", en: "Built and maintained student, faculty and billing databases, improving data accuracy for administrative decisions." },
          { es: "Apliqué análisis cuantitativo a la gestión administrativa de la facultad.", en: "Applied quantitative analysis to the school's administrative management." },
          { es: "Documenté proyectos educativos y coordiné eventos académicos dentro de presupuesto y cronograma.", en: "Documented educational projects and ran academic events on budget and on schedule." },
        ],
      },
    ],
    stack: {
      es: "Excel, bases de datos institucionales y análisis cuantitativo.",
      en: "Excel, institutional databases and quantitative analysis.",
    },
  },
];

/** Matriz técnica por dominio. Lo que estás aprendiendo va en la franja "Ahora" (NOW). */
export const SKILLS: { key: string; domain: T; stack: T }[] = [
  {
    key: "ai",
    domain: { es: "IA y Machine Learning", en: "AI & Machine Learning" },
    stack: {
      es: "LLMs (RAG, tool calling, evaluación), LightGBM, scikit-learn, SHAP, predicción conformal",
      en: "LLMs (RAG, tool calling, evaluation), LightGBM, scikit-learn, SHAP, conformal prediction",
    },
  },
  {
    key: "data",
    domain: { es: "Ingeniería de Datos y BI", en: "Data Engineering & BI" },
    stack: {
      es: "SQL, dbt, DuckDB, Parquet, Pandera, Power BI, Stata, R, Excel avanzado",
      en: "SQL, dbt, DuckDB, Parquet, Pandera, Power BI, Stata, R, advanced Excel",
    },
  },
  {
    key: "dev",
    domain: { es: "Desarrollo Backend y Web", en: "Backend & Web Development" },
    stack: {
      es: "Python, FastAPI, TypeScript, Node.js, NestJS, React, Next.js, Java, C#",
      en: "Python, FastAPI, TypeScript, Node.js, NestJS, React, Next.js, Java, C#",
    },
  },
  {
    key: "infra",
    domain: { es: "Infraestructura y Calidad", en: "Infrastructure & Quality" },
    stack: {
      es: "PostgreSQL, Docker, Kubernetes, GitHub Actions, pytest, Playwright, BPMN / UML",
      en: "PostgreSQL, Docker, Kubernetes, GitHub Actions, pytest, Playwright, BPMN / UML",
    },
  },
];

export const DEGREES: { name: T; org: string; period: T; current?: boolean }[] = [
  { name: { es: "Ingeniería de Software", en: "B.Sc. Software Engineering" }, org: "Politécnico Grancolombiano", period: { es: "2026 — 2028", en: "2026 — 2028" }, current: true },
  { name: { es: "Tecnólogo en Análisis y Desarrollo de Software", en: "Software Analysis & Development Technologist" }, org: "SENA", period: { es: "2023 — 2025", en: "2023 — 2025" } },
  { name: { es: "Economía", en: "B.A. Economics" }, org: "Universidad de Nariño", period: { es: "2018 — 2024", en: "2018 — 2024" } },
];

// CERTIFICACIONES: agrega { name, org, date }. Las marcadas con `featured` se ven siempre;
// el resto queda en el desplegable "Ver todas las credenciales".
// No pongas IDs de credencial del SENA: contienen tu número de cédula.
export const CERTS: { name: Tx; org: string; date: T; featured?: boolean }[] = [
  { name: "Associate Data Engineer in SQL", org: "DataCamp", date: { es: "Ago 2025", en: "Aug 2025" }, featured: true },
  { name: "Intermediate Python", org: "DataCamp", date: { es: "Jul 2026", en: "Jul 2026" }, featured: true },
  { name: { es: "Despliegue de aplicaciones con Docker", en: "Application deployment with Docker" }, org: "SENA", date: { es: "Sep 2025", en: "Sep 2025" }, featured: true },
  { name: { es: "Aplicación de la IA en la integración de datos", en: "AI applied to data integration" }, org: "SENA", date: { es: "Mar 2026", en: "Mar 2026" }, featured: true },
  { name: { es: "Curso de Power BI", en: "Power BI" }, org: "Código Facilito", date: { es: "Jul 2026", en: "Jul 2026" } },
  { name: { es: "Excel avanzado: análisis y visualización", en: "Advanced Excel: analysis & visualization" }, org: "Código Facilito", date: { es: "Jul 2026", en: "Jul 2026" } },
  { name: { es: "Backend con Node.js y MongoDB", en: "Backend with Node.js & MongoDB" }, org: "SENA", date: { es: "Jul 2026", en: "Jul 2026" } },
  { name: { es: "Construcción de bases de datos con MySQL", en: "Building databases with MySQL" }, org: "SENA", date: { es: "", en: "" } },
];
