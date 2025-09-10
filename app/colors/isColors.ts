type RangeOptions = {
  allowFloat?: boolean; // 소수점 허용 여부, 기본 false
};

export const range0to255 = (value: unknown, option: RangeOptions = {}): value is boolean => {
  const { allowFloat = false } = option;
  return (
    typeof value === "number" && // 숫자인지
    !Number.isNaN(value) && // NaN인지 아닌지
    (allowFloat || Number.isInteger(value)) && // 소수점 허용 여부 체크
    value >= 0 &&
    value <= 255 // 0~255 범위인지
  );
};

export const range0to360 = (value: unknown, option: RangeOptions = {}) => {
  const { allowFloat = false } = option;
  return (
    typeof value === "number" && // 숫자인지
    !Number.isNaN(value) && // NaN인지 아닌지
    (allowFloat || Number.isInteger(value)) && // 소수점 허용 여부 체크
    value >= 0 &&
    value <= 360 // 0~360 범위인지
  );
};

export const range0to100 = (value: unknown, option: RangeOptions = {}) => {
  const { allowFloat = false } = option;
  return (
    typeof value === "number" && // 숫자인지
    !Number.isNaN(value) && // NaN인지 아닌지
    (allowFloat || Number.isInteger(value)) && // 소수점 허용 여부 체크
    value >= 0 &&
    value <= 100 // 0~360 범위인지
  );
};
