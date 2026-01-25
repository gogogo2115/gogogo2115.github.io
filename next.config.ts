import type { NextConfig } from "next";
import { IS_PRODUCTION } from "./utils/env.config";
import { ENV_BUILD } from "./utils/env.build";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: false,
  reactCompiler: true,
  env: ENV_BUILD,
  compiler: {
    removeConsole: IS_PRODUCTION,
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ["@svgr/webpack"] });
    return config;
  },
  turbopack: {
    rules: { "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" } },
  },
  sassOptions: {
    implementation: "sass-embedded",
  },
};

export default nextConfig;
