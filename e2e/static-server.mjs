/**
 * Servidor estático mínimo para las pruebas E2E: sirve out/ como lo hace Vercel con un export
 * estático (index.html por carpeta, 404.html con estado 404). Sin dependencias.
 * Reemplaza a `serve`, que con varias pestañas en paralelo dejaba cargas colgadas.
 *
 *   node e2e/static-server.mjs [puerto]   (por defecto 4173)
 */
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";

const ROOT = path.resolve("out");
const PORT = Number(process.argv[2] ?? 4173);
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

async function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const full = path.join(ROOT, clean);
  if (!full.startsWith(ROOT)) return null;
  for (const candidate of [full, path.join(full, "index.html"), `${full}.html`]) {
    try {
      if ((await stat(candidate)).isFile()) return candidate;
    } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", "http://localhost");
  const file = await resolveFile(pathname);
  const status = file ? 200 : 404;
  const target = file ?? path.join(ROOT, "404.html");
  res.writeHead(status, { "Content-Type": TYPES[path.extname(target)] ?? "application/octet-stream" });
  if (req.method === "HEAD") return res.end();
  createReadStream(target).on("error", () => res.end()).pipe(res);
}).listen(PORT, () => console.log(`static-server: out/ en http://localhost:${PORT}`));
