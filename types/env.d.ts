/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_PACKAGE_NAME: string;
    readonly NEXT_PUBLIC_PACKAGE_VERSION: string;
    readonly NEXT_PUBLIC_IS_MAINTENANCE: string;

    readonly PACKAGE_GENERATOR: string;
    readonly PACKAGE_HASH: string;
    readonly BUILD_AT: string;
    readonly BUILD_TS: string;
    readonly BUILD_HASH: string;

    readonly NEXT_PUBLIC_GISCUS_REPO: string;
    readonly NEXT_PUBLIC_GISCUS_REPO_ID: string;
    readonly NEXT_PUBLIC_GISCUS_CATEGORY: string;
    readonly NEXT_PUBLIC_GISCUS_CATEGORY_ID: string;
  }
}
