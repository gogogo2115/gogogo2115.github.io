const NODE_ENV = process.env.NODE_ENV;
/**
 * @type {boolean}
 */
const IS_PRODUCTION = NODE_ENV === "production";

/**
 * @type {boolean}
 */
const IS_DEVELOPMENT = NODE_ENV === "development";

/**
 * @type {boolean}
 */
const IS_TEST = NODE_ENV === "test";

/**
 * @typedef {Object} ISNodeEnv
 * @property {boolean} IS_PRODUCTION
 * @property {boolean} IS_DEVELOPMENT
 * @property {boolean} IS_TEST
 */

/**
 * @type {ISNodeEnv}
 */
const IS_NODE_ENV = { IS_PRODUCTION, IS_DEVELOPMENT, IS_TEST };

module.exports = {
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  IS_TEST,
  IS_NODE_ENV,
};
