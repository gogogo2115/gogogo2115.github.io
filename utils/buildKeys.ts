/* eslint-disable @typescript-eslint/no-require-imports */

// 노출 방지 (서버에서만 호출되도록 처리)
const isClientCache = typeof window !== "undefined";

export const GET_BUILD_PRIVATE_KEY = (): string | undefined => {
  if (isClientCache) return undefined;
  const pk = process.env.BUILD_PRIVATE_KEY;
  return typeof pk === "string" ? pk : undefined;
};

let privateKeyFileCache: string | undefined;
let cacheInitialized: boolean = false;
export const GET_BUILD_PRIVATE_KEY_FILE = (): string | undefined => {
  if (isClientCache) return undefined;
  if (cacheInitialized) return privateKeyFileCache;
  try {
    // Node.js 모듈 타입 정의
    const fs = require("fs") as typeof import("fs");
    const path = require("path") as typeof import("path");

    const privateKeyPath = path.join(process.cwd(), "keys", "buildPrivateKey.pem");
    if (!fs.existsSync(privateKeyPath)) {
      privateKeyFileCache = undefined;
    } else {
      const readFile = fs.readFileSync(privateKeyPath, "utf-8").trim();
      privateKeyFileCache = typeof readFile === "string" ? readFile : undefined;
    }
  } catch {
    privateKeyFileCache = undefined;
  } finally {
    cacheInitialized = true;
  }

  return privateKeyFileCache;
};
