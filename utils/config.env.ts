import packageJSON from "../package.json";

const NEXT_VERSION = (packageJSON.dependencies.next || "").replace(/[\^~]/g, "");

const buildDate = new Date();
const BUILD_ISO = buildDate.toISOString();
const BUILD_TIMESTAMP = buildDate.getTime().toString();

const env = { NEXT_VERSION, BUILD_ISO, BUILD_TIMESTAMP };

export default env;
