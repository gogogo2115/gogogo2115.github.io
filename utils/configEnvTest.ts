const isClient = typeof window !== "undefined";
if (isClient) {
  throw new Error("configEnv: 보안상 서버환경에서만 실행이 가능합니다.");
}

import { randomInt } from "crypto";
import { stringShuffle } from "./shuffle";

const BUILD_DATE_ISO = new Date().toISOString();

const BUILD_RAND_KEY = ((length: number = 16): string => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    if (length < 8) throw new Error("보안을 위해 길이는 최소 8자 이상이어야 합니다.");
    if (length > 64) throw new Error("키 길이는 64자를 초과할 수 없습니다.");

    // BUILD_RAND_KEY의 문자열 섞기
    const charShuffle = stringShuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
    if (!charShuffle || charShuffle.length === 0) throw new Error("문자셋 섞기에 실패했습니다.");

    // 랜덤 키 생성
    let randomKey = "";
    for (let i = 0; i < length; i++) {
      randomKey += charShuffle[randomInt(0, charShuffle.length)];
    }

    // 생성된 키 검증
    if (!randomKey || randomKey.trim().length !== length) throw new Error("랜덤 키 생성에 실패했습니다.");

    const startPrefix = String(process.env.NODE_ENV).charAt(0).toLowerCase();
    if (!startPrefix || typeof startPrefix !== "string") throw new Error("접두사 생성 오류");

    // 접미사 타임스탬프 파싱
    const timestamp = Date.parse(BUILD_DATE_ISO);
    if (isNaN(timestamp)) throw new Error("빌드 날짜 파싱에 실패했습니다.");

    // 접미사 생성
    const endSuffix = timestamp.toString(36).slice(-4);
    if (!endSuffix || typeof endSuffix !== "string") throw new Error("접미사 생성 오류");

    return `${startPrefix}_${randomKey}_${endSuffix}`;
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류 발생";
    throw new Error(`BUILD_DATE_KEY: ${message}`);
  }
})();

export const CONFIG_ENV_TEST = {
  BUILD_DATE_ISO,
  BUILD_RAND_KEY,
};
