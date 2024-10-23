import path from "path";
import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: false, // IS_DEVELOPMENT,
  poweredByHeader: false, // IS_DEVELOPMENT,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    implementation: "sass-embedded",
  },
  webpack(config) {
    // issuer: /\.[jt]sx?$/, // @svgr/webpack ssr에서 오류 발생으로 제거됨
    config.module.rules.push({ test: /\.svg$/i, use: ["@svgr/webpack"] });
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
