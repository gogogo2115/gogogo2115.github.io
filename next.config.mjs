import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";
import env from "./utils/config-env/index.js";

const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false,
  output: "export",
  env,
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack(config) {
    /*
      config.cache = false; 관련
      [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Unable to snapshot resolve dependencies
      윈도우에서 빌드시 발생 됨 캐시관련 오류 제거
    */
    config.cache = false;
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
      // issuer: /\.[jt]sx?$/, // ssr에서 오류 발생으로 주석 처리
    });
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
