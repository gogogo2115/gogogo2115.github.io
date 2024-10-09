export interface CONFIG_ENV {
  NEXT_VERSION: string;
  BUILD_KEY: string;
  BUILD_ISO: string;
  BUILD_TIMESTAMP: string;
  BUILD_HASH: string;
}

declare const configEnv: CONFIG_ENV;

export = configEnv;
