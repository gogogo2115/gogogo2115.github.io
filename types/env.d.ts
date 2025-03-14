declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_NPM_PACKAGE_NAME: string | undefined;
    NEXT_PUBLIC_NPM_PACKAGE_VERSION: string | undefined;

    NEXT_PUBLIC_IS_PAGE_MAINTENANCE: string | undefined;
    NEXT_PUBLIC_IS_API_MAINTENANCE: string | undefined;

    PACKAGE_VERSION: string;
    PACKAGE_NEXT_VERSION: string;
    PACKAGE_NAME: string;

    BUILD_ISO: string;
    BUILD_KEY: string;
    // Add other environment variables here
  }
}
