export const BUILD_PUBLIC_KEY = (): string | undefined => {
  return process.env.BUILD_PUBLIC_KEY;
};

// 노출 방지 (서버에서만 호출되도록 처리)
export const BUILD_PRIVATE_KEY = (): string | undefined => {
  if (typeof window === "undefined") return process.env.BUILD_PRIVATE_KEY;
  return undefined;
};
