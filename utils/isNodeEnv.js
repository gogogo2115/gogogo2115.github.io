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
 *  Node.js 실행 환경을 나타내는 플래그 객체의 타입 정의
 * @typedef {Object} IS_NODE_ENV
 * @property {boolean} IS_PRODUCTION - 프로덕션 환경 여부
 * @property {boolean} IS_DEVELOPMENT - 개발 환경 여부
 * @property {boolean} IS_TEST - 테스트 환경 여부
 */

/**
 * 현재 Node.js 실행 환경을 나타내는 플래그 객체
 * @type {IS_NODE_ENV}
 */
const IS_NODE_ENV = { IS_PRODUCTION, IS_DEVELOPMENT, IS_TEST };

module.exports = {
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  IS_TEST,
  IS_NODE_ENV,
};
