# Jose Luis Romo Melo — Portfolio

Sitio personal bilingüe en **Next.js 15 · React 19 · TypeScript · Tailwind CSS v4**, exportado como HTML estático y desplegado en Vercel.

| Página | Español | Inglés |
|---|---|---|
| Inicio | `/` | `/en/` |
| Caso de estudio | `/proyectos/<slug>/` | `/en/projects/<slug>/` |

- **Casos de estudio** por proyecto: problema, qué construí, decisiones clave, resultados, límites, lo que aprendí y qué haría después.
- **Tema claro/oscuro**: sigue al sistema y el botón del encabezado lo fija (se guarda en el navegador, sin parpadeo).
- **Idioma por URL**: `joseromo.vercel.app/en/` es el enlace para reclutadores internacionales. Cada página enlaza a su gemela y declara `hreflang` para Google. A quien abre la versión en español con el navegador en otro idioma se le ofrece la versión en inglés.
- **SEO**: metadatos por página, `sitemap.xml`, `robots.txt` y datos estructurados de persona.
- **Navegación**: menú desplegable en el teléfono, sección activa resaltada al hacer scroll y enlace "Saltar al contenido" para teclado.
- **404 propio** y bilingüe en `app/global-not-found.tsx`.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # genera /out (sitio estático)
```

## Dónde se edita cada cosa

| Qué | Archivo |
|---|---|
| Textos del inicio, "Ahora mismo", experiencia, habilidades, formación, certificaciones, contacto | `lib/content.ts` |
| Proyectos y casos de estudio (cifras, decisiones, resultados, imágenes) | `lib/projects.ts` |
| Gráficos y diagramas de los casos (BNPL, silueta, arquitecturas) | `components/Visuals.tsx` |
| Diseño del inicio y de los casos | `components/Home.tsx`, `components/CaseStudy.tsx` |
| Colores de cada tema | `app/globals.css` |
| Imágenes | `public/img/` y `public/img/projects/` |
| CV que se descarga | `public/cv/Jose_Romo_Software_Developer_CV_ES.pdf` y `..._EN.pdf` |

Cada texto va en los dos idiomas: `{ es: "...", en: "..." }`.

### Actualizar "Ahora mismo"

En `lib/content.ts`, objeto `NOW`: cambia las tarjetas y la fecha de `updated`. Si una tarjeta apunta a un caso de estudio, ponle `href` con el slug del proyecto.

### Agregar una certificación

En `lib/content.ts`, arreglo `CERTS`, agrega `{ name, org, date }`. El contador del inicio se actualiza solo.
**No pongas IDs de credencial del SENA:** contienen tu número de cédula.

### Agregar un proyecto con caso de estudio

1. En `lib/projects.ts`, copia uno de los objetos de `PROJECTS` y cambia sus datos. El `slug` define la URL.
2. Pon sus imágenes en `public/img/projects/`. Para capturas con versión clara y oscura usa `kind: "shots"`; para varios gráficos de matplotlib en cuadrícula, `kind: "charts"` (en `results.charts`).
3. La página del caso, el sitemap, "Siguiente proyecto" y el contador se generan solos.
4. La tarjeta del inicio para los cinco proyectos actuales está diseñada a mano en `components/Home.tsx`. Un proyecto nuevo necesita su tarjeta ahí, o puedes listarlo en `EXTRA_PROJECTS` para que salga como tarjeta simple sin caso de estudio.

## Desplegar

Haz commit y push a GitHub: Vercel publica solo. No necesita variables de entorno.

```bash
git add .
git commit -m "Casos de estudio, inglés en /en, tema claro/oscuro"
git push
```

Después, pasa `https://joseromo.vercel.app` y `https://joseromo.vercel.app/en/` por el Post Inspector de LinkedIn para refrescar las vistas previas.
