declare const IS_PRODUCTION: boolean;
declare const IS_DEVELOPMENT: boolean;
declare const IS_TEST: boolean;
declare const IS_NODE_ENV: { IS_PRODUCTION: boolean; IS_DEVELOPMENT: boolean; IS_TEST: boolean };

export { IS_PRODUCTION, IS_DEVELOPMENT, IS_TEST, IS_NODE_ENV };
