/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  webpack(config) {
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

export default nextConfig;
