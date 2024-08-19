import path from "path";
import bundleAnalyzer from "@next/bundle-analyzer";

const __dirname = path.resolve();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },

  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    if (config.name === "server") config.optimization.concatenateModules = false;
    return config;
  },
};

export default withBundleAnalyzer(nextConfig);
