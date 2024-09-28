import { isNavigator, isClient } from "./device";

/**
 * navigator.clipboard 지원 여부를 확인
 * @returns {Boolean} 결과값
 */
export const isNavigatorClipboardSupported = (): boolean => isNavigator() && typeof navigator.clipboard !== "undefined";

/**
 * queryCommandSupported에서 copy를 지원 여부를 확인
 * @returns {Boolean} 결과값
 */
export const isQueryCommandCopySupported = (): boolean => isClient() && typeof document?.queryCommandSupported("copy") === "boolean" && document?.queryCommandSupported("copy") === true;

/**
 *  navigator.clipboard 또는 queryCommandSupported에서 copy를 지원 여부 확인
 * @returns {Boolean} 결과값
 */
export const isCopyClipboardSupported = (): boolean => isNavigatorClipboardSupported() || isQueryCommandCopySupported();

type Options = {
  onSuccess?: () => void;
  // eslint-disable-next-line no-unused-vars
  onFailure?: (err?: string) => void;
  onNotSupported?: () => void;
};

export const copyToClipboard = async (text?: string, options: Options | undefined = {}) => {
  const { onSuccess, onFailure, onNotSupported } = options;
  try {
    if (typeof text !== "string" || text === "") {
      throw new Error("입력값이 존재하지 않습니다.");
    }
    // else if (isNavigatorClipboardSupported()) {
    //   await navigator.clipboard.writeText(text);
    //   onSuccess && onSuccess();
    // }
    else if (isCopyClipboardSupported()) {
      const copyClipboardID = "copyClipboardTextArea"; // 중복생성 방지용 id값 부여
      document.getElementById(copyClipboardID)?.remove(); // 중복생성 방지 제거

      const textArea = document.createElement("textarea");
      textArea.id = copyClipboardID;

      textArea.style.cssText = `
        display:flex;
        resize:none;
        border:none;
        padding:0;
        margin:0;
        outline:none;
        pointer-events:none;
        z-index:-1;
        width:1px;
        height:1px;
        font-size:4px;
        background-color:transparent;
        color:transparent;
        position:absolute;
        left:-9999px;
        overflow:hidden
      `;

      textArea.value = text;
      document.body.appendChild(textArea);

      // textArea.focus(); // 스크롤 이동으로 주석처리
      textArea.select();
      textArea.setSelectionRange(0, 4096); // 셀렉트 범위 설정(최대 복사 영역 설정용)

      const isCommandEnabled = document?.queryCommandEnabled("copy") ?? false;
      const isCommandCopy = document?.execCommand("Copy") ?? false;

      // window.getSelection()?.removeAllRanges(); //내용 제거  // 스크롤 이동으로 주석처리
      document.getElementById(copyClipboardID)?.remove(); // document.body.removeChild(textArea); // 속성 제거

      if (isCommandEnabled && isCommandCopy) {
        onSuccess && onSuccess();
      } else {
        throw new Error("command 복사 오류");
      }
    } else {
      if (onNotSupported) {
        onNotSupported();
      } else {
        throw new Error("복사를 지원하지 않습니다.");
      }
    }
  } catch (e) {
    onFailure && onFailure(e instanceof Error ? e.message : undefined);
  }
};
