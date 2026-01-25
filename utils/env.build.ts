"use server";

const isClient = typeof window !== "undefined";
if (isClient) throw new Error("env.config: 보안상 서버환경에서만 실행이 가능합니다.");

import { execSync } from "child_process";
import { generateKeyPairSync, randomInt } from "crypto";
import { stringShuffle } from "./shuffle";
import { readFileSync } from "fs";
import { join } from "path";

const gitShortSha = (): string => {
  try {
    const gitShortSha = execSync("git rev-parse --short HEAD", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim() ?? "";
    return `${gitShortSha || ""}`;
  } catch {
    return "";
  }
};

const cleanVersion = (v?: string): string => {
  return typeof v === "string" && v.trim().length >= 1 ? v.replace(/[\^~]/g, "") : "unknown";
};

const BUILD_DATE_ISO = new Date().toISOString();

const BUILD_RAND_KEY = (() => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    const length: number = 16;

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
    const msg = e instanceof Error && typeof e.message ? e.message : "알 수 업는 오류 발생";
    throw new Error(`BUILD_RAND_KEY: ${msg}`);
  }
})();

const { PACKAGE_NAME, PACKAGE_VERSION, PACKAGE_NEXT_VERSION, PACKAGE_REACT_VERSION } = (() => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    const packagePath = join(process.cwd(), "package.json");
    const packageContent = readFileSync(packagePath, "utf-8");
    const { name, version, dependencies } = JSON.parse(packageContent);

    return {
      PACKAGE_NAME: cleanVersion(name),
      PACKAGE_VERSION: cleanVersion(version),
      PACKAGE_NEXT_VERSION: cleanVersion(dependencies?.next),
      PACKAGE_REACT_VERSION: cleanVersion(dependencies?.react),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "알 수 없는 오류 발생";
    throw new Error(`BUILD_PACKAGE_VERSION 생성 실패: ${message}`);
  }
})();

const { BUILD_RSA_PUBLIC_KEY, BUILD_RSA_PRIVATE_KEY } = (() => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem", cipher: "aes-256-cbc", passphrase: BUILD_RAND_KEY },
    });

    // 문자열 길이 및 존재 여부 검증
    if (!publicKey || publicKey.length < 100 || !privateKey || privateKey.length < 100) {
      throw new Error("생성된 키의 형식이 올바르지 않거나 길이가 너무 짧습니다.");
    }

    return {
      BUILD_RSA_PUBLIC_KEY: Buffer.from(publicKey, "utf8").toString("base64"),
      BUILD_RSA_PRIVATE_KEY: Buffer.from(privateKey, "utf8").toString("base64"),
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류 발생";
    throw new Error(`BUILD_RSA_KEY 생성 실패: ${message}`);
  }
})();

export const ENV_BUILD = {
  BUILD_DATE_ISO,
  BUILD_RAND_KEY,

  PACKAGE_NAME,
  PACKAGE_VERSION,
  PACKAGE_NEXT_VERSION,
  PACKAGE_REACT_VERSION,

  BUILD_RSA_PUBLIC_KEY,
  BUILD_RSA_PRIVATE_KEY,
};
