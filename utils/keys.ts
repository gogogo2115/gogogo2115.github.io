import { IS_DEVELOPMENT } from "./configNode";

export const buildPrivateKey = (): string => {
  if (typeof window !== "undefined") {
    if (IS_DEVELOPMENT) {
      console.error("buildPrivateKey: 보안상 서버에서만 실행해야 합니다.");
    }
    return "";
  }
  return process.env.BUILD_PRIVATE_KEY?.trim() ?? "";
};

export const buildPublicKey = (): string => {
  return (process.env.BUILD_PUBLIC_KEY ?? "").trim();
};
