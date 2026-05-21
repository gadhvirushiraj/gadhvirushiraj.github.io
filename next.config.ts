import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // GitHub Pages serves from repo root for user sites (gadhvirushiraj.github.io)
  basePath: '',
  trailingSlash: true,
};

export default nextConfig;
