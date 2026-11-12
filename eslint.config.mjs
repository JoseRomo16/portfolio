// ESLint (flat config) con las reglas de Next "core-web-vitals".
// `next lint` está deprecado desde Next 15.5, así que se corre con `eslint .` (npm run lint).
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "public/**",
      "next-env.d.ts",
      "playwright-report/**",
      "test-results/**",
      ".lighthouseci/**",
      ".playwright-mcp/**",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Export estático con images.unoptimized: <Image> no aporta optimización. Las imágenes usan
      // <img> con srcset propio (lib/images.ts), width/height y loading="lazy".
      "@next/next/no-img-element": "off",
    },
  },
  {
    // La regla es del Pages Router. En el App Router, <head> dentro del layout raíz es lo correcto.
    files: ["components/RootHtml.tsx", "app/global-not-found.tsx"],
    rules: { "@next/next/no-head-element": "off" },
  },
];

export default config;
