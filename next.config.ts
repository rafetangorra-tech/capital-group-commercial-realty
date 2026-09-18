import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 * - output "export" → fully static site in ./out (no server needed).
 * - images unoptimized → served as plain files (no /_next/image server).
 * - basePath is set only in the Pages build via PAGES_BASE_PATH so local dev
 *   and other hosts (root domain) keep working unprefixed.
 */
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
