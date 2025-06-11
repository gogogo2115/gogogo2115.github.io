"use server";

const isClient = typeof window !== "undefined";
if (isClient) {
  throw new Error("configEnv: 보안상 서버환경에서만 실행이 가능합니다.");
}

type GenerateBuildKeys = {
  BUILD_PUBLIC_KEY: string;
  BUILD_PRIVATE_KEY: string;
};

type GenerateBuildKeysOptions = {
  persist?: boolean; // 키를 파일로 저장할지 여부
  dir?: string; // 저장 경로 (기본값: keys)
};

import { generateKeyPairSync, privateDecrypt, publicEncrypt, randomInt } from "crypto";
import { stringShuffle } from "./shuffle";
import path from "path";
import { chmodSync, existsSync, mkdirSync, writeFileSync } from "fs";

const generateBuildRandKey = (prefix: { start?: string; end?: string } = {}, length: number = 32): string => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

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
    const message = e instanceof Error ? e.message : "알 수 없는 오류";
    throw new Error(`generateBuildRandKey: ${message}`);
  }
};

const generateBuildKeys = (options: GenerateBuildKeysOptions = {}): GenerateBuildKeys => {
  try {
    if (isClient) throw new Error(`보안상 서버환경에서만 실행이 가능합니다.`);

    // RSA 키 생성
    const { publicKey: BUILD_PUBLIC_KEY, privateKey: BUILD_PRIVATE_KEY } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });

    // 키 타입 검증
    if (typeof BUILD_PUBLIC_KEY !== "string" || typeof BUILD_PRIVATE_KEY !== "string") {
      throw new Error("RSA 키 생성 실패: 키가 문자열 형태가 아닙니다.");
    }

    // 테스트 메시지로 키 검증
    const testMessage = "TestMessage";
    try {
      const encrypted = publicEncrypt(BUILD_PUBLIC_KEY, Buffer.from(testMessage));
      const decrypted = privateDecrypt(BUILD_PRIVATE_KEY, encrypted).toString("utf-8");

      if (decrypted !== testMessage) {
        throw new Error("RSA 키 검증 실패: 암호화/복호화 테스트 실패");
      }
    } catch (cryptoError) {
      const cryptoMessage = cryptoError instanceof Error ? cryptoError.message : "알 수 없는 암호화 오류";
      throw new Error(`RSA 키 검증 실패: ${cryptoMessage}`);
    }

    // 파일 저장
    const { persist = false, dir = "keys" } = options;
    if (persist) {
      try {
        const KEYS_DIR = path.resolve(process.cwd(), dir);

        // 디렉토리 생성
        if (!existsSync(KEYS_DIR)) {
          mkdirSync(KEYS_DIR, { recursive: true });
        }

        // Public 키 파일 저장
        const publicFileName = "buildPublicKey.pem";
        const publicFilePath = path.join(KEYS_DIR, publicFileName);
        writeFileSync(publicFilePath, BUILD_PUBLIC_KEY, { encoding: "utf-8" });
        chmodSync(publicFilePath, 0o644);

        // Private 키 파일 저장
        const privateFileName = "buildPrivateKey.pem";
        const privateFilePath = path.join(KEYS_DIR, privateFileName);
        writeFileSync(privateFilePath, BUILD_PRIVATE_KEY, { encoding: "utf-8" });
        chmodSync(privateFilePath, 0o600);
      } catch (fileError) {
        const fileMessage = fileError instanceof Error ? fileError.message : "알 수 없는 파일 오류";
        throw new Error(`키 파일 저장 실패: ${fileMessage}`);
      }
    }

    return { BUILD_PUBLIC_KEY, BUILD_PRIVATE_KEY };
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류";
    throw new Error(`generateBuildKeys: ${message}`);
  }
};

export const CONFIG_ENV = {
  BUILD_RAND_KEY: generateBuildRandKey({ start: `${process.env.NODE_ENV.slice(0, 1)}_` }),
  BUILD_DATE_ISO: new Date().toISOString(),
  ...generateBuildKeys(),
};
