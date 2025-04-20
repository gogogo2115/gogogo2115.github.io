"use server";

const isServer = typeof window === "undefined";
const isNotServer = !isServer;

if (isNotServer) {
  throw new Error("configEnv: 보안상 서버환경에서만 실행이 가능합니다.");
}

export const CONFIG_ENV = {
  BUILD_RAND_KEY: "",
  BUILD_DATE_ISO: new Date().toISOString(),
};
