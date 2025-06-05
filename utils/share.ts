/**
 * navigator.share API 지원 여부를 확인하는 함수
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isShareSupported = (): boolean => {
  return typeof navigator !== "undefined" && "share" in navigator && typeof navigator.share === "function" /* && window.isSecureContext */;
};

/**
 * 현재 브라우저에서 웹 공유 API(Web Share API)를 지원하지 않는지 확인합니다.
 * 이 함수는 `isShareSupported` 함수의 부정(negation)입니다.
 *
 * @returns {boolean} 웹 공유 API를 지원하지 않으면 `true`, 지원하면 `false`를 반환합니다.
 * @see {@link isShareSupported}
 */
export const isShareNotSupported = (): boolean => {
  return !isShareSupported();
};
