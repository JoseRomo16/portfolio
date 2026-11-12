import { defineConfig, devices } from "@playwright/test";

/**
 * Pruebas E2E sobre el sitio exportado (`out/`), servido con e2e/static-server.mjs.
 * Antes: `npm run build`. Luego: `npm run test:e2e`.
 */
// E2E_PORT permite correr dos proyectos a la vez, cada uno con su servidor.
const PORT = Number(process.env.E2E_PORT ?? 4173);

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Navegador en inglés: así en las páginas en español aparece la sugerencia de idioma y axe la revisa.
    locale: "en-US",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `node e2e/static-server.mjs ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
