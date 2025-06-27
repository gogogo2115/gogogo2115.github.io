export const STRICT_TRUE_BOOLEANS = new Set([true, 1, "true", "1"]);
export const STRICT_FALSE_BOOLEANS = new Set([false, 0, "false", "0"]);
export const STRICT_BOOLEANS = new Set([...STRICT_TRUE_BOOLEANS, ...STRICT_FALSE_BOOLEANS]);

export const LOOSE_TRUE_BOOLEANS = new Set([...STRICT_TRUE_BOOLEANS, "yes", "y", "on"]);
export const LOOSE_FALSE_BOOLEANS = new Set([...STRICT_FALSE_BOOLEANS, "no", "n", "off"]);
export const LOOSE_BOOLEANS = new Set([...LOOSE_TRUE_BOOLEANS, ...LOOSE_FALSE_BOOLEANS]);

const isValidValue = (value: unknown): value is "string" | "number" | "boolean" => {
  return ["string", "number", "boolean"].some((v) => v === typeof value);
};

/**
 * 주어진 값이 엄격한 불리언 값으로 간주될 수 있는지 확인합니다.
 * 엄격한 기준은 실제 불리언 값 (true, false), 숫자 (1, 0), 그리고 문자열 ("true", "false", "1", "0")입니다.
 *
 * @param value 확인할 값
 * @returns 값이 엄격한 불리언 값이면 true, 아니면 false
 */
export const isBooleanStrict = (value: unknown): boolean => {
  return isValidValue(value) && STRICT_BOOLEANS.has(value);
};

/**
 * 주어진 값이 느슨한 불리언 값으로 간주될 수 있는지 확인합니다.
 * 느슨한 기준은 엄격한 불리언 값에 더하여 "yes", "y", "on", "no", "n", "off" 문자열을 포함합니다.
 *
 * @param value 확인할 값
 * @returns 값이 느슨한 불리언 값이면 true, 아니면 false
 */
export const isBooleanLoose = (value: unknown): boolean => {
  return isValidValue(value) && LOOSE_BOOLEANS.has(value);
};

/**
 * 주어진 값이 불리언 값으로 간주될 수 있는지 확인합니다.
 * `strict` 옵션에 따라 엄격한 또는 느슨한 기준을 사용합니다.
 *
 * @param value 확인할 값
 * @returns 값이 불리언 값이면 true, 아니면 false
 */
export const isBoolean = (value: unknown): boolean => {
  return isValidValue(value) && (STRICT_BOOLEANS.has(value) || LOOSE_BOOLEANS.has(value));
};

/**
 * 주어진 값을 엄격한 불리언 값으로 변환합니다.
 * 변환에 실패하면 제공된 `fallbackValue`를 반환합니다.
 * 엄격한 기준은 실제 불리언 값 (true, false), 숫자 (1, 0), 그리고 문자열 ("true", "false", "1", "0")입니다.
 *
 * @param value 변환할 값
 * @param fallbackValue 변환에 실패했을 때 반환할 값 (기본값: false)
 * @returns 변환된 불리언 값 또는 fallbackValue
 */
export const toBooleanStrict = (value: unknown, fallbackValue?: boolean | null | undefined): boolean | null | undefined => {
  if (!isValidValue(value) || !STRICT_BOOLEANS.has(value)) return fallbackValue;
  return STRICT_TRUE_BOOLEANS.has(value);
};

/**
 * 주어진 값을 느슨한 불리언 값으로 변환합니다.
 * 변환에 실패하면 제공된 `fallbackValue`를 반환합니다.
 * 느슨한 기준은 엄격한 불리언 값에 더하여 "yes", "y", "on", "no", "n", "off" 문자열을 포함합니다.
 *
 * @param value 변환할 값
 * @param fallbackValue 변환에 실패했을 때 반환할 값 (기본값: false)
 * @returns 변환된 불리언 값 또는 fallbackValue
 */
export const toBooleanLoose = (value: unknown, fallbackValue?: boolean | null | undefined): boolean | null | undefined => {
  if (!isValidValue(value) || !LOOSE_BOOLEANS.has(value)) return fallbackValue;
  return LOOSE_TRUE_BOOLEANS.has(value);
};

/**
 * 주어진 값을 불리언 값으로 변환합니다.
 * `options` 객체를 통해 엄격한 또는 느슨한 기준을 선택하고, 폴백 값을 설정할 수 있습니다.
 *
 * @param value 변환할 값
 * @param fallbackValue: 변환 실패 시 반환 값
 * @returns 변환된 불리언 값 또는 fallbackValue
 */
export const toBoolean = (value: unknown, fallbackValue?: boolean | null | undefined): boolean | null | undefined => {
  if (!isValidValue(value)) return fallbackValue;
  if (STRICT_TRUE_BOOLEANS.has(value) || LOOSE_TRUE_BOOLEANS.has(value)) return true;
  if (STRICT_FALSE_BOOLEANS.has(value) || LOOSE_FALSE_BOOLEANS.has(value)) return false;
  return fallbackValue;
};
