export const NODE_ENV = process.env.NODE_ENV;

export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_NOT_DEVELOPMENT = !IS_DEVELOPMENT;

export const IS_PRODUCTION = NODE_ENV === "production";
export const IS_NOT_PRODUCTION = !IS_PRODUCTION;

export const IS_TEST = NODE_ENV === "test";
export const IS_NOT_TEST = !IS_TEST;

export const CONFIG_NODE = { IS_PRODUCTION, IS_DEVELOPMENT, IS_TEST };
