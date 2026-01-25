"use server";

const isClient = typeof window !== "undefined";
if (isClient) throw new Error("env.config: 보안상 서버환경에서만 실행이 가능합니다.");

import { execSync } from "child_process";
import { randomInt } from "crypto";
import { stringShuffle } from "./shuffle";

const gitShortSha = () => {
  try {
    const gitShortSha = execSync("git rev-parse --short HEAD", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim() ?? "";
    return `${gitShortSha || ""}`;
  } catch {
    return "";
  }
};

const BUILD_DATE_ISO = new Date().toISOString();

const BUILD_RAND_KEY = (() => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    const length: number = 12;

    const chars = stringShuffle("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz");
    if (!chars) throw new Error("chars 길이는 1 이상의 값이어야 합니다.");

    let key = "";
    for (let i = 0; i < length; i++) {
      key += chars[randomInt(0, chars.length)];
    }

    if (!key || key.length !== length) throw new Error("생성된 난수 값이 비어있습니다.");

    const suffix = Date.parse(BUILD_DATE_ISO).toString(36).slice(-4);
    if (!suffix || typeof suffix !== "string" || suffix.length === 0) throw new Error("접미 생성 오류");

    return `${gitShortSha()}${key}${suffix}`;
  } catch (e) {
    const msg = e instanceof Error && typeof e.message ? e.message : "알 수 업는 오류";
    throw new Error(`BUILD_RAND_KEY: ${msg}`);
  }
})();

export const ENV_BUILD = {
  BUILD_DATE_ISO,
  BUILD_RAND_KEY,
};
