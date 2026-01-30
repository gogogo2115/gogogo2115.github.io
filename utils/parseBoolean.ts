type Value = string | number | boolean;
type ParseBooleanOptions = {
  caseSensitive?: boolean;
  extendTrueValues?: readonly Value[];
  extendFalseValues?: readonly Value[];
};

const STRICT_TRUE_VALUES: ReadonlySet<Value> = new Set([true, 1, "true", "1", "True", "TRUE"]);
const STRICT_FALSE_VALUES: ReadonlySet<Value> = new Set([false, 0, "false", "0", "False", "FALSE"]);

const normalizedValue = (value: unknown, caseSensitive?: boolean): Value | undefined => {
  if (typeof value === "boolean") return value;
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  if (typeof value === "string") {
    const s = (caseSensitive ? value : value.toLowerCase()).trim();
    return s.length >= 1 ? s : undefined;
  }
  return undefined;
};

const normalizedSet = (arr: readonly Value[], caseSensitive?: boolean) => {
  const set = new Set<Value>();
  for (const v of arr) {
    const n = normalizedValue(v, caseSensitive);
    if (n !== undefined) set.add(n);
  }
  return set;
};

export const createParserBoolean = (options: ParseBooleanOptions = {}) => {
  const { caseSensitive = true, extendTrueValues = [], extendFalseValues = [] } = options;

  const EXTEND_TRUE_VALUES = normalizedSet(extendTrueValues, caseSensitive);
  const EXTEND_FALSE_VALUES = normalizedSet(extendFalseValues, caseSensitive);

  const parseBoolean = (value: unknown): boolean | undefined => {
    const n = normalizedValue(value, caseSensitive);
    if (n === undefined) return undefined;

    if (typeof n === "boolean") return n;

    if (STRICT_TRUE_VALUES.has(n)) return true;
    if (STRICT_FALSE_VALUES.has(n)) return false;

    if (EXTEND_TRUE_VALUES.has(n)) return true;
    if (EXTEND_FALSE_VALUES.has(n)) return false;

    return undefined;
  };

  return {
    parseBoolean,
    isParseBoolean: (value: unknown): boolean => parseBoolean(value) !== undefined,
  };
};

export const isParseBoolean = (value: unknown, options: ParseBooleanOptions = {}): boolean => {
  return createParserBoolean(options).isParseBoolean(value);
};

export const parseBoolean = (value: unknown, options: ParseBooleanOptions = {}): boolean | undefined => {
  return createParserBoolean(options).parseBoolean(value);
};
