import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    MY_ENV_VAR: "ㅁㅁㅁㅁ",
    NEXT_PUBLIC_API_URL: "ㅁㅇㅁㄴㅇㅁㅇ",
  },
};

export default nextConfig;
