type ToBooleanOptions = { isErrNull?: boolean; isStrict?: boolean };

export const isBoolean = (value: string = "", isStrict: boolean = true) => {
  value = String(value).toLowerCase().trim();
  const strictBooleans = ["true", "false", "1", "0"];
  const notStrictBooleans = [...strictBooleans, "yes", "no", "y", "n", "on", "off"];
  return isStrict ? strictBooleans.includes(value) : notStrictBooleans.includes(value);
};

const toBooleanOptions = { isErrNull: false, isStrict: true };

export const toBoolean = (value: string | boolean | number | undefined | null, options: ToBooleanOptions = toBooleanOptions) => {
  value = String(value).toLowerCase();
  const { isErrNull = toBooleanOptions.isErrNull, isStrict = toBooleanOptions.isStrict } = options;
  if (isErrNull && !isBoolean(value, isStrict)) return null;
  return isStrict ? /^(true|1)$/i.test(value.trim()) : !/^(false|0|no|n|off|undefined|null|\[object Object\])$/i.test(value.trim()) && value !== "";
};
