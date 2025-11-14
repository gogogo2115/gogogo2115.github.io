const rangePercent = (min: number, max: num): number => {};

// // 옵션 정의
// type RangeOptions = {
//   includeMin?: boolean;
//   includeMax?: boolean;
//   allowStringNumbers?: boolean;
// };

// type FloatRangeOptions = RangeOptions & {
//   precision?: number;
// };

// // 정수 범위 확인 함수
// export function isIntegerInRange(value: unknown, min: number, max: number, options: RangeOptions = {}): value is number {
//   const { includeMin = true, includeMax = true, allowStringNumbers = false } = options;

//   let numericValue: number;

//   // 문자열 숫자 허용 시 변환
//   if (allowStringNumbers && typeof value === "string") {
//     const parsed = parseInt(value, 10);
//     if (isNaN(parsed) || parsed.toString() !== value.trim()) return false;
//     numericValue = parsed;
//   } else if (typeof value === "number") {
//     numericValue = value;
//   } else {
//     return false;
//   }

//   // 정수 여부 확인
//   if (!Number.isInteger(numericValue)) return false;

//   // 범위 확인
//   const minCheck = includeMin ? numericValue >= min : numericValue > min;
//   const maxCheck = includeMax ? numericValue <= max : numericValue < max;

//   return minCheck && maxCheck;
// }

// // 정수 범위 확인 함수
// function isIntegerInRange(value, min, max, options = {}) {
//   const { includeMin = true, includeMax = true, allowStringNumbers = false } = options;

//   // 문자열 숫자 허용 시 변환
//   if (allowStringNumbers && typeof value === "string") {
//     const parsed = parseInt(value, 10);
//     if (isNaN(parsed) || parsed.toString() !== value.trim()) {
//       return false;
//     }
//     value = parsed;
//   }

//   // 정수 여부 확인
//   if (!Number.isInteger(value)) {
//     return false;
//   }

//   // 범위 확인
//   const minCheck = includeMin ? value >= min : value > min;
//   const maxCheck = includeMax ? value <= max : value < max;

//   return minCheck && maxCheck;
// }

// // 소수 범위 확인 함수
// function isFloatInRange(value, min, max, options = {}) {
//   const {
//     includeMin = true,
//     includeMax = true,
//     allowStringNumbers = false,
//     precision = null, // 소수점 자릿수 제한
//   } = options;

//   // 문자열 숫자 허용 시 변환
//   if (allowStringNumbers && typeof value === "string") {
//     const parsed = parseFloat(value);
//     if (isNaN(parsed)) {
//       return false;
//     }
//     value = parsed;
//   }

//   // 숫자 타입 확인
//   if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
//     return false;
//   }

//   // 소수점 자릿수 확인 (옵션)
//   if (precision !== null) {
//     const decimalPlaces = (value.toString().split(".")[1] || "").length;
//     if (decimalPlaces > precision) {
//       return false;
//     }
//   }

//   // 범위 확인
//   const minCheck = includeMin ? value >= min : value > min;
//   const maxCheck = includeMax ? value <= max : value < max;

//   return minCheck && maxCheck;
// }

// // 사용 예시
// console.log('=== 정수 범위 확인 예시 ===');
// console.log(isIntegerInRange(5, 1, 10));        // true
// console.log(isIntegerInRange(0, 1, 10));        // false
// console.log(isIntegerInRange(10, 1, 10));       // true
// console.log(isIntegerInRange(10, 1, 10, { includeMax: false })); // false
// console.log(isIntegerInRange(3.5, 1, 10));      // false (정수가 아님)
// console.log(isIntegerInRange('5', 1, 10, { allowStringNumbers: true })); // true

// console.log('\n=== 소수 범위 확인 예시 ===');
// console.log(isFloatInRange(3.14, 0, 5));        // true
// console.log(isFloatInRange(5.0, 0, 5));         // true
// console.log(isFloatInRange(5.1, 0, 5));         // false
// console.log(isFloatInRange(3.14159, 0, 5, { precision: 2 })); // false (소수점 2자리 초과)
// console.log(isFloatInRange(3.14, 0, 5, { precision: 2 }));    // true
// console.log(isFloatInRange('3.14', 0, 5, { allowStringNumbers: true })); // true

// // 범위 경계 제외 예시
// console.log('\n=== 경계값 제외 예시 ===');
// console.log(isIntegerInRange(1, 1, 10, { includeMin: false })); // false
// console.log(isIntegerInRange(2, 1, 10, { includeMin: false })); // true
// console.log(isFloatInRange(5.0, 0, 5, { includeMax: false }));  // false

// const areFiniteNumbers = (...numbers: number[]) => {
//   return numbers.every(Number.isFinite);
// };

// const isFloatInRange = (value: number, min: number, max: number) => {
//   return areFiniteNumbers(value, min, max) && value >= min && value <= max;
// };

// function isIntInRange(value: number, min: number, max: number): boolean {
//   return areFiniteNumbers(value, min, max) && Number.isInteger(value) && value >= min && value <= max;
// }

// const isFloatInRange = (
//   value: number,
//   min: number,
//   max: number,
//   inclusive = true
// ) => {
//   if (!areFiniteNumbers(value, min, max)) return false;
//   return inclusive ? value >= min && value <= max : value > min && value < max;
// };

// function isIntInRange(
//   value: number,
//   min: number,
//   max: number,
//   inclusive: boolean = true
// ): boolean {
//   if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) return false;
//   if (!Number.isInteger(value)) return false;

//   return inclusive
//     ? value >= min && value <= max
//     : value > min && value < max;
// }
