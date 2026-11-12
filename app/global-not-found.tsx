import "@fontsource-variable/inter/opsz.css";
import "./globals.css";
import type { Metadata } from "next";

/**
 * 404 bilingüe. El sitio tiene dos layouts raíz (es / en), así que Next usa esta página
 * para cualquier ruta que no exista. Sin JavaScript: es HTML estático.
 */
export const metadata: Metadata = {
  title: "404 — Jose Luis Romo Melo",
  robots: { index: false },
};

const THEME_SCRIPT = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function GlobalNotFound() {
  const btn = "rounded-full px-6 py-3 text-[15px] font-medium transition-opacity hover:opacity-80";
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="font-sans">
        <main className="mx-auto flex min-h-dvh w-full max-w-[1120px] flex-col justify-center px-4 py-24 sm:px-6">
          <p className="text-[14px] font-semibold text-sub tabular-nums">404</p>
          <h1 className="mt-3 text-[2.75rem] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[4rem]">
            Esta página no existe.
          </h1>
          <p lang="en" className="mt-3 text-[1.375rem] font-semibold tracking-[-0.02em] text-sub sm:text-[1.75rem]">
            This page doesn&apos;t exist.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="/" className={`${btn} bg-ink text-page`}>
              Ir al inicio
            </a>
            <a href="/en/" lang="en" className={`${btn} bg-soft text-ink`}>
              Go to the English site
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
