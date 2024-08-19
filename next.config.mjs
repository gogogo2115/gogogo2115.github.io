import path from "path";
// import bundleAnalyzer from "@next/bundle-analyzer";

const __dirname = path.resolve();

// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: false,
// });

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
