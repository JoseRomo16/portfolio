import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { PAGES } from "./pages";

/**
 * axe-core en todas las páginas (y la 404), en tema claro y oscuro. Con el navegador en inglés
 * (playwright.config.ts) las páginas en español muestran la sugerencia de idioma, que también se revisa.
 */
const ROUTES = [...PAGES.map((p) => p.path), "/esto-no-existe/"];

for (const scheme of ["light", "dark"] as const) {
  for (const path of ROUTES) {
    test(`axe sin violaciones (${scheme}): ${path}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
      await page.goto(path);
      await page.waitForLoadState("networkidle");
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"]).analyze();
      const summary = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`);
      expect(summary).toEqual([]);
    });
  }
}
