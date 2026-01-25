namespace NodeJS {
  interface ProcessEnv {
    readonly BUILD_DATE_ISO: string;
    readonly BUILD_RAND_KEY: string;

    readonly PACKAGE_NAME: string;
    readonly PACKAGE_VERSION: string;
    readonly PACKAGE_NEXT_VERSION: string;
    readonly PACKAGE_REACT_VERSION: string;
  }
}
