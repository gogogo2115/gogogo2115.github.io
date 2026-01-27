type Value = string | number | boolean;
type ParseBooleanOptions = {
  caseSensitive?: boolean;
  extendTrueValues?: readonly Value[];
  extendFalseValues?: readonly Value[];
};

const STRICT_TRUE_VALUES: ReadonlySet<Value> = new Set([true, 1, "true", "1"]);
const STRICT_FALSE_VALUES: ReadonlySet<Value> = new Set([false, 0, "false", "0"]);

const normalizedValue = (value: unknown, caseSensitive?: boolean): Value | undefined => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "string") return (caseSensitive ? value : value.toLowerCase()).trim() || undefined;
  return undefined;
};

const normalizedSet = (arr: readonly Value[], caseSensitive?: boolean) => {
  const set = new Set<Value>();
  if (!Array.isArray(arr) || arr.length <= 0) return set;
  for (const candidate of arr) {
    const normalized = normalizedValue(candidate, caseSensitive);
    if (normalized !== undefined) set.add(normalized);
  }
  return set;
};

export const isParseBoolean = (value: unknown, options: ParseBooleanOptions = {}): boolean => {
  return parseBoolean(value, options) !== undefined;
};

export const parseBoolean = (value: unknown, options: ParseBooleanOptions = {}): boolean | undefined => {
  const { caseSensitive = false, extendTrueValues = [], extendFalseValues = [] } = options;

  const normalized = normalizedValue(value, caseSensitive);
  if (normalized === undefined) return undefined;

  if (typeof normalized === "boolean") return normalized;
  if (STRICT_TRUE_VALUES.has(normalized)) return true;
  if (STRICT_FALSE_VALUES.has(normalized)) return false;

  if (extendTrueValues.length > 0) {
    const extTrue = normalizedSet(extendTrueValues, caseSensitive);
    if (extTrue.has(normalized)) return true;
  }

  if (extendFalseValues.length > 0) {
    const extFalse = normalizedSet(extendFalseValues, caseSensitive);
    if (extFalse.has(normalized)) return false;
  }

  return undefined;
};
