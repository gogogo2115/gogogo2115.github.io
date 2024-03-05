const NODE_ENV = process.env.NODE_ENV;
export const ENV_IS_MAINTENANCE: boolean = ["true", "on", "1"].includes(String(process.env.NEXT_PUBLIC_IS_MAINTENANCE).toLowerCase().trim());
export const ENV_IS_PRODUCTION: boolean = NODE_ENV === "production";
export const ENV_IS_DEVELOPMENT: boolean = NODE_ENV === "development";
export const ENV_IS_TEST: boolean = NODE_ENV === "test";
