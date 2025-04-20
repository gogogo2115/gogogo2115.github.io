import type { NextConfig } from "next";
import { CONFIG_ENV } from "./utils/configEnv";

const nextConfig: NextConfig = {
  output: "export",
  env: CONFIG_ENV,
};

export default nextConfig;
