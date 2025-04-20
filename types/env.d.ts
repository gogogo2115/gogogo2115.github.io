declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_CONFIG_PACKAGE_VERSION: string;
    NEXT_PUBLIC_CONFIG_PACKAGE_NAME: string;
    NEXT_PUBLIC_CONFIG_NEXT_VERSION: string;

    BUILD_DATE_ISO: string;
    BUILD_RAND_KEY: string;
    // BUILD_PUBLIC_KEY 숨김 처리
    // BUILD_PRIVATE_KEY 숨김 처리
    // Add other environment variables here
  }
}
