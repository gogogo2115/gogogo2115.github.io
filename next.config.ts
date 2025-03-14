import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import ENV_CONFIG from "./utils/envConfig";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  env: ENV_CONFIG,
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
