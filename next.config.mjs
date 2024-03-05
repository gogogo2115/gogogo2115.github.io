import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === "development";
const IS_PROD = NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: IS_PROD ? "export" : undefined,
  reactStrictMode: false,
  compiler: {
    removeConsole: IS_PROD,
  },
};

export default withBundleAnalyzer(nextConfig);
