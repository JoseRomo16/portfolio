# Perfil consolidado — Jose Luis Romo Melo

Fuente única de verdad para la landing (v3, 2 oct 2026). Contenido cerrado.
Fuentes: **CV** (EnglishVersion_v2_1) · **LinkedIn** (perfil guardado + lista de licencias) · **GitHub** (5 repos revisados) · **respuestas de Jose**.
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
| Data Science / ML | AutoValor CO (pipeline + modelo en curso), K-means |
| Data Analyst | K-means, Activos Financieros (Sharpe, VaR, drawdown), Power BI/Excel, UDENAR |
| Software Developer | Notes App full-stack desplegada, trainee React en GSE |

## 3. Experiencia

### GSE — Gestión de Seguridad Electrónica S.A. · Bogotá (remoto) · 1 año 5 meses

**Technical Documentation Analyst — Software Architecture & QA** · Sep 2025 – Jul 2026 · jornada completa ✅
- Coordinó pruebas funcionales con líderes de proyecto y documentó resultados contra especificaciones de APIs REST (Postman).
- Diseñó diagramas BPMN, de clases, de componentes y de despliegue como referencia de arquitectura para todo el equipo.
- Mantuvo manuales de usuario, catálogos de servicios y acuerdos de interfaz en SharePoint y ReadTheDocs, con trazabilidad en todo el ciclo de vida.
- Stack: Azure DevOps · SharePoint · ReadTheDocs · BPMN · UML · Scrum · Postman
- 🔒 **Ministerio del Interior: confidencial.** No se menciona el cliente ni el contrato. Tampoco Airflow/Spark/KServe/Wazuh/Kubernetes de ese proyecto, ni la API biométrica. *(Hay que quitarlos de la landing actual.)*

**Trainee Software Developer — Frontend & QA** (aprendiz SENA, contrato de formación) · Mar 2025 – Sep 2025 ✅
- Gestionó bases de datos SQL: consultas de validación, integridad de datos y reportes para el equipo.
- Estructuró el backlog en Azure DevOps (épicas, features, historias de usuario) con criterios de aceptación.
- Construyó componentes frontend en React integrados a la app principal, validados en QA y PRE antes de cada release.
- Presentó avances en socializaciones de sprint con documentación técnica de soporte.
- Stack: React · SQL · Python · Azure DevOps · Git · Postman · Scrum

### Universidad de Nariño — Facultad de Ciencias Económicas y Administrativas
**Project Analyst — Data Management & Educational Projects** · Pasto, presencial, contrato temporal
- Fechas: **may 2024 – oct 2025** ✅ (confirmado). El CV todavía dice oct 2024 y hay que actualizarlo. Este cargo se cruza con GSE entre mar y oct 2025.
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

### 2. AutoValor CO — Data Engineering + ML ✅
`github.com/JoseRomo16/AutoValorCo` · en desarrollo
Valoración de carros y motos usados en Colombia con intervalo de predicción P10–P90.
- **Hecho:** pipeline medallion bronze → silver → gold (Parquet, DuckDB, dbt), validación con Pandera, **7.207 carros y 3.765 motos limpios**, captura semanal automática en GitHub Actions, scraping ético (robots.txt, Ley 1581 de 2012), tests (cobertura ≥ 70 %), CI, ruff + mypy, ADRs.
- **Siguiente:** modelación (hedónico OLS como línea base vs. LightGBM/CatBoost, meta MAPE ≤ 15 %), SHAP, curvas de depreciación, comparación con Fasecolda, API FastAPI y app Next.js.
- Stack: Python · Playwright · DuckDB · dbt · Pandera · GitHub Actions · Docker · (en curso: LightGBM, CatBoost, SHAP, MLflow, FastAPI, Next.js)
- En la landing se enlaza al repo sin mencionar ajustes pendientes.

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
- **Data Science / ML:** scikit-learn, K-means, regresión · *en curso:* statsmodels, LightGBM, CatBoost, SHAP, MLflow
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
- Inglés: **C1 Advanced, EF SET 63/100 (ago 2026)**, con enlace verificable. *(El CV todavía dice B2: actualizarlo.)*

## 9. Prueba social

- Post de K-means: 4.512 impresiones, 27 reacciones.
- BNPL Assistant: mejora medida de 5/15 a 12/15 casos.
- Notes App: demo en vivo funcionando.

## 10. Cambios de contenido que aplicará la landing (no de diseño)

1. Posicionamiento: IA / Data Science al frente; Data Analyst + Software Developer como segundo nivel.
2. Quitar toda mención del Ministerio del Interior y de las tecnologías de ese proyecto.
3. Corregir fechas: Trainee hasta **Sep 2025**; UDENAR hasta **Oct 2025** (pendiente confirmar).
4. Inglés **C1 (EF SET)** con enlace.
5. Proyectos (5): BNPL Assistant, AutoValor CO (con su estado real), Notes App con demo, K-means y Activos Financieros. Sin scraper.
6. Certificaciones: las 9 de LinkedIn, sin IDs del SENA y sin Scrum SFC.
7. Agregar WhatsApp y la foto.

## 11. Estado: contenido cerrado ✅

Acciones en tus repos y documentos (fuera de la landing; conviene hacerlas antes de publicarla):
1. **financial-asset-analysis:** cambiar la rama por defecto a `master`. Es lo más urgente, porque hoy el enlace muestra un repo vacío.
2. **AutoValorCo:** corregir el enlace `joseluis/autovalor-co` del README.
3. **CV:** UDENAR hasta oct 2025, inglés C1, quitar Scrum SFC y quitar Streamlit del proyecto financiero. Agregar BNPL Assistant y Notes App.
4. **LinkedIn:** quitar "Scrum Fundamentals (CM-SFC)" del "Acerca de" y agregar los proyectos.
5. (Opcional, alto impacto) Una o dos cifras de impacto por cargo.
