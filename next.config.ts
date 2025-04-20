import type { NextConfig } from "next";
import { CONFIG_ENV } from "@/utils/configEnv";

const nextConfig: NextConfig = {
  output: "export",
  env: CONFIG_ENV,
  sassOptions: {
    implementation: "sass-embedded",
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ["@svgr/webpack"] });
    return config;
  },
  turbopack: {
    rules: {
      "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
    },
  },
};

export default nextConfig;
