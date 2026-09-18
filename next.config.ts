import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores the stray package-lock.json in $HOME.
  turbopack: { root: __dirname },
};

export default nextConfig;
