/**
 * Imágenes Open Graph de los casos de estudio: /og/<slug>.<es|en>.png
 *
 * Se generan en la compilación (export estático) con ImageResponse. Se usa un Route Handler y no
 * la convención opengraph-image.tsx porque esta exporta archivos sin extensión, y Vercel los
 * serviría como application/octet-stream, que algunas redes rechazan. lib/meta.ts apunta aquí.
 */
import { LANGS, type Lang } from "@/lib/i18n";
import { ogImagePath, projectOgImage } from "@/lib/og";
import { PROJECTS, getProject } from "@/lib/projects";

export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () =>
  PROJECTS.flatMap((p) => LANGS.map((l) => ({ file: ogImagePath(p.slug, l).split("/").pop()! })));

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const [, slug, l] = (await params).file.match(/^(.+)\.(es|en)\.png$/) ?? [];
  const p = slug ? getProject(slug) : undefined;
  if (!p) return new Response("Not found", { status: 404 });
  return projectOgImage(p, l as Lang);
}
