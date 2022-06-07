const path = require("path");
const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  compress: true,
  //generateEtags: false,
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  esModule: true, //next-images image static url로 출력 옵션
  inlineImageLimit: false, //next-images image static url로 출력 옵션
  images: { disableStaticImages: true }, //next-images 오류방지를 위한 옵션
  sassOptions: { includePaths: [path.join(__dirname, "styles")] },
  env: {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  },
  pwa: {
    dest: "public",
    runtimeCaching,
  },
};

module.exports = withPlugins(
  [withBundleAnalyzer, withImages, withPWA],
  nextConfig
);
