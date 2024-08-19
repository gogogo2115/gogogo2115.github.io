"use strict";
const { createHash } = require("crypto");

const createEnvHash = (value) => {
  try {
    const stringify = JSON.stringify({ value: value });
    const hash = createHash("sha512").update(stringify).digest("base64");
    return hash;
  } catch (e) {
    throw new Error("createEnvHash 생성 오류");
  }
};

const PACKAGE_NAME = process.env.NEXT_PUBLIC_PACKAGE_NAME ?? "PACKAGE_NAME";
const PACKAGE_VERSION = process.env.NEXT_PUBLIC_PACKAGE_VERSION ?? "0.0.0";

const BUILD_AT = new Date().toISOString();
const BUILD_TS = Date.parse(BUILD_AT).toString();
const BUILD_HASH = createEnvHash({ BUILD_AT, BUILD_TS, PACKAGE_NAME, PACKAGE_VERSION });

const GENERATOR = "14.2.5";

const env = {
  GENERATOR,
  BUILD_AT,
  BUILD_TS,
  BUILD_HASH,
};

module.exports = env;
