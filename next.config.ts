import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

import { IS_PRODUCTION } from "@/utils/configNode";
import { CONFIG_ENV } from "./utils/configEnv";

const nextConfig: NextConfig = {
  /* config options here */
  generateBuildId: async () => `build-${CONFIG_ENV.BUILD_RAND_KEY.replace(/[_]/g, "-")}`,
  reactStrictMode: false,
  compress: true,
  output: "export",
  env: CONFIG_ENV,
  compiler: { removeConsole: IS_PRODUCTION },
  sassOptions: {
    implementation: "sass-embedded",
  },
  webpack: (config) => {
    // @svgr/webpack
    config.module.rules.push({ test: /\.svg$/i, issuer: /\.[jt]sx?$/, use: ["@svgr/webpack"] });

    // react-query
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
