import { type ConsoleMessage, expect, test } from "@playwright/test";
import { PAGES, SLUGS } from "./pages";

const isMobile = (name: string) => name === "mobile";

test.describe("rutas", () => {
  test("todas las páginas responden 200 en ambos idiomas", async ({ request }) => {
    for (const { path } of PAGES) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
    }
  });

  test("sitemap, robots y las imágenes Open Graph existen", async ({ request }) => {
    for (const path of ["/sitemap.xml", "/robots.txt", ...SLUGS.flatMap((s) => [`/og/${s}.es.png`, `/og/${s}.en.png`])]) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      if (path.endsWith(".png")) expect(res.headers()["content-type"], path).toContain("image/png");
    }
  });

  test("una ruta inexistente devuelve la 404 propia", async ({ page }) => {
    const res = await page.goto("/esto-no-existe/");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Esta página no existe." })).toBeVisible();
    await page.goto("/en/missing/");
    await expect(page.getByRole("heading", { level: 1, name: "This page doesn't exist." })).toBeVisible();
  });
});

test.describe("navegación", () => {
  test("el cambio de idioma lleva a la página gemela", async ({ page }, info) => {
    test.setTimeout(150_000); // Recorre las 12 páginas en una sola prueba.
    for (const { path, twin } of PAGES) {
      await page.goto(path);
      if (isMobile(info.project.name)) {
        await page.locator('button[aria-controls="mobile-nav"]').click();
        await page.locator("#mobile-nav").getByRole("link", { name: /^(English|Español)$/ }).click();
      } else {
        await page.locator('header [data-testid="lang-switch"]').click();
      }
      await expect(page, `${path} → ${twin}`).toHaveURL(twin);
    }
  });

  test("el tema cambia y persiste tras recargar", async ({ page }, info) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    const html = page.locator("html");
    const toggle = isMobile(info.project.name)
      ? async () => {
          await page.locator('button[aria-controls="mobile-nav"]').click();
          await page.locator('#mobile-nav [data-testid="theme-toggle"]').click();
        }
      : () => page.locator('header [data-testid="theme-toggle"]').first().click();
    await toggle();
    await expect(html).toHaveAttribute("data-theme", "dark");
    await page.reload();
    await expect(html).toHaveAttribute("data-theme", "dark");
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgb(0, 0, 0)");
  });

  test("el menú móvil abre, bloquea el scroll y cierra", async ({ page }, info) => {
    test.skip(!isMobile(info.project.name), "solo en móvil");
    await page.goto("/proyectos/notes-app/");
    const btn = page.locator('button[aria-controls="mobile-nav"]');
    const panel = page.locator("#mobile-nav");
    await expect(panel).toBeHidden();

    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe("hidden");

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(btn).toBeFocused();

    // Tocar fuera del panel lo cierra.
    await btn.click();
    await page.mouse.click(200, 800);
    await expect(panel).toBeHidden();

    // Un enlace lo cierra y lleva a la sección del inicio.
    await btn.click();
    await panel.getByRole("link", { name: "Experiencia" }).click();
    await expect(page).toHaveURL("/#experience");
    await expect(page.locator("#mobile-nav")).toBeHidden();
  });

  test("el índice del caso resalta la sección activa", async ({ page }, info) => {
    test.skip(isMobile(info.project.name), "solo en escritorio");
    await page.goto("/proyectos/bnpl-support-assistant/");
    const toc = page.getByRole("navigation", { name: "En esta página" });
    await expect(toc).toBeVisible();
    await toc.getByRole("link", { name: "Resultados" }).click();
    await expect(toc.locator('a[aria-current="location"]')).toHaveText("Resultados");
  });
});

test.describe("visor de imágenes", () => {
  test("abre, navega con flechas y cierra con Esc devolviendo el foco", async ({ page }) => {
    await page.goto("/proyectos/autovalor-co/");
    const trigger = page.getByRole("button", { name: /^Ampliar imagen: Pantalla Mercado/ });
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    const dialog = page.locator("dialog[open]");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("1 de 2");
    await expect(dialog.locator("figcaption")).toContainText("Mercado");

    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText("2 de 2");
    await expect(dialog.locator("figcaption")).toContainText("Metodología");

    await dialog.getByRole("button", { name: "Imagen anterior" }).click();
    await expect(dialog).toContainText("1 de 2");

    await page.keyboard.press("Escape");
    await expect(page.locator("dialog[open]")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("muestra la versión oscura en tema oscuro", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "dark" });
    await page.goto("/proyectos/notes-app/");
    await page.getByRole("button", { name: /^Ampliar imagen/ }).first().click();
    const visible = page.locator("dialog[open] img:visible");
    await expect(visible).toHaveCount(1);
    await expect(visible).toHaveAttribute("src", /oscuro/);
  });
});

test.describe("consola", () => {
  for (const { path } of PAGES) {
    test(`sin errores de consola: ${path}`, async ({ page }) => {
      const errors: string[] = [];
      page.on("console", (m: ConsoleMessage) => m.type() === "error" && errors.push(m.text()));
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto(path);
      // Recorre la página para que carguen las imágenes diferidas y corran los observadores.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 700) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 50));
        }
      });
      await page.waitForLoadState("networkidle");
      expect(errors).toEqual([]);
    });
  }
});
