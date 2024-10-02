import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  webpack(config) {
    /*
      config.cache = false; 관련
      [webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: Unable to snapshot resolve dependencies
      윈도우에서 빌드시 발생 됨 캐시관련 오류 제거
    */
    config.cache = false;

    config.module.rules.push({
      test: /\.svg$/i, // svg 추가
      use: ["@svgr/webpack"],
      // issuer: /\.[jt]sx?$/, // ssr에서 오류 발생으로 주석 처리
    });
    return config;
  },
  experimental: {
    scrollRestoration: true,
    // turbo: { // github.io 배포 시 작동 여부 불투명 주석 처리
    //   rules: {
    //     "*.svg": { loaders: ["@svgr/webpack"], as: "*.js" },
    //   },
    // }, // github.io 배포 시 작동 여부 불투명 주석 처리
  },
};

export default withBundleAnalyzer(nextConfig);
