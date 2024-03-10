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
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,
  env,
  compiler: {
    removeConsole: IS_PROD,
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
  experimental: {
    appDocumentPreloading: true,
  },
};

export default withBundleAnalyzer(nextConfig);
