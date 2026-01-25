namespace NodeJS {
  interface ProcessEnv {
    readonly BUILD_DATE_ISO: string;
    readonly BUILD_RAND_KEY: string;

    readonly PACKAGE_NAME: string;
    readonly PACKAGE_VERSION: string;
    readonly PACKAGE_NEXT_VERSION: string;
    readonly PACKAGE_REACT_VERSION: string;

    readonly BUILD_RSA_PUBLIC_KEY: string;
    /* 보안 정책상 활성화 하지 말 것
    readonly BUILD_RSA_PRIVATE_KEY: string;
    */
  }
}
