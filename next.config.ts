import type { NextConfig } from "next";
import ENV_CONFIG from "./utils/envConfig";

const nextConfig: NextConfig = {
  /* config options here */
  env: ENV_CONFIG,
};

export default nextConfig;
