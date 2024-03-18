const NODE_ENV = process.env.NODE_ENV;

/**
 * process.env.BUILD_AT // 빌드가 된 시간을 나타내는 UTC형식의 문자열
 * @type {string}
 */
export const BUILD_AT = process.env.BUILD_AT;

/**
 * process.env.BUILD_AT // 빌드가 된 시간을 나타내는 UTC의 timestamp 문자열
 * @type {string}
 */
export const BUILD_TS = process.env.BUILD_TS;

/**
 * process.env.BUILD_AT 빌드될 때 생성된 난수
 * @type {string}
 */
export const BUILD_HASH = process.env.BUILD_HASH;

/**
 * process.env.PACKAGE_GENERATOR 값: package.json의 next 버전
 * @type {string}
 */
export const PACKAGE_GENERATOR = process.env.PACKAGE_GENERATOR;

/**
 * process.env.NEXT_PUBLIC_PACKAGE_VERSION 값: package.json의 version
 * @type {string}
 */
export const PACKAGE_VERSION = process.env.NEXT_PUBLIC_PACKAGE_VERSION;

/**
 * process.env.NEXT_PUBLIC_PACKAGE_NAME 값: package.json의 name
 * @type {string}
 */
export const PACKAGE_NAME = process.env.NEXT_PUBLIC_PACKAGE_NAME;

export const IS_MAINTENANCE: boolean = ["true", "on", "1"].includes(String(process.env.NEXT_PUBLIC_IS_MAINTENANCE).toLowerCase().trim());
export const IS_PRODUCTION: boolean = NODE_ENV === "production";
export const IS_DEVELOPMENT: boolean = NODE_ENV === "development";
export const IS_TEST: boolean = NODE_ENV === "test";

export const IS_PROD_MAINTENANCE = IS_MAINTENANCE && IS_PRODUCTION;
export const IS_DEV_MAINTENANCE = IS_MAINTENANCE && IS_DEVELOPMENT;
export const IS_TEST_MAINTENANCE = IS_MAINTENANCE && IS_TEST;

export const isClient: boolean = typeof window !== "undefined" && !!window.document && !!window.document.createElement;
export const isServer: boolean = !isClient;

export const isNavigator: boolean = !!(typeof navigator != "undefined");

// next.js ssg cache
export const fetchHeaderSsgCache: { cache: string } = { cache: "force-cache" };

// next.js ssr cache
export const fetchHeaderSsrCache: { cache: string } = { cache: "no-store" };

// next.js Isr cache
const defaultRevalidateSec: number = 86400;
export const fetchHeaderIsrRevalidate = ({ revalidateSec = defaultRevalidateSec, tags = undefined }: { revalidateSec?: number; tags?: string[] }) => {
  const validateRevalidate = Number.isInteger(revalidateSec) && revalidateSec >= 0 ? revalidateSec : defaultRevalidateSec;
  return { next: { revalidate: validateRevalidate, tags } };
};
