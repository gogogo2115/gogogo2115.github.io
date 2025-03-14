"use server";

import fs from "fs";
import path from "path";
import { createPrivateKey, createPublicKey, generateKeyPairSync, privateDecrypt, publicEncrypt, randomInt } from "crypto";
import { stringShuffle } from "./shuffle";

const isServer = typeof window === "undefined";

if (!isServer) {
  throw new Error("보안상 서버에서만 실행해야 합니다.");
}

const getPackageValue = (key: "name" | "version" | "next") => {
  try {
    if (!isServer) throw new Error("보안상 서버에서만 실행해야 합니다.");

    const PACKAGE_JSON_PATH = path.join(process.cwd(), "package.json");
    const PACKAGE_JSON = JSON.parse(fs.readFileSync(PACKAGE_JSON_PATH, "utf-8"));

    const keyMap: Record<string, string | undefined | null> = {
      name: PACKAGE_JSON.name ?? "",
      version: PACKAGE_JSON.version ?? "",
      next: PACKAGE_JSON.dependencies?.next?.replace(/[\^~]/g, ""),
    };

    const value = (keyMap[key] ?? "").trim();
    if (!value) throw new Error(`${key} 값을 찾을 수 없습니다.`);
    return value;
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없음";
    throw new Error(`getPackageValue: 환경 변수 호출 오류 발생. 상세: ${message}`);
  }
};

const generateBuildKey = (prefix: { start?: string; end?: string } = {}, length: number = 32): string => {
  try {
    const { start = "", end = "" } = { start: "", end: "", ...prefix };
    if (length < 1) {
      throw new Error("길이는 1 이상의 값이어야 합니다.");
    }

    const charShuffle = stringShuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"); // 문자열 섞기
    let randomKey = "";
    for (let i = 0; i < length; i++) {
      randomKey += charShuffle[randomInt(0, charShuffle.length)]; // crypto.randomInt 사용
    }

    if (!randomKey.trim()) throw new Error("생성된 난수 값이 비어있습니다.");
    return `${start}${randomKey}${end}`;
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없음";
    throw new Error(`generateBuildKey: 환경 변수 호출 오류 발생. 상세: ${message}`);
  }
};

const generateRSAKeys = (): { publicKey: string; privateKey: string } => {
  try {
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    return { publicKey, privateKey };
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없음";
    throw new Error(`generateRSAKeys: 환경 변수 호출 오류 발생. 상세: ${message}`);
  }
};

const validateRSAKey = ({ publicKey, privateKey }: { publicKey: string; privateKey: string }): boolean => {
  try {
    if (!publicKey || !privateKey) throw new Error("publicKey, privateKey 값 오류");
    const testMessage = "TestMessage";
    // const encrypted = publicEncrypt(publicKey, Buffer.from(testMessage));
    // const decrypted = privateDecrypt(privateKey, encrypted).toString("utf-8");
    const encrypted = publicEncrypt(createPublicKey({ key: publicKey, format: "pem", type: "spki" }), Buffer.from(testMessage)).toString("hex");
    const decrypted = privateDecrypt(createPrivateKey({ key: privateKey, format: "pem", type: "pkcs8" }), Buffer.from(encrypted, "hex")).toString("utf-8");

    return decrypted !== testMessage ? false : true;
  } catch {
    return false;
  }
};

const { publicKey: BUILD_PUBLIC_KEY, privateKey: BUILD_PRIVATE_KEY } = generateRSAKeys();
if (!validateRSAKey({ publicKey: BUILD_PUBLIC_KEY, privateKey: BUILD_PRIVATE_KEY })) {
  throw new Error("생성된 RSA 키 검증 실패");
}

const ENV_CONFIG = {
  PACKAGE_NAME: getPackageValue("name"),
  PACKAGE_VERSION: getPackageValue("version"),
  PACKAGE_NEXT_VERSION: getPackageValue("next"),

  BUILD_ISO: new Date().toISOString(),
  BUILD_KEY: generateBuildKey({ start: `${(process.env.NODE_ENV ?? "unknown").slice(0, 1)}-` }),
  BUILD_PUBLIC_KEY,
  BUILD_PRIVATE_KEY,
};

export default ENV_CONFIG;
