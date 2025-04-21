import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

import { CONFIG_ENV } from "@/utils/configEnv";

const nextConfig: NextConfig = {
  output: "export",
  env: CONFIG_ENV,
  sassOptions: {
    implementation: "sass-embedded",
  },
  webpack: (config) => {
    config.module.rules.push({ test: /\.svg$/i, use: ["@svgr/webpack"] });
    return config;
  },
  turbopack: {
    rules: {
      "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
    },
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
