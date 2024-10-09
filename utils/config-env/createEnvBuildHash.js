// eslint-disable-next-line @typescript-eslint/no-require-imports
const { createHmac } = require("crypto");

const createEnvBuildHash = (value, key = "") => {
  try {
    const stringify = JSON.stringify({ value: value });
    return createHmac("sha256", key).update(stringify).digest("base64");
  } catch {
    return "";
  }
};

module.exports = createEnvBuildHash;
