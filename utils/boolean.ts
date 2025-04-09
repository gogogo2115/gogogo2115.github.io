const STRICT_TRUE_BOOLEANS = new Set(["true", "1"]);
const STRICT_FALSE_BOOLEANS = new Set(["false", "0"]);
const STRICT_BOOLEANS = new Set([...STRICT_TRUE_BOOLEANS, STRICT_FALSE_BOOLEANS]);

const LOOSE_TRUE_BOOLEANS = new Set([...STRICT_TRUE_BOOLEANS, "yes", "y", "on"]);
const LOOSE_FALSE_BOOLEANS = new Set([...STRICT_FALSE_BOOLEANS, "no", "n", "off"]);
const LOOSE_BOOLEANS = new Set([...LOOSE_TRUE_BOOLEANS, ...LOOSE_FALSE_BOOLEANS]);

export const isBooleanStrict = (value: unknown): boolean => {
  return typeof value === "string" && STRICT_BOOLEANS.has(value);
};

export const isBooleanLoose = (value: unknown): boolean => {
  return typeof value === "string" && LOOSE_BOOLEANS.has(value);
};

export const isBoolean = (value: unknown, strict: boolean = true): boolean => {
  return strict ? isBooleanStrict(value) : isBooleanLoose(value);
};

export const toBooleanStrict = (value: unknown, fallbackValue: boolean | null | undefined = false): boolean | null | undefined => {
  if (typeof value !== "string" || !STRICT_BOOLEANS.has(value)) return fallbackValue;
  return STRICT_TRUE_BOOLEANS.has(value);
};

export const toBooleanLoose = (value: unknown, fallbackValue: boolean | null | undefined = false): boolean | null | undefined => {
  if (typeof value !== "string" || !LOOSE_BOOLEANS.has(value)) return fallbackValue;
  return LOOSE_TRUE_BOOLEANS.has(value);
};

export const toBoolean = (value: unknown, options: { strict?: boolean; fallbackValue?: boolean | null | undefined } = {}): boolean | null | undefined => {
  const { strict = true, fallbackValue = false } = options;
  return strict ? toBooleanStrict(value, fallbackValue) : toBooleanLoose(value, fallbackValue);
};
