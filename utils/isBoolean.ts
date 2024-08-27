type ToBooleanOptions = { isErrNull: boolean; isStrict: boolean };

export const isBoolean = (value: string = "", isStrict: boolean = true) => {
  value = String(value).toLowerCase().trim();
  const strictBooleans = ["true", "false", "1", "0"];
  const looseBooleans = [...strictBooleans, "yes", "no", "y", "n", "on", "off"];
  return isStrict ? strictBooleans.includes(value) : looseBooleans.includes(value);
};

export const toBoolean = (value: string | boolean | number, options: ToBooleanOptions = { isErrNull: false, isStrict: true }) => {
  value = String(value).toLowerCase();
  const { isErrNull, isStrict } = options;
  if (isErrNull && !isBoolean(value, isStrict)) return null;
  return isStrict ? /^(true|1)$/i.test(value.trim()) : !/^(false|0|no|n|off)$/i.test(value.trim()) && value !== "";
};
