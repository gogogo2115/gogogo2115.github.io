/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const PACKAGE_JSON = require("../../package.json");
const createEnvBuildHash = require("./createEnvBuildHash");

/**
 * @type {string}
 */
const NEXT_VERSION = (PACKAGE_JSON.dependencies?.next || "").replace(/[\^~]/g, "");

const DATE = new Date();

/**
 * @type {string}
 */
const BUILD_KEY = "BUILD_KEY";

/**
 * @type {string}
 */
const BUILD_ISO = DATE.toISOString();

/**
 * @type {string}
 */
const BUILD_TIMESTAMP = DATE.getTime().toString();

/**
 * @type {string}
 */
const BUILD_HASH = createEnvBuildHash({ BUILD_ISO, BUILD_TIMESTAMP, NEXT_VERSION });

if (typeof BUILD_HASH !== "string" || BUILD_HASH.trim() === "") {
  throw new Error("createEnvHash 생성 오류");
}

const configEnv = {
  NEXT_VERSION,
  BUILD_KEY,
  BUILD_ISO,
  BUILD_TIMESTAMP,
  BUILD_HASH,
};

module.exports = configEnv;
