const NODE_ENV = process.env.NODE_ENV;
export const IS_MAINTENANCE: boolean = ["true", "on", "1"].includes(String(process.env.NEXT_PUBLIC_IS_MAINTENANCE).toLowerCase().trim());
export const IS_PRODUCTION: boolean = NODE_ENV === "production";
export const IS_DEVELOPMENT: boolean = NODE_ENV === "development";
export const IS_TEST: boolean = NODE_ENV === "test";

export const IS_PROD_MAINTENANCE = IS_MAINTENANCE && IS_PRODUCTION;
export const IS_DEV_MAINTENANCE = IS_MAINTENANCE && IS_DEVELOPMENT;
export const IS_TEST_MAINTENANCE = IS_MAINTENANCE && IS_TEST;
