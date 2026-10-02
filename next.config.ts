import type { NextConfig } from "next";

// Static export: the site is plain HTML/CSS/JS, deploys anywhere (Vercel, GitHub Pages, Netlify).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
