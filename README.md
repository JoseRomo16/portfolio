# Jose Luis Romo Melo — Portfolio

Landing personal bilingüe (ES/EN) en **Next.js 15 · React 19 · TypeScript · Tailwind CSS v4**.
Toda la página vive en un solo archivo: `app/page.tsx`. Exporta HTML estático y despliega en Vercel sin configuración.

- **Modo oscuro:** automático, sigue la preferencia del sistema operativo o del teléfono.
- **Responsiva:** teléfono (desde 320 px), tablet (768 y 1024 px) y escritorio.

## Correr en local

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # genera /out (sitio estático)
```

## Cómo actualizar el contenido

Todo está en el objeto `C` al inicio de `app/page.tsx`. Cada texto va en los dos idiomas: `{ es: "...", en: "..." }`.

### Agregar una certificación

Busca `certs: [` y agrega una línea:

```ts
{ name: "AWS Cloud Practitioner", org: "Amazon Web Services", date: { es: "Nov 2026", en: "Nov 2026" } },
```

- `name` puede ser texto simple o `{ es, en }` si el nombre cambia por idioma.
- Si no tiene fecha, usa `date: { es: "", en: "" }`.
- El contador "certificaciones técnicas" del inicio se actualiza solo.
- **No pongas IDs de credencial del SENA:** contienen tu número de cédula.

### Agregar un proyecto

Busca `more: [] as MoreProject[]` y agrega un objeto dentro de los corchetes:

```ts
more: [
  {
    tag: { es: "IA · Agentes", en: "AI · Agents" },
    name: { es: "Mi proyecto", en: "My project" },
    body: { es: "Qué hace en una o dos frases.", en: "What it does in one or two sentences." },
    stack: ["Python", "LangGraph", "FastAPI"],
    repo: "https://github.com/JoseRomo16/mi-proyecto",
    demo: "https://mi-proyecto.vercel.app", // opcional
  },
] as MoreProject[],
```

La tarjeta aparece sola debajo de los cinco proyectos destacados y el contador "proyectos públicos" se actualiza.
Si un proyecto nuevo merece una tarjeta destacada con gráfica propia (como BNPL o AutoValor), eso sí requiere editar el diseño. Pídeselo a Claude.

### Otros cambios frecuentes

| Qué | Dónde (en `app/page.tsx`) |
|---|---|
| Correo, WhatsApp, LinkedIn, GitHub, enlace del CV | `LINKS` |
| Titular y texto del inicio | `C.hero` |
| Horas de experiencia, nivel de inglés | `C.stats` |
| Cargos y logros | `C.experience.jobs` |
| Habilidades | `C.skills.groups` |
| Avance de AutoValor (fases listas) | `C.projects.autovalor.done` |

### Archivos

| Archivo | Qué es |
|---|---|
| `app/page.tsx` | La landing completa |
| `app/globals.css` | Colores del modo claro y oscuro |
| `app/layout.tsx` | SEO, datos estructurados y fuente Inter |
| `public/img/` | Foto y gráfico de K-means |
| `public/cv/Jose_Luis_Romo_CV_EN.pdf` | CV que se descarga (reemplázalo cuando actualices el CV) |
| `docs/perfil-consolidado.md` | Fuente de verdad del contenido |

## Vista previa en un solo archivo

```bash
npm run build
python scripts/make-preview.py   # -> preview/jose-romo-landing.html
```

El archivo resultante abre con doble clic, sin servidor ni internet.

## Desplegar en Vercel

```bash
git init && git add . && git commit -m "Portfolio"
git remote add origin https://github.com/JoseRomo16/portfolio.git
git push -u origin main
```

Luego en vercel.com → *Add New Project* → importa el repo → *Deploy*. Después actualiza `metadataBase` en `app/layout.tsx` con tu dominio final.
