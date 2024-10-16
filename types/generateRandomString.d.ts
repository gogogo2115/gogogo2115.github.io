/* eslint-disable no-unused-vars */
/**
 * 지정된 길이의 랜덤 문자열을 생성합니다.
 *
 * @param length 생성할 랜덤 문자열의 길이. 기본값은 8입니다.
 * @param characters 랜덤 문자열에 사용할 문자 집합. 기본적으로 섞인 기본 문자 집합을 사용합니다.
 * @returns 생성된 랜덤 문자열
 *
 * @example
 * import generateRandomString from './path/to/generateRandomString';
 * const randomStr = generateRandomString(10);
 * console.log(randomStr); // 예: 'aZ3bT9xQ1m'
 */
declare function generateRandomString(length?: number, characters?: string): string;

export = generateRandomString;
