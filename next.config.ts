import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import ENV_CONFIG from "./utils/envConfig";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  generateBuildId: async () => `build-${ENV_CONFIG.BUILD_ISO.replace(/[:.]/g, "-")}`,
  env: ENV_CONFIG,
  webpack(config) {
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ["@svgr/webpack"] });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
      },
    },
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
