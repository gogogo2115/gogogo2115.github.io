/* eslint-disable @typescript-eslint/no-require-imports */
"use strict";

const packageJSON = require("../package.json");

const NEXT_VERSION = (packageJSON.dependencies.next || "").replace(/[\^~]/g, "");

const env = { NEXT_VERSION };

module.exports = env;
