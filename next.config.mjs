// import bundleAnalyzer from "@next/bundle-analyzer";
import path from "path";

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: false,
// });

const __dirname = path.resolve();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: "export",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

// export default withBundleAnalyzer(nextConfig);
export default nextConfig;
