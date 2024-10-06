const NODE_ENV = process.env.NODE_ENV;
const IS_PRODUCTION = NODE_ENV === "production";
const IS_DEVELOPMENT = NODE_ENV === "development";
const IS_TEST = NODE_ENV === "test";

module.exports = {
  IS_PRODUCTION,
  IS_DEVELOPMENT,
  IS_TEST,
};
