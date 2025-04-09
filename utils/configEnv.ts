"use server";

const isClientCached: boolean = typeof window !== "undefined";

if (isClientCached) {
  throw new Error("보안상 서버환경에서만 실행이 가능합니다.");
}

import path from "path";
import { readFileSync } from "fs";
import { generateKeyPairSync, privateDecrypt, publicEncrypt, randomInt } from "crypto";
import { stringShuffle } from "./shuffle";

const getConfigPackageValue = (key: "name" | "version" | "next"): string => {
  try {
    if (isClientCached) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    const PACKAGE_JSON_PATH = path.join(process.cwd(), "package.json");
    const PACKAGE_JSON = JSON.parse(readFileSync(PACKAGE_JSON_PATH, "utf-8"));

    const keyMap: Record<string, string | undefined | null> = {
      name: PACKAGE_JSON.name ?? "",
      version: PACKAGE_JSON.version ?? "",
      next: PACKAGE_JSON.dependencies?.next?.replace(/[\^~]/g, ""),
    };

    const value = (keyMap[key] ?? "").trim();
    if (!value) throw new Error(`${key} 값을 찾을 수 없습니다.`);
    return value;
    return "";
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없음";
    throw new Error(`getNpmPackageValue 오류 발생. 상세: ${message}`);
  }
};

const generateBuildRandKey = (prefix: { start?: string; end?: string } = {}, length: number = 32): string => {
  try {
    if (isClientCached) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

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

const generateRSAKeys = (): { BUILD_PUBLIC_KEY: string; BUILD_PRIVATE_KEY: string } => {
  try {
    if (isClientCached) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    // RSA 키 생성
    const { publicKey: BUILD_PUBLIC_KEY, privateKey: BUILD_PRIVATE_KEY } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    // privateKey, publicKey 결과 오류
    if (typeof BUILD_PUBLIC_KEY !== "string" || typeof BUILD_PRIVATE_KEY !== "string") {
      throw new Error("BUILD_PUBLIC_KEY, BUILD_PRIVATE_KEY 생성 오류");
    }

    // 테스트 메시지로 키 검증
    const testMessage = "TestMessage";
    const encrypted = publicEncrypt(BUILD_PUBLIC_KEY, Buffer.from(testMessage));
    const decrypted = privateDecrypt(BUILD_PRIVATE_KEY, encrypted).toString("utf-8");

    // 키 검증 실패
    if (decrypted !== testMessage) throw new Error("RSA 키 검증 실패");

    // 키가 유효
    return { BUILD_PUBLIC_KEY, BUILD_PRIVATE_KEY };
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없음";
    throw new Error(`generateRSAKeys 오류 발생. 상세: ${message}`);
  }
};

export const CONFIG_ENV = {
  NEXT_PUBLIC_CONFIG_PACKAGE_NAME: getConfigPackageValue("name"),
  NEXT_PUBLIC_CONFIG_PACKAGE_VERSION: getConfigPackageValue("version"),
  NEXT_PUBLIC_CONFIG_NEXT_VERSION: getConfigPackageValue("next"),

  BUILD_RAND_KEY: generateBuildRandKey({ start: `${(process.env.NODE_ENV ?? "unknown").slice(0, 1)}-` }),
  BUILD_DATE_ISO: new Date().toISOString(),
  ...generateRSAKeys(),
};
