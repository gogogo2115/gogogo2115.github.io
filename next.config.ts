import type { NextConfig } from "next";
import { IS_DEVELOPMENT, IS_PRODUCTION } from "./utils/env";
import { ENV_CONFIG } from "./utils/env.config";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: false,
  reactCompiler: true,
  env: ENV_CONFIG,
  compiler: {
    removeConsole: IS_PRODUCTION,
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ["@svgr/webpack"] });
    return config;
  },
  turbopack: {
    debugIds: IS_DEVELOPMENT,
    rules: {
      "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
    },
  },
};

export default nextConfig;
