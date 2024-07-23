import bundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

const __dirname = path.resolve();

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default withBundleAnalyzer(nextConfig);
