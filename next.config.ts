import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

import { CONFIG_ENV } from "@/utils/configEnv";
import { IS_PRODUCTION } from "@/utils/configNode";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  env: CONFIG_ENV,
  compress: true,
  compiler: {
    removeConsole: IS_PRODUCTION,
  },
  generateBuildId: async () => `build-${CONFIG_ENV.BUILD_DATE_ISO.replace(/[:.]/g, "-")}`,
  webpack: (config) => {
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ["@svgr/webpack"] });
    if (config.name === "server") config.optimization.concatenateModules = false;
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
