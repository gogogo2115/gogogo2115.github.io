"use server";

const isServer = typeof window === "undefined";
const isNotServer = !isServer;

if (isNotServer) {
  throw new Error("configEnv: 보안상 서버환경에서만 실행이 가능합니다.");
}

import { randomInt } from "crypto";
import { stringShuffle } from "./shuffle";

const generateBuildRandKey = (prefix: { start?: string; end?: string } = {}, length: number = 32): string => {
  try {
    if (isNotServer) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    const { start = "", end = "" } = { start: "", end: "", ...prefix };
    if (length < 1) throw new Error("길이는 1 이상의 값이어야 합니다.");
    const charShuffle = stringShuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"); // 문자열 섞기
    let randomKey = "";
    for (let i = 0; i < length; i++) {
      randomKey += charShuffle[randomInt(0, charShuffle.length)]; // crypto.randomInt 사용
    }
    randomKey = randomKey.trim();
    if (!randomKey) throw new Error("생성된 난수 값이 비어있습니다.");
    return `${start}${randomKey}${end}`;
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없음";
    throw new Error(`generateBuildRandKey 오류 발생. 상세: ${message}`);
  }
};

export const CONFIG_ENV = {
  NEXT_PUBLIC_CONFIG_PACKAGE_NAME: "",
  NEXT_PUBLIC_CONFIG_PACKAGE_VERSION: "",
  NEXT_PUBLIC_CONFIG_NEXT_VERSION: "",

  BUILD_RAND_KEY: generateBuildRandKey({ start: `${(process.env.NODE_ENV ?? "unknown").slice(0, 1)}-` }),
  BUILD_DATE_ISO: new Date().toISOString(),
};
