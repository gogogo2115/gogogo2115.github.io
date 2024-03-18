type ValueType = string | number | boolean;
type ToBooleanOpts = {
  isErrNull?: boolean;
  isStrict?: boolean;
};

/**
 * 값이 부울(boolean)로 해석될 수 있는지 확인합니다.
 *
 * @param {ValueType} val 확인할 값.
 * @param {boolean} [strict=true] ("true", "false", "1", "0")만 허용 여부, false인 경우 추가적인 여유로운 부울(boolean) 값들도 허용 ("yes", "no", "y", "n", "on", "off").
 * @returns { boolean } 값이 부울(boolean)로 해석될 수 있다면 true, 그렇지 않다면 false를 반환합니다.
 *
 * @example
 * const example = isBoolean("true");
 * // 반환값: true
 *
 * @example
 * const example = isBoolean("yes", false);
 * // 반환값: true
 *
 * @example
 * const result = isBoolean("foo");
 * // 반환값: false
 *
 */
export const isBoolean = (val: ValueType, strict: boolean = true): boolean => {
  const toStr = String(val).toLowerCase().trim();
  const strictBooleans = ["true", "false", "1", "0"];
  const looseBooleans = [...strictBooleans, "yes", "no", "y", "n", "on", "off"];
  return strict ? strictBooleans.includes(toStr) : looseBooleans.includes(toStr);
};

/**
 * 값을 부울(boolean)로 변환합니다.
 * @param {ValueType} [val=""] 변환할 값입니다. 기본값은 빈 문자열입니다.
 * @param {ToBooleanOpts} [opts={}] - 옵션 객체로, isErrNull 및 isStrict를 설정할 수 있습니다.
 * @param {boolean} [opts.isErrNull=false] - true인 경우 값이 부울(boolean)이 아닌 경우 변환되지 않고 null을 반환합니다.
 * @param {boolean} [opts.isStrict=true] - true인 경우 엄격한 부울 값을 사용하여 변환합니다. false인 경우 추가적인 여유로운 부울 값들도 허용합니다.
 * @returns {boolean | null} 부울(boolean)값 또는 isErrNull이 true이고 값이 부울로 변환되지 않았을 경우 null을 반환합니다.
 *
 * @example
 * const example = toBoolean("true");
 * // 반환값: true
 *
 * @example
 * const example = toBoolean("no", { isStrict: false });
 * // 반환값: false
 *
 * @example
 * const example = toBoolean("foo", { isErrNull: true });
 * // 반환값: null
 */
export const toBoolean = (val: ValueType = "", opts: ToBooleanOpts = {}): boolean | null => {
  const toStr = String(val).toLowerCase().trim();
  const { isErrNull = false, isStrict = true } = opts;
  if (isErrNull && !isBoolean(toStr, isStrict)) return null;
  return isStrict ? ["true", "1"].includes(toStr) : !["false", "0", "no", "n", "off", "null", "undefined"].includes(toStr) && toStr !== "";
};
