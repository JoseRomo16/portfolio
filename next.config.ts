import type { NextConfig } from "next";

// Static export: the site is plain HTML/CSS/JS, deploys anywhere (Vercel, GitHub Pages, Netlify).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // 404 propio: el sitio tiene dos layouts raíz (es / en) y no hay uno común.
  experimental: { globalNotFound: true },
};

export default nextConfig;
