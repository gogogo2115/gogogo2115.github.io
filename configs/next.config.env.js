"use strict";

const { readFileSync } = require("fs");
const { createHash } = require("crypto");

const { stringify: packageStringify, parse: packageParse } = readFileJson("./package.json");
const PACKAGE_HASH = createHash("sha256").update(packageStringify).digest("base64");
const next = packageParse?.dependencies?.next ?? undefined;
const PACKAGE_GENERATOR = next ? `next.js ${next}` : `next.js`;

const BUILD_AT = new Date().toISOString();
const BUILD_TS = Date.parse(BUILD_AT).toString();
const BUILD_HASH = createEnvHash({ PACKAGE_HASH, PACKAGE_GENERATOR, BUILD_AT, BUILD_TS });

const env = {
  PACKAGE_GENERATOR,
  PACKAGE_HASH,
  BUILD_AT,
  BUILD_TS,
  BUILD_HASH,
};

module.exports = env;

function createEnvHash(value) {
  try {
    const stringify = JSON.stringify({ value: value });
    const hash = createHash("sha256").update(stringify).digest("base64");
    return hash.substring(0, 15);
  } catch (e) {
    throw new Error("createEnvHash 생성 오류");
  }
}

function readFileString(filePath) {
  try {
    const readFile = readFileSync(filePath, { encoding: "utf8", flag: "r" });
    return readFile.replace(/\\n/g, "\n");
  } catch (e) {
    throw new Error(`${filePath}를 찾을 수 없습니다.`);
  }
}

function readFileJson(filePath) {
  try {
    const readFile = readFileSync(filePath, { encoding: "utf8", flag: "r" });
    const stringify = readFile.replace(/\\n/g, "\n");
    const parse = JSON.parse(stringify);
    return { stringify, parse };
  } catch (e) {
    throw new Error(`${filePath}를 찾을 수 없습니다.`);
  }
}
