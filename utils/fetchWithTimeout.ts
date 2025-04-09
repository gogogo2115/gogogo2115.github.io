// 빠르게 타임아웃 기능만 붙이고 싶으면 Promise.race
// 네트워크 요청 자체를 진짜로 중단하고 싶으면 AbortController

const errMsg = (timeout: number) => `${timeout}ms 안에 워크스페이스 요청이 완료되지 않아 타임아웃되었습니다.`;
/**
 * AbortController를 사용하여 fetch 요청에 타임아웃 기능을 추가합니다.
 * @async
 * @param {string} url - 요청할 URL 주소입니다.
 * @param {RequestInit} [options={}] - fetch 함수의 옵션 객체입니다 (예: headers, method 등).
 * @param {number} [timeout=5000] - 타임아웃 시간 (밀리초)입니다.
 * @returns {Promise<Response>} - fetch 요청의 응답 Promise입니다. 타임아웃 시 reject 됩니다.
 */
export const abortFetchWithTimeout = async (url: string, options: RequestInit = {}, timeout: number = 5000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  options.signal = controller.signal; // AbortController 인스턴스 전달

  try {
    const response = await fetch(url, options);
    return response;
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error(errMsg(timeout));
    }
    throw err;
  } finally {
    clearTimeout(id); // 타이머 정리
  }
};

/**
 * Promise.race 방식을 사용하여 fetch 요청에 타임아웃 기능을 추가합니다.
 * @async
 * @param {string} url - 요청할 URL 주소입니다.
 * @param {RequestInit} [options={}] - fetch 함수의 옵션 객체입니다 (예: headers, method 등).
 * @param {number} [timeout=5000] - 타임아웃 시간 (밀리초)입니다.
 * @returns {Promise<Response>} - fetch 요청의 응답 Promise입니다. 타임아웃 시 reject 됩니다.
 */
export const raceFetchWithTimeout = async (url: string, options: RequestInit = {}, timeout: number = 5000): Promise<Response> => {
  return Promise.race([fetch(url, options), new Promise<Response>((_, reject) => setTimeout(() => reject(new Error(errMsg(timeout))), timeout))]) as Promise<Response>;
};
