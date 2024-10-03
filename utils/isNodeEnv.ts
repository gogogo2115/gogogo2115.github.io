import { toBoolean } from "./isBoolean";

const NODE_ENV = process.env.NODE_ENV;
export const IS_PRODUCTION = NODE_ENV === "production";
export const IS_DEVELOPMENT = NODE_ENV === "development";
export const IS_TEST = NODE_ENV === "test";

const NEXT_PUBLIC_IS_MAINTENANCE = process.env.NEXT_PUBLIC_IS_MAINTENANCE;
export const IS_MAINTENANCE = toBoolean(NEXT_PUBLIC_IS_MAINTENANCE);
