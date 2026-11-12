# Jose Luis Romo Melo — Portfolio

[![CI](https://github.com/JoseRomo16/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/JoseRomo16/portfolio/actions/workflows/ci.yml)

Sitio personal bilingüe en **Next.js 15 · React 19 · TypeScript · Tailwind CSS v4**, exportado como HTML estático y desplegado en Vercel.

| Página | Español | Inglés |
|---|---|---|
| Inicio | `/` | `/en/` |
| Caso de estudio | `/proyectos/<slug>/` | `/en/projects/<slug>/` |
| Imagen de vista previa de un caso | `/og/<slug>.es.png` | `/og/<slug>.en.png` |

- **Casos de estudio** por proyecto: problema, qué construí, decisiones clave, resultados, límites, lo que aprendí y qué haría después. En escritorio, índice "En esta página" con la sección activa resaltada.
- **Visor de imágenes**: cada captura, figura o gráfico de un caso se abre en grande (`<dialog>` nativo). Esc o clic en el fondo lo cierran, ← → pasan de imagen y respeta el tema.
- **Tema claro/oscuro**: sigue al sistema y el botón del encabezado lo fija (se guarda en el navegador, sin parpadeo).
- **Idioma por URL**: `joseromo.vercel.app/en/` es el enlace para reclutadores internacionales. Cada página enlaza a su gemela y declara `hreflang`. A quien abre la versión en español con el navegador en otro idioma se le ofrece la versión en inglés.
- **Navegación**: en el teléfono, menú con secciones, idioma y tema (Esc, tocar fuera o un enlace lo cierran). En escritorio, la sección activa se resalta al hacer scroll.
- **404 propio** y bilingüe (`app/global-not-found.tsx`), con enlaces a los casos de estudio.
- **SEO**: metadatos por página, imagen Open Graph propia para cada caso e idioma, `sitemap.xml`, `robots.txt` y datos estructurados de persona.
- **Rendimiento**: variantes responsivas de las imágenes con `srcset`, fuente precargada con respaldo de métricas ajustadas (sin saltos de layout) y carga diferida fuera de la primera pantalla.
- **Analítica sin cookies** con Umami Cloud (ver abajo).

## Correr en local

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # genera out/ (sitio estático). Antes corre el prebuild de imágenes.
```

## Calidad

| Comando | Qué revisa |
|---|---|
| `npm run typecheck` | Tipos de TypeScript (`tsc --noEmit`) |
| `npm run lint` | ESLint con las reglas de Next `core-web-vitals` |
| `npm run test:e2e` | Playwright sobre `out/` (escritorio 1440 px y Pixel 7): rutas 200 en ambos idiomas, cambio de idioma a la página gemela, tema que persiste, visor de imágenes, menú móvil, cero errores de consola y **axe-core sin violaciones** en todas las páginas y la 404, en tema claro y oscuro |
| `npm run lhci` | Lighthouse CI en el inicio y un caso: rendimiento ≥ 0,9, accesibilidad = 1, buenas prácticas ≥ 0,95 y SEO = 1 |

`test:e2e` y `lhci` necesitan un `npm run build` previo. La primera vez instala el navegador con `npx playwright install chromium`. En Windows, Lighthouse necesita la ruta de Chrome:

```bash
CHROME_PATH="C:/Program Files (x86)/Google/Chrome/Application/chrome.exe" npm run lhci
```

Lighthouse simula un teléfono con la CPU 4× más lenta. En un equipo modesto (`benchmarkIndex` bajo en el reporte) la nota de rendimiento sale más baja que en una máquina como las de GitHub; la medición de referencia es la del CI.

**GitHub Actions** (`.github/workflows/ci.yml`) corre todo en cada push y pull request a `main`, cancela las corridas viejas de la misma rama y sube los reportes de Playwright y Lighthouse como artefacto.

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Textos del inicio, "Ahora mismo", experiencia, habilidades, formación, certificaciones, contacto, 404 | `lib/content.ts` |
| Proyectos y casos de estudio (cifras, decisiones, resultados, imágenes) y textos de la interfaz de los casos | `lib/projects.ts` |
| Gráficos y diagramas de los casos (BNPL, silueta, arquitecturas) | `components/Visuals.tsx` |
| Diseño del inicio y de los casos | `components/Home.tsx`, `components/CaseStudy.tsx` |
| Encabezado, menú móvil, tema, idioma | `components/Chrome.tsx` |
| Visor de imágenes / índice del caso | `components/Lightbox.tsx` / `components/CaseToc.tsx` |
| Imagen Open Graph de los casos | `lib/og.tsx` (diseño) y `app/og/[file]/route.ts` (rutas) |
| Eventos de analítica | `lib/analytics.ts` |
| Colores de cada tema y fuente | `app/globals.css` |
| Imágenes | `public/img/` y `public/img/projects/` (las variantes de `w/` se generan solas) |
| CV que se descarga | `public/cv/Jose_Romo_Software_Developer_CV_ES.pdf` y `..._EN.pdf` |

Cada texto va en los dos idiomas: `{ es: "...", en: "..." }`. Ningún componente lleva texto escrito a mano.

### Actualizar "Ahora mismo"

En `lib/content.ts`, objeto `NOW`: cambia las tarjetas y la fecha de `updated`. Si una tarjeta apunta a un caso de estudio, ponle `href` con el slug del proyecto.

### Agregar una certificación

En `lib/content.ts`, arreglo `CERTS`, agrega `{ name, org, date }`. El contador del inicio se actualiza solo.
**No pongas IDs de credencial del SENA:** contienen tu número de cédula.

### Actualizar el CV

Reemplaza los PDF de `public/cv/` **con el mismo nombre**. La versión en español del sitio descarga el CV en español; `/en/`, el de inglés.

### Agregar un proyecto con caso de estudio

1. En `lib/projects.ts`, copia uno de los objetos de `PROJECTS` y cambia sus datos. El `slug` define la URL.
2. Pon sus imágenes en `public/img/projects/`. Para capturas con versión clara y oscura usa `kind: "shots"`; para varios gráficos de matplotlib en cuadrícula, `kind: "charts"` (en `results.charts`). Las variantes responsivas, el visor, la página del caso, su imagen Open Graph, el sitemap, "Siguiente proyecto" y el contador se generan solos.
3. La tarjeta del inicio para los cinco proyectos actuales está diseñada a mano en `components/Home.tsx`. Un proyecto nuevo necesita su tarjeta ahí, o puedes listarlo en `EXTRA_PROJECTS` para que salga como tarjeta simple sin caso de estudio.

## Analítica (Umami Cloud)

Sin cookies, sin banner y gratis (plan Hobby: 100.000 eventos al mes, 1 sitio, 6 meses de historial).

- El script solo se carga si existe la variable `NEXT_PUBLIC_UMAMI_WEBSITE_ID` al compilar. En local, en CI y en las vistas previas de Vercel no se registra nada. Además, `data-domains` limita el registro a `joseromo.vercel.app`.
- Eventos: `cv-download`, `demo-open`, `repo-open`, `email-copy`, `whatsapp-open` y `linkedin-open`, con las propiedades `page` (`home`, `case-study` o `404`) y, cuando aplica, `project` (el slug).
- Si un bloqueador de anuncios impide el script, el sitio funciona igual.

## Desplegar

Haz commit y push a GitHub: Vercel publica solo. La única variable de entorno es la de Umami (opcional).

Después de cambiar textos o imágenes de vista previa, pasa las URLs por el [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/) para refrescar las vistas previas.
