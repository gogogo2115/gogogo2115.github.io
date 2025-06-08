// 클립보드 복사 옵션 정의
type Options = {
  onNotSupported?: () => void; // 클립보드 복사 기능이 지원되지 않을 때 호출되는 콜백 함수
  onSuccess?: () => void; // 복사 성공 시 호출되는 콜백 함수
  onFailure?: (err?: unknown) => void; // 복사 실패 시 호출되는 콜백 함수
};

/**
 * navigator.clipboard API 지원 여부를 확인하는 함수
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isModernCopySupported = (): boolean => {
  return typeof navigator !== "undefined" && "clipboard" in navigator && typeof navigator.clipboard.writeText === "function" && window.isSecureContext;
};

/**
 * document.execCommand("copy") 지원 여부를 확인하는 함수
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isLegacyCopySupported = (): boolean => {
  return typeof document !== "undefined" && typeof document.queryCommandSupported === "function" && document.queryCommandSupported("copy");
};

/**
 * 클립보드 복사 기능 지원 여부를 확인하는 함수 (최신 또는 구형 방식)
 * @returns {boolean} 지원 여부 (true: 지원, false: 미지원)
 */
export const isCopyToClipboardSupported = (): boolean => {
  return isModernCopySupported() || isLegacyCopySupported();
};

/**
 * 클립보드에 텍스트를 복사하는 비동기 함수
 * @param {string} txt 복사할 텍스트
 * @param {Options} options 복사 옵션 (미지원, 성공, 실패 시 콜백 함수)
 * @returns {Promise<void>}
 */
export const copyToClipboard = async (txt: string = "", options: Options = {}): Promise<void> => {
  const { onNotSupported, onSuccess, onFailure } = options;

  // 텍스트 유효성 검사
  const length = typeof txt === "string" ? txt.length : 0;
  if (length <= 0) {
    if (onFailure) onFailure(new Error("TextError"));
    return;
  }

  // 기능 지원 여부 검사
  if (!isCopyToClipboardSupported()) {
    if (onNotSupported) onNotSupported();
    else if (onFailure) onFailure(new Error("NotSupportedError"));
    return;
  }

  // 복사 실행
  try {
    if (isModernCopySupported()) {
      await navigator.clipboard.writeText(txt);
      if (onSuccess) onSuccess();
    } else {
      // 기존 요소 제거
      const textAreaID = "copyToClipboard";
      const prevTextArea = document.getElementById(textAreaID);
      prevTextArea?.remove();

      // 신규 textarea 생성 및 설정
      const newTextArea = document.createElement("textarea");
      newTextArea.id = textAreaID;
      newTextArea.readOnly = true;
      newTextArea.value = txt;
      document.body.appendChild(newTextArea);

      // apple 복사영역 제거 // 기록 보관용으로 남김
      // const range = document.createRange();
      // range.selectNodeContents(newTextArea);
      // const selection = window.getSelection();
      // selection?.removeAllRanges();
      // selection?.addRange(range);
      // newTextArea.setSelectionRange(0, 999999);

      // 복사 영역 선택
      const selection = window.getSelection();
      selection?.removeAllRanges();
      newTextArea.select();
      newTextArea.setSelectionRange(0, length); // 특정 모바일 위한 추가

      // 복사 실행
      const isEnabled = document?.queryCommandEnabled("copy"); // 복사 가능한 상태 유무
      const isCopied = document?.execCommand("copy"); // 복사 실행 여부

      // 복사 태그 제거
      selection?.removeAllRanges();
      document.body.removeChild(newTextArea);

      // 복사 실패
      if (!isEnabled || !isCopied) throw new Error("ExecCommandError");

      // 복사 성공 시
      if (typeof onSuccess === "function") onSuccess();
    }
  } catch (e) {
    if (onFailure) onFailure(e);
  }
};
