import env from "./configs/next.config.env.js";

import bundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";

const __dirname = path.resolve();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: IS_PROD ? "export" : undefined,
  reactStrictMode: false,
  productionBrowserSourceMaps: !IS_PROD,
  poweredByHeader: false,
  generateEtags: true,
  env,
  compiler: {
    removeConsole: IS_PROD,
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  headers: async () => {
    return [
      // { source: "/:path*", headers: [] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "none" }] },
    ];
  },
  eslint: {
    ignoreDuringBuilds: true, //eslint때문에 빌드가 실패하는것을 무시하고 진행, react-query에서의 옵션
  },
  // i18n: {
  //   locales: ["ko", "en"],
  //   defaultLocale: "ko",
  // },
  webpack: (config) => {
    if (config.name === "server") {
      config.optimization.concatenateModules = false; // react-query에서의 옵션
    }
    config.module.rules.push({ test: /\.svg$/i, use: ["@svgr/webpack"] }); // svg
    return config;
  },
  experimental: {
    appDocumentPreloading: true,
    turbo: {
      rules: { "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" } }, // svg
    },
  },
};

export default withBundleAnalyzer(nextConfig);
