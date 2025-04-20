import type { NextConfig } from "next";

import { CONFIG_ENV } from "@/utils/configEnv";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  env: CONFIG_ENV,
};

export default nextConfig;
