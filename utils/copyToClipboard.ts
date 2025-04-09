import { IS_DEVELOPMENT } from "@/utils/configNode";

// 클립보드 복사 옵션 정의
type Options = {
  onNotSupported?: () => void; // 클립보드 복사 기능이 지원되지 않을 때 호출되는 콜백 함수
  onSuccess?: () => void; // 복사 성공 시 호출되는 콜백 함수
  onFailure?: (message?: string) => void; // 복사 실패 시 호출되는 콜백 함수
};

/**
 * navigator.clipboard API 지원 여부를 확인하는 함수
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isClipboardAPISupported = (): boolean => {
  return typeof navigator !== "undefined" && "clipboard" in navigator && typeof navigator.clipboard.writeText === "function" && window.isSecureContext;
};

/**
 * document.execCommand("copy") 지원 여부를 확인하는 함수
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isQueryCommandCopySupported = (): boolean => {
  return typeof document !== "undefined" && typeof document.queryCommandSupported === "function" && document.queryCommandSupported("copy");
};

/**
 * 클립보드 복사 기능 지원 여부를 확인하는 함수 (최신 또는 구형 방식)
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isCopyToClipboardSupported = (): boolean => {
  return isClipboardAPISupported() || isQueryCommandCopySupported();
};

/**
 * 클립보드에 텍스트를 복사하는 비동기 함수
 * @param {string} text 복사할 텍스트
 * @param {Options} options 복사 옵션 (성공, 실패, 미지원 시 콜백 함수)
 * @returns {Promise<void>}
 */
export const copyToClipboard = async (text: string, options: Options = {}): Promise<void> => {
  const { onNotSupported, onFailure, onSuccess } = options;
  try {
    // 복사할 텍스트 유효성 검사
    const length = typeof text === "string" ? text.length : 0;
    if (length <= 0) throw new Error("복사할 문자열의 형식이 잘못되었습니다.");

    // 최신 클립보드 API 지원 시
    if (isClipboardAPISupported()) {
      await navigator.clipboard.writeText(text);
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      return;
    }

    // 구형 방식 지원 시
    if (isQueryCommandCopySupported()) {
      const textAreaID = "copyToClipboard";
      const prevTextArea = document.getElementById(textAreaID);
      prevTextArea?.remove(); // 기존 요소 제거

      // 신규 textarea 생성 및 설정
      const newTextArea = document.createElement("textarea");
      newTextArea.id = textAreaID;
      newTextArea.readOnly = true;
      newTextArea.value = text;
      document.body.appendChild(newTextArea);

      // 복사 영역 선택
      newTextArea.select();
      newTextArea.setSelectionRange(0, text.length); // 특정 모바일 위한 추가

      // 복사 명령어 실행 및 결과 확인
      const queryCommandEnabledCopy = document?.queryCommandEnabled("copy") ?? false;
      const execCommandCopy = document?.execCommand("copy") ?? false;

      // 개발 환경에서 복사 결과 로깅
      if (IS_DEVELOPMENT) {
        console.warn(`copyToClipboard: execCommand 실행 결과`, { queryCommandEnabledCopy, execCommandCopy });
      }

      // 복사 태그 제거
      const selection = window.getSelection();
      selection?.removeAllRanges();
      document.body.removeChild(newTextArea);

      // 복사 실패 시 오류 발생
      if (!execCommandCopy) throw new Error("execCommandCopy 복사 오류 발생");

      // 복사 성공 시
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      return;
    }

    // 클립보드 복사 기능 미지원 시
    if (typeof onNotSupported === "function") {
      onNotSupported();
    } else {
      throw new Error("클립보드 복사를 지원하지 않는 브라우저입니다.");
    }
  } catch (e) {
    // 오류 처리
    const msg = e instanceof Error ? e.message : "unknown error";
    if (IS_DEVELOPMENT) {
      console.warn(`copyToClipboard:`, msg);
    }
    if (typeof onFailure === "function") onFailure(msg);
    return;
  }
};
