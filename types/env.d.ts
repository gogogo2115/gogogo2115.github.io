declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_PACKAGE_VERSION: string;
    NEXT_PUBLIC_PACKAGE_NAME: string;
    NEXT_PUBLIC_NEXT_VERSION: string;
    NEXT_PUBLIC_REACT_VERSION: string;

    BUILD_DATE_ISO: string;
    BUILD_RAND_KEY: string;
    BUILD_PUBLIC_KEY: string;
    // BUILD_PRIVATE_KEY 자동 완성 숨김 처리 (서버에서만 호출)
    // Add other environment variables here
  }
}
