const isClient = typeof window !== "undefined";
if (isClient) {
  throw new Error('configEnv<"보안상 서버환경에서만 실행이 가능합니다.">');
}

import { join, resolve } from "path";
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { generateKeyPairSync, randomInt } from "crypto";
import { stringShuffle } from "./shuffle";

const BUILD_DATE_ISO = new Date().toISOString(); // BUILD_RAND_KEY에도 포함 되니 주의

const BUILD_RAND_KEY = (() => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    // 생성할 문자열 길이
    const length = 16;

    // BUILD_RAND_KEY의 문자열 섞기
    const charShuffle = stringShuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
    if (!charShuffle || charShuffle.length === 0) throw new Error("문자셋 섞기에 실패했습니다.");

    // 랜덤 키 생성
    let randomKey = "";
    for (let i = 0; i < length; i++) randomKey += charShuffle[randomInt(0, charShuffle.length)];

    // 생성된 키 검증
    if (!randomKey || randomKey.trim().length !== length) throw new Error("랜덤 키 생성에 실패했습니다.");

    // 접두사 생성
    const startPrefix = String(process.env.NODE_ENV).charAt(0).toLowerCase();
    if (!startPrefix || typeof startPrefix !== "string") throw new Error("접두사 생성 오류");

    // 접미사 타임스탬프 파싱
    const timestamp = Date.parse(BUILD_DATE_ISO);
    if (isNaN(timestamp)) throw new Error("빌드 날짜 파싱에 실패했습니다.");

    // 접미사 생성
    const endSuffix = timestamp.toString(36).slice(-4);
    if (!endSuffix || typeof endSuffix !== "string") throw new Error("접미사 생성 오류");

    return `${startPrefix}${randomKey}${endSuffix}`;
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류 발생";
    throw new Error(`BUILD_RAND_KEY<"${message}">`);
  }
})();

const BUILD_RSA_KEY = (() => {
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
      throw new Error("RSA 키 생성 실패(키가 문자열 형태가 아닙니다.)");
    }

    // 키 길이 검증 추가
    if (BUILD_PUBLIC_KEY.length < 100 || BUILD_PRIVATE_KEY.length < 100) {
      throw new Error("RSA 키 생성 실패(키 길이가 너무 짧습니다.)");
    }

    // 파일 저장
    try {
      const dir = "keys";
      const KEYS_DIR = resolve(process.cwd(), dir);

      // 디렉토리 생성
      if (!existsSync(KEYS_DIR)) {
        mkdirSync(KEYS_DIR, { recursive: true });
      }

      // Public 키 파일 저장
      const publicFileName = "buildPublicKey.pem";
      const publicFilePath = join(KEYS_DIR, publicFileName);
      writeFileSync(publicFilePath, BUILD_PUBLIC_KEY, { encoding: "utf-8" });
      chmodSync(publicFilePath, 0o644);

      // Private 키 파일 저장
      const privateFileName = "buildPrivateKey.pem";
      const privateFilePath = join(KEYS_DIR, privateFileName);
      writeFileSync(privateFilePath, BUILD_PRIVATE_KEY, { encoding: "utf-8" });
      chmodSync(privateFilePath, 0o600);
    } catch (fileError) {
      const fileMessage = fileError instanceof Error ? fileError.message : "알 수 없는 파일 오류";
      throw new Error(`BUILD_RSA_KEY<"키 파일 저장 실패(${fileMessage})">`);
    }

    // 결과값
    return { BUILD_PUBLIC_KEY, BUILD_PRIVATE_KEY };
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류 발생";
    throw new Error(`BUILD_RSA_KEY<"${message}">`);
  }
})();

const PACKAGE_VERSION = (() => {
  try {
    if (isClient) throw new Error("보안상 서버환경에서만 실행이 가능합니다.");

    const packageJsonPath = resolve(process.cwd(), "package.json");
    if (!existsSync(packageJsonPath)) throw new Error(`package.json 파일을 찾을 수 없습니다.`);

    const fileContent = readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(fileContent);
    if (!packageJson || typeof packageJson !== "object" || Array.isArray(packageJson)) throw new Error(`package.json 형식에 오류가 발생하였습니다.`);

    const NEXT_PUBLIC_PACKAGE_NAME = packageJson?.name;
    const NEXT_PUBLIC_PACKAGE_VERSION = packageJson?.version;
    const NEXT_PUBLIC_REACT_VERSION = packageJson?.dependencies?.next?.replace(/[\^~]/g, "");
    const NEXT_PUBLIC_NEXT_VERSION = packageJson?.dependencies?.react?.replace(/[\^~]/g, "");

    if (typeof NEXT_PUBLIC_PACKAGE_NAME !== "string") throw new Error("PACKAGE_NAME 오류");
    if (typeof NEXT_PUBLIC_PACKAGE_VERSION !== "string") throw new Error("PACKAGE_VERSION 오류");
    if (typeof NEXT_PUBLIC_REACT_VERSION !== "string") throw new Error("REACT_VERSION 오류");
    if (typeof NEXT_PUBLIC_NEXT_VERSION !== "string") throw new Error("NEXT_VERSION 오류");

    return {
      NEXT_PUBLIC_PACKAGE_NAME,
      NEXT_PUBLIC_PACKAGE_VERSION,
      NEXT_PUBLIC_REACT_VERSION,
      NEXT_PUBLIC_NEXT_VERSION,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "알 수 없는 오류 발생";
    throw new Error(`GET_PACKAGE_VERSION<"${message}">`);
  }
})();

export const CONFIG_ENV = {
  ...PACKAGE_VERSION,
  BUILD_DATE_ISO,
  BUILD_RAND_KEY,
  ...BUILD_RSA_KEY,
};
