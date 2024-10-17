import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";
import env from "./utils/config.env.js";
import isNodeEnv from "./utils/isNodeEnv.js";

const { IS_DEVELOPMENT } = isNodeEnv;
const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  poweredByHeader: IS_DEVELOPMENT,
  env,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    // issuer: /\.[jt]sx?$/, // @svgr/webpack ssr에서 오류 발생으로 제거됨
    config.module.rules.push({ test: /\.svg$/i, use: ["@svgr/webpack"] });
    return config;
  },
  experimental: {
    scrollRestoration: true,
    // turbo: {// github.io 배포 시 작동 여부 불투명 주석 처리
    //   rules: { "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" } },
    // },
  },
};

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
