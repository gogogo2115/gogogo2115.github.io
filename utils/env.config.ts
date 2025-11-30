"use server";

const isClient = typeof window !== "undefined";
if (isClient) throw new Error("env.config: 보안상 서버환경에서만 실행이 가능합니다.");

const BUILD_DATE_ISO = new Date().toISOString();

const BUILD_RAND_KEY = (() => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");
    return "";
  } catch (e) {
    const msg = e instanceof Error && typeof e.message ? e.message : "알 수 업는 오류";
    throw new Error(`BUILD_RAND_KEY: ${msg}`);
  }
})();

export const ENV_CONFIG = {
  BUILD_DATE_ISO,
  BUILD_RAND_KEY,
};
