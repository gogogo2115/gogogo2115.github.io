import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";

const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
