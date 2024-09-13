"use strict";

const path = require("path");
const { createHash } = require("crypto");
const { readFileSync } = require("fs");

const createEnvHash = (value) => {
  try {
    const stringify = JSON.stringify({ value: value });
    const hash = createHash("sha512").update(stringify).digest("base64");
    return hash;
  } catch (e) {
    throw new Error("createEnvHash 생성 오류");
  }
};

const readPackageJsonFile = () => {
  try {
    const filePath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(readFileSync(filePath, "utf8"));
    return packageJson;
  } catch (e) {
    return {};
  }
};

const PACKAGE_JSON = readPackageJsonFile();
const NEXT_VERSION = (PACKAGE_JSON.dependencies?.next || "").replace(/[\^~]/g, "");

//     const nextVersion = packageJson.dependencies?.next || packageJson.devDependencies?.next || 'Version not found';
const GENERATOR = "111";
const PACKAGE_NAME = process.env.NEXT_PUBLIC_PACKAGE_NAME ?? "PACKAGE_NAME";
const PACKAGE_VERSION = process.env.NEXT_PUBLIC_PACKAGE_VERSION ?? "0.0.0";

const BUILD_AT = new Date().toISOString();
const BUILD_TS = Date.parse(BUILD_AT).toString();
const BUILD_HASH = createEnvHash({ BUILD_AT, BUILD_TS, PACKAGE_NAME, PACKAGE_VERSION, NEXT_VERSION });

const env = {
  NEXT_VERSION,
  GENERATOR,
  BUILD_AT,
  BUILD_TS,
  BUILD_HASH,
  PACKAGE_NAME,
  PACKAGE_VERSION,
};

module.exports = env;
