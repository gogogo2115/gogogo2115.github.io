const GET_BUILD_PUBLIC_KEY = (): string | undefined => {
  return process.env.BUILD_PUBLIC_KEY;
};

// 노출 방지 (서버에서만 호출되도록 처리)
const GET_BUILD_PRIVATE_KEY = (): string | undefined => {
  const pk = process.env.BUILD_PRIVATE_KEY;
  return typeof window === "undefined" && typeof pk === "string" ? pk : undefined;
};

export const BUILD_PUBLIC_KEY = GET_BUILD_PUBLIC_KEY();
export const BUILD_PRIVATE_KEY = GET_BUILD_PRIVATE_KEY();
