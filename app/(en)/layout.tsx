import type { Viewport } from "next";
import { RootHtml } from "@/components/RootHtml";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f7f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f12" },
  ],
  colorScheme: "light dark",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
