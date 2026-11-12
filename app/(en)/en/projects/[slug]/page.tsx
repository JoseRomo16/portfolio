import { notFound } from "next/navigation";
import { CaseStudyPage } from "@/components/CaseStudy";
import { projectMeta } from "@/lib/meta";
import { PROJECTS, getProject } from "@/lib/projects";

export const dynamicParams = false;
export const generateStaticParams = () => PROJECTS.map((p) => ({ slug: p.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const p = getProject((await params).slug);
  return p ? projectMeta(p, "en") : {};
}

export default async function Page({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  return <CaseStudyPage p={p} l="en" />;
}
