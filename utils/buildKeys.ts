// 노출 방지 (서버에서만 호출되도록 처리)
const isServerCache = typeof window === "undefined";

export const GET_BUILD_PUBLIC_KEY: string = process.env.BUILD_PUBLIC_KEY;

export const GET_BUILD_PRIVATE_KEY: string | undefined = isServerCache ? process.env.BUILD_PRIVATE_KEY : undefined;

// let cacheInitialized: boolean = false;
// let privateKeyFileCache: string | undefined;
// export const GET_BUILD_PRIVATE_KEY_FILE = ((): string | undefined => {
//   if (!isServerCache) return undefined;
//   if (cacheInitialized) return privateKeyFileCache;
//   try {
//     // Node.js 모듈 타입 정의
//     const fs = require("fs") as typeof import("fs");
//     const path = require("path") as typeof import("path");

//     const privateKeyPath = path.join(process.cwd(), "keys", "buildPrivateKey.pem");
//     if (!fs.existsSync(privateKeyPath)) {
//       privateKeyFileCache = undefined;
//     } else {
//       const readFile = fs.readFileSync(privateKeyPath, "utf-8").trim();
//       privateKeyFileCache = readFile;
//     }
//   } catch {
//     privateKeyFileCache = undefined;
//   } finally {
//     cacheInitialized = true;
//   }
//   return privateKeyFileCache;
// })();
