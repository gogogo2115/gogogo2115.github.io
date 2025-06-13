const isClient = typeof window !== "undefined";
if (isClient) {
  throw new Error("configEnv: 보안상 서버환경에서만 실행이 가능합니다.");
}

import { randomInt } from "crypto";
import { stringShuffle } from "./shuffle"; // 상대 주소로 적용

const BUILD_DATE_ISO = new Date().toISOString();

const BUILD_DATE_KEY = ((length: number = 24): string => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");
    if (length < 1) throw new Error("길이는 1 이상의 값이어야 합니다.");

    const charShuffle = stringShuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"); // 문자열 섞기
    let randomKey = "";
    for (let i = 0; i < length; i++) {
      randomKey += charShuffle[randomInt(0, charShuffle.length)]; // crypto.randomInt 사용
    }

    if (!randomKey.trim()) throw new Error("생성된 난수 값이 비어있습니다.");
    return `${String(process.env.NODE_ENV.slice(0, 1))}_${randomKey}`;
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류 발생";
    throw new Error(`BUILD_DATE_KEY: ${message}`);
  }
})();

export const CONFIG_ENV_TEST = {
  BUILD_DATE_ISO,
  BUILD_DATE_KEY,
};
