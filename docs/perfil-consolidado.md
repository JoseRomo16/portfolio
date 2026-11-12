# Perfil consolidado — Jose Luis Romo Melo

Fuente única de verdad para la landing (v4, 12 nov 2026).
Fuentes: **CV** (Software Developer ES/EN, 12 nov 2026) · **LinkedIn** (perfil guardado + lista de licencias) · **GitHub** (5 repos revisados; READMEs, ITERATION.md, ADRs) · **respuestas de Jose**.

> **Dónde vive cada dato en el código:** textos generales en `lib/content.ts`; proyectos y casos de estudio en `lib/projects.ts`. Si cambias una cifra aquí, cámbiala también allá.

### Cambios de la v4 (nov 2026)
- **AutoValor CO terminado y en producción**: modelos, API y sitio públicos (ver §4).
- Cada proyecto tiene **caso de estudio** propio: `/proyectos/<slug>` y `/en/projects/<slug>`.
- Versión en inglés en `/en/`, con selector de idioma y tema claro/oscuro.
- Sección **"Ahora mismo"**: Finance Lab (construyendo), AutoValor CO (recién cerrado), Ingeniería de Software (estudiando).
- Habilidades: LightGBM, SHAP y predicción conformal pasan de "en curso" a dominadas.
✅ = confirmado · ⚠️ = pendiente.

---

## 1. Identidad y contacto

| Campo | Valor | Estado |
|---|---|---|
| Nombre | Jose Luis Romo Melo | ✅ |
| Ubicación | San Juan de Pasto, Nariño, Colombia | ✅ |
| Modalidad | Remoto, híbrido o presencial | ✅ |
| Correo | joseluisabc123@gmail.com | ✅ |
| WhatsApp (público) | +57 316 485 5814 → `https://wa.me/573164855814` | ✅ |
| LinkedIn | linkedin.com/in/jose-luis-romo-dev-data | ✅ |
| GitHub | github.com/JoseRomo16 | ✅ |
| Foto | Retrato profesional 433×576 px, fondo blanco, guardado en `public/img/jose-romo.png` | ✅ (resolución justa; sirve hasta ~280 px de ancho en pantalla) |

## 2. Posicionamiento ✅

- **Principal:** IA / Data Science.
- **Secundario:** Data Analyst + Software Developer.
- **Diferenciador:** economista que entiende el negocio detrás de los datos, con base real de ingeniería de software.
- Frase propia de LinkedIn reutilizable: *"Analizo, modelo y visualizo datos, pero mi ventaja está en entender el negocio que hay detrás de ellos."*

Cómo lo sostienen los proyectos:

| Rol | Evidencia |
|---|---|
| IA (LLMs) | BNPL Support Assistant: RAG + tool use + evaluación medida |
| Data Science / ML | AutoValor CO (LightGBM + rango conformal + SHAP, en producción), K-means |
| Data Analyst | K-means, Activos Financieros (Sharpe, VaR, drawdown), Power BI/Excel, UDENAR |
| Software Developer | Notes App full-stack desplegada, trainee React en GSE |

## 3. Experiencia

### GSE — Gestión de Seguridad Electrónica S.A. · Bogotá (remoto) · 1 año 5 meses

**Technical Documentation Analyst — Software Architecture & QA** · Sep 2025 – Jul 2026 · jornada completa ✅
- Coordinó pruebas funcionales con líderes de proyecto y documentó resultados contra especificaciones de APIs REST (Postman).
- Diseñó diagramas BPMN, de clases, de componentes y de despliegue como referencia de arquitectura para todo el equipo.
- Mantuvo manuales de usuario, catálogos de servicios y acuerdos de interfaz en SharePoint y ReadTheDocs, con trazabilidad en todo el ciclo de vida.
- Stack: Azure DevOps · SharePoint · ReadTheDocs · BPMN · UML · Scrum · Postman
- Logros agregados en nov 2026 (también en el CV): automatización de documentos técnicos con Python (python-docx) y documentación de despliegues de datos y ML sobre Kubernetes.
- 🔒 **Ministerio del Interior: confidencial.** No se menciona el cliente, el contrato ni la API biométrica.
- ✅ **Tecnologías (nov 2026, confirmado por Jose):** sí se puede decir que documentó el despliegue y la configuración de Kubernetes, Airflow, Spark, KServe y Wazuh. Se presentan como conocimiento de despliegue y configuración, sin atarlas al cliente.

**Trainee Software Developer — Frontend & QA** (aprendiz SENA, contrato de formación) · Mar 2025 – Sep 2025 ✅
- Gestionó bases de datos SQL: consultas de validación, integridad de datos y reportes para el equipo.
- Estructuró el backlog en Azure DevOps (épicas, features, historias de usuario) con criterios de aceptación.
- Construyó componentes frontend en React integrados a la app principal, validados en QA y PRE antes de cada release.
- Presentó avances en socializaciones de sprint con documentación técnica de soporte.
- Stack: React · SQL · Python · Azure DevOps · Git · Postman · Scrum

### Universidad de Nariño — Facultad de Ciencias Económicas y Administrativas
**Project Analyst — Data Management & Educational Projects** · Pasto, presencial, contrato temporal
- Fechas: **may 2024 – oct 2025** ✅ (confirmado). El CV ya está corregido. Este cargo se cruza con GSE entre mar y oct 2025.
- Construyó y mantuvo bases de datos de estudiantes, docentes y cuentas de cobro, mejorando la precisión de la información para decisiones administrativas.
- Aplicó análisis cuantitativo a la gestión administrativa de la facultad.
- Documentó proyectos educativos cumpliendo requisitos institucionales y plazos.
- Coordinó la logística de eventos académicos dentro de presupuesto y cronograma.
- Herramientas: Excel · bases de datos · gestión documental

⚠️ Sigue sin haber cifras de impacto en la experiencia. No bloquea, pero suma mucho.

## 4. Proyectos (orden sugerido por posicionamiento)

### 1. BNPL Support Assistant — IA / LLM ✅
`github.com/JoseRomo16/bnpl-support-assistant` · sep 2026
Asistente de soporte con LLM que responde preguntas de compradores sobre políticas de "compra ahora, paga después" y consulta pedidos.
- RAG con BM25 sobre secciones de política, tool calling (`search_policies`, `lookup_order`) y citas en línea a la sección usada. **Se abstiene** cuando el corpus no cubre la pregunta.
- La verificación de identidad para ver pedidos se hace **en código, no en el prompt**: los casos de PII pasaron en todas las versiones.
- Corpus sintético escrito de forma adversarial, con trampas sembradas para que la evaluación no fuera un espejo.
- **Evaluación propia: 15 casos / 52 checks programáticos. V1: 5/15 casos → V2: 12/15 casos** (42 → 44 checks), con gpt-oss-120b en Groq.
- Documenta lo que empeoró, dos bugs encontrados en su propio harness de evaluación y un log de 7 decisiones técnicas.
- Interfaz LLM agnóstica al proveedor (OpenRouter, Groq, Cerebras, Google + stub offline). Mock de API de pedidos con FastAPI. 25 tests.
- Stack: Python · FastAPI · BM25 · OpenAI-compatible API · pytest
- Nota: es el proyecto que mejor demuestra el perfil IA (evaluación de LLMs, honestidad sobre resultados).

### 2. AutoValor CO — Data Science + ML + Producto ✅
`github.com/JoseRomo16/AutoValorCo` · 2026 · **completo y en producción**
Cuánto vale un carro o una moto usada en Colombia, con su rango probable P10–P90 y los factores que mueven el precio.
- **Demo:** https://autovalor-web.onrender.com · **API:** https://autovalor-api.onrender.com/docs (plan gratuito: la primera valoración tarda ~1 min).
- **Datos:** scrapers de TuCarro con robots.txt, pausas y sin datos de vendedores (Ley 1581 de 2012). Lago medallion: bronze Parquet en una rama del repo, silver/gold con dbt sobre DuckDB, contratos Pandera. **12.948 anuncios** (8.443 carros, 4.505 motos), corte fijo de 4 capturas (30 sep – 19 oct 2026).
- **Modelo:** LightGBM vs. línea base hedónica OLS sobre log(precio), K-fold agrupado por vehículo, calibración conformal del rango, SHAP por vehículo. Modelo servido: versión 2026-11-02.
- **Resultados (fuera de muestra):**

  | | Carros | Motos |
  |---|---|---|
  | MAPE | **10,0 %** (meta ≤ 15 %) | 20,4 % |
  | MAPE partición temporal | 11,4 % | 21,9 % |
  | Línea base OLS | 12,9 % | 33,2 % |
  | Cobertura P10–P90 (objetivo 80 %) | 80,2 % | 80,5 % |
  | Ancho medio del rango | 39 % | 70 % |
  | Etiqueta ganga / justo / caro | publicada | retenida por el ancho |

- **Hallazgos:** depreciación anual de 5,1 % (VW) a 9,5 % (Ford) en carros y de 0,9 % (Yamaha) a 6,4 % (Bajaj) en motos; cada 10.000 km restan $231.000 al carro mediano; el mismo carro se pide 7,6 % más caro en Santander que en Bogotá.
- **Producto:** FastAPI en Docker (/predict, /explain, /catalog) y sitio Next.js estático, bilingüe y PWA. Más de 600 pruebas (cobertura ≥ 70 %), E2E con Playwright, auditoría de contraste en CI. 7 ADRs.
- **Cierre:** TuCarro empezó a pedir verificación de cuenta; la captura se detuvo en vez de evadir el bloqueo (ADR 0005). La API oficial de Mercado Libre no entrega vehículos.
- **Límites declarados:** son precios pedidos, no de cierre; el corte es fijo.
- Stack: Python · dbt · DuckDB · Pandera · LightGBM · SHAP · FastAPI · Docker · Next.js · GitHub Actions

### 3. Notes App — Full-stack desplegada ✅
`github.com/JoseRomo16/ensolvers-deploy` · sep 2026
App de notas full-stack: crear, editar, archivar, categorizar y filtrar.
- Backend **NestJS + PostgreSQL** (migraciones, seed idempotente, health check) y SPA **Next.js** como export estático, comunicándose solo por API REST.
- Arranque en un comando con Docker (`./start.sh`). 24 tests de backend con Jest, E2E con Playwright, Storybook y CI con GitHub Actions.
- **Demo en vivo:** https://ensolvers-deploy-ten.vercel.app · API en Render · BD en Supabase.
- Stack: TypeScript · NestJS · PostgreSQL · Next.js · Docker · Jest · Playwright · Storybook
- ⚠️ El nombre del repo es "ensolvers-deploy". En la landing lo presentaría como **"Notes App"**, sin nombrar a la empresa, mientras sigue tu proceso con ellos.

### 4. Segmentación de clientes con K-means — Data Science ✅
`github.com/JoseRomo16/customer-segmentation-kmeans` · ago 2026
- 200 clientes de un centro comercial segmentados por ingreso anual y puntuación de gasto.
- K = 5 validado con método del codo y **coeficiente de silueta (máximo 0,55)**.
- 5 segmentos con lectura de negocio: Objetivo, Oportunidad, Impulsivo, Cauteloso, Estándar.
- Entregables: 2 notebooks (EDA + modelo), 2 informes PDF y gráficos.
- Tracción: post de LinkedIn con **4.512 impresiones** y 27 reacciones.
- Stack: Python · pandas · scikit-learn · Matplotlib · seaborn · Jupyter
- Tiene imagen lista para usar: `images/segmentacion_kmeans.png`.

### 5. Análisis de Activos Financieros — Data Analysis / finanzas cuantitativas ✅
`github.com/JoseRomo16/financial-asset-analysis` · may–sep 2026
Análisis cuantitativo de un portafolio diversificado: descarga precios históricos, calcula rendimiento y riesgo, y compara activos de distinta naturaleza.
- 9 activos: AAPL, MSFT, SPY, oro (GLD), Bitcoin, USD/COP, EUR/USD, **COLCAP** y **café (futuros)**, con un ángulo colombiano.
- Métricas: retornos aritméticos y logarítmicos, volatilidad anualizada, drawdown máximo, Sharpe y VaR 95 % histórico.
- Código modular en `src/` (data_loader, metrics, visualizer), 4 notebooks y **11 tests unitarios** de las métricas.
- Visualizaciones estáticas (Matplotlib, seaborn) e interactivas (Plotly).
- Stack: Python · pandas · NumPy · yfinance · SciPy · Plotly · pytest
- Planteado como "Proyecto 1 de 8" de un portafolio de data science financiero.
- **En la landing:** se presenta por las habilidades que demuestra (métricas de riesgo, código modular, tests, visualización interactiva). No se mencionan Streamlit ni el estado del repo. Enlace: `github.com/JoseRomo16/financial-asset-analysis/tree/master`, que muestra el código hoy y sigue funcionando cuando cambies la rama por defecto.

*(Colombian Job-Market Scraper: descartado por decisión de Jose.)*

## 5. Habilidades

- **IA / LLMs:** RAG, tool calling, evaluación de LLMs, prompt engineering, APIs compatibles con OpenAI · *aprendiendo:* agentes, AWS, MLOps
- **Data Science / ML:** scikit-learn, LightGBM, SHAP, regresión, predicción conformal, K-means
- **Ingeniería de datos:** SQL, dbt, DuckDB, Parquet, Pandera, Playwright, scraping, GitHub Actions
- **Análisis y BI:** Power BI, Excel avanzado, pandas, Stata, R
- **Desarrollo:** Python, TypeScript, JavaScript, React, Next.js, NestJS, Node.js, FastAPI, Java, C#
- **Bases de datos:** PostgreSQL, MySQL, MongoDB
- **DevOps y calidad:** Docker, Git, CI/CD, pytest, Jest, Playwright, Postman, Azure DevOps
- **Métodos:** Scrum, BPMN/UML, APIs REST, documentación técnica (SharePoint, ReadTheDocs)

## 6. Formación

| Programa | Institución | Fechas | Estado |
|---|---|---|---|
| Ingeniería de Software | Politécnico Grancolombiano | Feb 2026 – Dic 2028 | en curso ✅ |
| Tecnólogo en Análisis y Desarrollo de Software | SENA | Abr 2023 – Ago 2025 | ✅ |
| Economía | Universidad de Nariño | 2018 – 2024 | ✅ |

## 7. Certificaciones (9, lista oficial de LinkedIn) ✅

| Certificación | Emisor | Fecha | Verificación pública |
|---|---|---|---|
| EF SET English Certificate 63/100 (C1 Advanced) | EF SET | Ago 2026 | cert.efset.org/en/b5TZpS |
| Intermediate Python | DataCamp | Jul 2026 | enlace DataCamp |
| Desarrollo Backend con Node.js y MongoDB (48 h) | SENA | Jul 2026 | 🔒 ID contiene la cédula |
| Curso de Power BI | Código Facilito | Jul 2026 | ID 79971ed1-ee96-40d5-bee6-058ae238cd56 |
| Curso Avanzado de Excel, Análisis y Visualización de Datos | Código Facilito | Jul 2026 | ID 2ac1d008-a88e-4273-a9f4-de7a75a69a95 |
| Aplicación de la IA en la Integración de Datos | SENA | Mar 2026 | 🔒 ID contiene la cédula |
| Despliegue de Aplicaciones y Servicios en Contenedores Docker | SENA | Sep 2025 | 🔒 ID contiene la cédula |
| Associate Data Engineer in SQL | DataCamp | Ago 2025 | enlace DataCamp |
| Construcción de Bases de Datos con MySQL | SENA | sin fecha | 🔒 ID contiene la cédula |

🔒 Los IDs de credencial del SENA llevan tu número de cédula (`…CC1004697195…`). **No se publican en la web**, ni los IDs ni las imágenes de esos certificados. Se listan solo con nombre, emisor y fecha.

❌ **Scrum Fundamentals Certified (SFC):** no hay credencial (se perdió el archivo), así que **no va en la landing como certificación**. Scrum sí queda como habilidad, porque está respaldado por más de un año trabajando en Scrum en GSE. Hay que quitarlo de la sección de certificaciones del CV y de la línea "Certificado:" del "Acerca de" de LinkedIn. Si recuperas el certificado (CertiProf permite consultarlo con tu correo), se vuelve a agregar.

## 8. Idiomas ✅

- Español: nativo
- Inglés: **C1 Advanced, EF SET 63/100 (ago 2026)**, con enlace verificable. *(CV actualizado.)*

## 9. Prueba social

- Post de K-means: 4.512 impresiones, 27 reacciones.
- BNPL Assistant: mejora medida de 5/15 a 12/15 casos.
- Notes App: demo en vivo funcionando.

## 10. Ahora mismo (sección de la landing, actualizar cada 1–2 meses)

| Estado | Qué | Detalle |
|---|---|---|
| Construyendo | Finance Lab | Replicar factores y anomalías de papers de finanzas cuantitativas, con backtesting. Empieza por los fundamentos en notebooks. |
| Acabo de cerrar | AutoValor CO | En producción: 10,0 % de error en carros y un rango que cumple lo que promete. |
| Estudiando | Ingeniería de Software | Politécnico Grancolombiano. En paralelo: agentes con LLMs, su evaluación y TypeScript de punta a punta. |

## 11. Pendientes fuera de la landing

1. ✅ **CV (12 nov 2026):** `public/cv/Jose_Romo_Software_Developer_CV_ES.pdf` y `_EN.pdf`, uno por idioma del sitio. Fechas, cifras de AutoValor, BNPL y URL del portafolio ya coinciden con la landing. Posicionamiento del CV: Junior Software Developer (decisión de Jose); la landing abre con IA y Data Science.
2. **financial-asset-analysis:** cambiar la rama por defecto a `master` (si no se ha hecho).
3. **LinkedIn:** quitar "Scrum Fundamentals (CM-SFC)" del "Acerca de" y agregar los proyectos.
4. **Dominio:** el sitio asume `https://joseromo.vercel.app` (`SITE_URL` en `lib/i18n.ts`). Si el dominio final es otro, cambiarlo ahí.
5. **Foto:** 433 px de ancho. Un retrato de ≥ 800 px de ancho se vería nítido en pantallas retina.
6. (Opcional, alto impacto) Una o dos cifras de impacto por cargo.
