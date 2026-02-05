type Value = string | number | boolean;
type ParseBooleanOptions = {
  /**
   * - true  : 지정된 케이스만 허용 (예: "true", "True", "TRUE"만 허용. "tRuE"는 불허)
   * - false : 문자열을 소문자 정규화해서 비교 (예: "tRuE"도 허용됨)
   */
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

  const isParseBoolean = (value: unknown): boolean => {
    return parseBoolean(value) !== undefined;
  };

  return { parseBoolean, isParseBoolean };
};

export const parseBoolean = (value: unknown, options: ParseBooleanOptions = {}): boolean | undefined => {
  return createParserBoolean(options).parseBoolean(value);
};

export const isParseBoolean = (value: unknown, options: ParseBooleanOptions = {}): boolean => {
  return createParserBoolean(options).isParseBoolean(value);
};
