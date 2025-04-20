import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  env: {
    BUILD_RAND_KEY: "",
    BUILD_DATE_ISO: new Date().toISOString(),
    NEXT_PUBLIC_BUILD_DATE_ISO: new Date().toISOString(),
  },
};

export default nextConfig;
