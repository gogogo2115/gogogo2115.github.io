"use server";

const isClient = typeof window !== "undefined";
if (isClient) {
  throw new Error("configEnv: 보안상 서버환경에서만 실행이 가능합니다.");
}

export const CONFIG_ENV = {};
