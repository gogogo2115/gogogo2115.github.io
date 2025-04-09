import { IS_DEVELOPMENT } from "./configNode"; // 개발 환경 여부 확인용 상수

// Web Share API 사용 옵션 정의
type Options = {
  onNotSupported?: () => void; // 공유 기능 미지원 시 콜백
  onSuccess?: () => void; // 공유 성공 시 콜백
  onFailure?: (message?: string) => void; // 공유 실패 시 콜백 (미지원 포함 가능)
  onCancel?: () => void; // 사용자가 공유 취소 시 콜백
};

/**
 * navigator.share API 지원 여부를 확인하는 함수
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isShareSupported = (): boolean => {
  // navigator 객체 및 share 기능 확인
  return typeof navigator !== "undefined" && "share" in navigator && typeof navigator.share === "function";
};

/**
 * Web Share API를 사용하여 데이터를 공유하는 비동기 함수
 * @param data 공유할 데이터 (ShareData 타입)
 * @param options 공유 결과 처리를 위한 콜백 옵션
 */
export const share = async (data: ShareData, options: Options = {}) => {
  const { onNotSupported, onFailure, onSuccess, onCancel } = options;

  try {
    if (!isShareSupported()) {
      // 미지원 시 onNotSupported 콜백 실행 (제공된 경우)
      if (typeof onNotSupported === "function") {
        onNotSupported();
        return; // 함수 종료
      }
      // onNotSupported 콜백이 없으면 에러 발생시켜 onFailure로 처리 유도
      throw new Error("공유 기능이 지원되지 않습니다.");
    }

    // 공유할 수 없는 데이터 형식인 경우 에러 발생
    const canShare = navigator.canShare(data);
    if (!canShare) {
      throw new Error("공유할 수 없는 데이터 형식입니다.");
    }

    // navigator.share API 호출 (비동기)
    await navigator.share(data);
    if (typeof onSuccess === "function") {
      onSuccess(); // 성공 콜백 실행
      return; // 함수 종료
    }
  } catch (e) {
    // 사용자가 공유를 취소한 경우 (AbortError)
    if (e instanceof DOMException && e.name === "AbortError") {
      if (typeof onCancel === "function") {
        onCancel(); // 취소 콜백 실행
      }
    } else {
      // 그 외 다른 에러 발생 시
      const msg = e instanceof Error ? e.message : "unknown error";
      // 개발 환경에서 콘솔에 경고 출력
      if (IS_DEVELOPMENT) {
        console.warn(`share API error:`, msg);
      }
      // 실패 콜백 실행
      if (typeof onFailure === "function") {
        onFailure(msg);
      }
    }
  }
};
