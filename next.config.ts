import type { NextConfig } from "next";
import { CONFIG_ENV } from "./utils/configEnv";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  output: "export",
  env: CONFIG_ENV,
  sassOptions: {
    implementation: "sass-embedded",
  },
  webpack: (config) => {
    if (config.name === "server") config.optimization.concatenateModules = false;
    return config;
  },
};

export default nextConfig;
