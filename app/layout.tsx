import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter/opsz.css";
import "./globals.css";

const title = "Jose Luis Romo Melo — IA y Data Science";
const description =
  "Economista y desarrollador en Pasto, Colombia. IA aplicada, data science, análisis de datos y desarrollo de software. Disponible para roles remotos.";

export const metadata: Metadata = {
  metadataBase: new URL("https://joseromo.vercel.app"), // cambia por tu dominio final
  title,
  description,
  authors: [{ name: "Jose Luis Romo Melo" }],
  keywords: [
    "Jose Luis Romo Melo", "AI Engineer", "Data Scientist", "Data Analyst", "Software Developer",
    "Economista", "Python", "SQL", "RAG", "LLM", "Machine Learning", "Pasto", "Colombia", "remoto",
  ],
  openGraph: {
    title,
    description,
    type: "profile",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    images: [{ url: "/img/jose-romo.webp", width: 433, height: 576, alt: "Jose Luis Romo Melo" }],
  },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "light dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jose Luis Romo Melo",
  jobTitle: "AI & Data Science · Data Analyst · Software Developer",
  image: "/img/jose-romo.webp",
  address: { "@type": "PostalAddress", addressLocality: "Pasto", addressRegion: "Nariño", addressCountry: "CO" },
  email: "mailto:joseluisabc123@gmail.com",
  sameAs: ["https://www.linkedin.com/in/jose-luis-romo-dev-data", "https://github.com/JoseRomo16"],
  alumniOf: ["Universidad de Nariño", "SENA", "Politécnico Grancolombiano"],
  knowsLanguage: ["es", "en"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
