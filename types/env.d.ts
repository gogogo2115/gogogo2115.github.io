declare namespace NodeJS {
  interface ProcessEnv {
    PACKAGE_VERSION: string;
    PACKAGE_NEXT_VERSION: string;
    PACKAGE_NAME: string;

    BUILD_ISO: string;
    BUILD_KEY: string;
    // Add other environment variables here
  }
}
