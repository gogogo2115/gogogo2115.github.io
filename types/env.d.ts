// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_PACKAGE_NAME: string;
    NEXT_PUBLIC_PACKAGE_VERSION: string;
    NEXT_PUBLIC_IS_MAINTENANCE: string; // 선택적 변수

    NEXT_VERSION: string;
    BUILD_AT: string;
    BUILD_TS: string;
    BUILD_HASH: string;
  }
}
