/* eslint-disable no-unused-vars */

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_PACKAGE_NAME: string;
    readonly NEXT_PUBLIC_PACKAGE_VERSION: string;
    readonly NEXT_PUBLIC_IS_MAINTENANCE: string;
  }
}
