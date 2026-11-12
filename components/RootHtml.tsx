import "@/app/globals.css";
import { SITE_URL, type Lang } from "@/lib/i18n";
import { LINKS } from "@/lib/content";

/** Precarga la fuente (declarada en globals.css) para que llegue antes del primer pintado. */
export const FontPreload = () => <link rel="preload" href="/fonts/InterVariable-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />;

// Se ejecuta antes de pintar: aplica el tema guardado y evita el parpadeo.
const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jose Luis Romo Melo",
  url: SITE_URL,
  jobTitle: "AI & Data Science · Data Analyst · Software Developer",
  image: `${SITE_URL}/img/jose-romo.webp`,
  address: { "@type": "PostalAddress", addressLocality: "Pasto", addressRegion: "Nariño", addressCountry: "CO" },
  email: `mailto:${LINKS.email}`,
  sameAs: [LINKS.linkedin, LINKS.github],
  alumniOf: ["Universidad de Nariño", "SENA", "Politécnico Grancolombiano"],
  knowsLanguage: ["es", "en"],
};

export function RootHtml({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <FontPreload />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body id="top" className="font-sans">{children}</body>
    </html>
  );
}
