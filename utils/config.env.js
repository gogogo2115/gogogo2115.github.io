/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const packageJSON = require("../package.json");
const NEXT_VERSION = (packageJSON.dependencies.next || "").replace(/[\^~]/g, ""); // next.js 버전

const buildDate = new Date(); // 마지막 빌드일
const BUILD_ISO = buildDate.toISOString();
const BUILD_TIMESTAMP = buildDate.getTime().toString();

const env = { NEXT_VERSION, BUILD_ISO, BUILD_TIMESTAMP };

module.exports = env;
