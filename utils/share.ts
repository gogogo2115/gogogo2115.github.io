// Web Share API 사용 옵션 정의
type Options = {
  onNotSupported?: () => void; // 공유 기능 미지원 시 콜백
  onSuccess?: () => void; // 공유 성공 시 콜백
  onFailure?: (message?: string, error?: unknown) => void; // 공유 실패 시 콜백 (미지원 포함 가능)
  onCancel?: () => void; // 사용자가 공유 취소 시 콜백
};

/**
 * navigator.share API 지원 여부를 확인하는 함수
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isShareSupported = (): boolean => typeof navigator !== "undefined" && "share" in navigator && typeof navigator.share === "function" && window.isSecureContext;

/**
 * Web Share API를 사용하여 데이터를 공유하는 비동기 함수
 * @param data 공유할 데이터 (ShareData 타입)
 * @param options 공유 결과 처리를 위한 콜백 옵션
 */
export const share = async (data?: ShareData, options: Options = {}) => {
  const { onNotSupported, onFailure, onSuccess, onCancel } = options;
  try {
    // 미지원 시 onNotSupported 콜백 실행 (제공된 경우)
    if (!isShareSupported()) {
      // onNotSupported 콜백이 없으면 에러 발생시켜 onFailure로 처리 유도
      if (typeof onNotSupported !== "function") throw new Error("공유 기능이 지원되지 않습니다.");
      onNotSupported();
      return;
    }

    // 공유할 수 없는 데이터 형식인 경우 에러 발생
    if (typeof navigator.canShare === "function" && !navigator.canShare(data)) {
      throw new Error("공유할 수 없는 데이터 형식입니다.");
    }

    // navigator.share API 호출
    await navigator.share(data);
    if (typeof onSuccess === "function") onSuccess();
  } catch (e) {
    // 사용자가 공유를 취소한 경우 (AbortError)
    if ((e instanceof DOMException || e instanceof Error) && e.name === "AbortError") {
      if (typeof onCancel === "function") {
        onCancel(); // 취소 실행
      }
    } else {
      // 그 외 다른 에러 발생 시
      if (typeof onFailure === "function") {
        onFailure(e instanceof Error ? e.message : "unknown error", e);
      }
    }
  }
};
