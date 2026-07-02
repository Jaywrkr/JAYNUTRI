import type { NextConfig } from "next";
import pkg from "./package.json";

const nextConfig: NextConfig = {
  // Next.js equivalent of Vite's `define`: bakes package.json's version into
  // a build-time constant so the version badge never hardcodes a duplicate.
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
};

export default nextConfig;
