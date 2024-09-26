import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";
import env from "./configs/next.config.env.js";

const __dirname = path.resolve();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const nodeEnv = process.env.NODE_ENV;
const isDevelopment = nodeEnv === "development";
const isProduction = nodeEnv === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  sassOptions: { includePaths: [path.join(__dirname, "styles")] },
  eslint: { ignoreDuringBuilds: true }, // ignoreDuringBuilds : true eslint가 오류시 강제 빌드 react-query 관련 설정
  typescript: { ignoreBuildErrors: true }, // ignoreDuringBuilds : true  typescript가 오류시 강제 빌드 react-query 관련 설정
  compiler: {
    removeConsole: isProduction,
  },
  env,
  images: {
    unoptimized: true, // GitHub Pages는 이미지를 최적화할 수 없으므로 이 설정이 필요
  },
  webpack: (config) => {
    /*
      config.cache = false; 관련
      [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Unable to snapshot resolve dependencies
    */
    config.cache = false;
    if (config.name === "server") config.optimization.concatenateModules = false; // react-query 관련 설정
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
