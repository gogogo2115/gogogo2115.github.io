import { isNavigator } from "@/utils";

/**
 * navigator.clipboard 지원 여부를 확인
 * @returns {Boolean} 결과값
 */
export const isNavigatorClipboardSupported = (): boolean => isNavigator && typeof navigator.clipboard !== "undefined";

/**
 * queryCommandSupported에서 copy를 지원 여부를 확인
 * @returns {Boolean} 결과값
 */
export const isQueryCommandCopySupported = (): boolean => document?.queryCommandSupported("copy") === true;

/**
 * navigator.clipboard 또는 queryCommandSupported에서 copy를 지원 여부 확인
 * isNavigatorClipboardSupported() || isQueryCommandCopySupported()
 * @returns {Boolean} 결과값
 */
export const isCopyClipboardSupported = (): boolean => isNavigatorClipboardSupported() || isQueryCommandCopySupported();

class CopyClipboard {
  private notSupportedCallback: (() => void) | null = null;
  private successCallback: (() => void) | null = null;
  private failureCallback: (() => void) | null = null;

  /**
   * 복사가 미지원인 경우
   * @param callback
   * @returns
   */
  notSupported(callback: (() => void) | null = null): CopyClipboard {
    this.notSupportedCallback = callback;
    return this;
  }

  /**
   * 복사가 살패 할 경우
   * @param callback
   * @returns
   */
  failure(callback: (() => void) | null = null): CopyClipboard {
    this.failureCallback = callback;
    return this;
  }

  /**
   * 복사가 성공할 경우
   * @param callback
   * @returns
   */
  success(callback: (() => void) | null = null): CopyClipboard {
    this.successCallback = callback;
    return this;
  }

  /**
   *
   * @param {string} str 복사할 입력값
   * @returns
   */
  copy(str: string): void {
    // 지원하지 않음
    if (!isCopyClipboardSupported()) {
      if (typeof this.notSupportedCallback === "function") {
        this.notSupportedCallback();
      }
      return;
    }

    // 입력값 오류
    if (typeof str !== "string") {
      if (typeof this.failureCallback === "function") {
        this.failureCallback();
      }
      return;
    }

    // navigator.clipboard가 지원
    if (isNavigatorClipboardSupported()) {
      navigator.clipboard
        .writeText(str)
        .then(() => {
          if (typeof this.successCallback === "function") {
            this.successCallback();
          }
        })
        .catch(() => {
          if (typeof this.failureCallback === "function") {
            this.failureCallback();
          }
        });
      return;
    }

    //document?.execCommand("Copy")가 지원
    if (isQueryCommandCopySupported()) {
      const copyClipboardID = "copyClipboardTextArea";
      document.getElementById(copyClipboardID)?.remove();

      const textarea = document.createElement("textarea");
      textarea.id = copyClipboardID;
      textarea.style.display = "none !important";

      textarea.style.cssText = `pointer-events:none;outline:none;resize:none;padding:0;margin:0;font-size:4px;position:absolute;left:-9999px;overflow:hidden;width:1px;height:1px;outline:none;background-color:transparent;color:transparent;border:0;z-index:-1`;
      textarea.value = str;
      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, 4096); // 셀렉트 범위 설정

      const isCommandEnabled = document?.queryCommandEnabled("copy") ?? false;
      const isCommandCopy = document?.execCommand("Copy") ?? false;

      const callback = isCommandEnabled && isCommandCopy ? this.successCallback : this.failureCallback;
      if (typeof callback === "function") {
        callback();
      }

      window.getSelection()?.removeAllRanges(); //내용 제거
      document.body.removeChild(textarea);
      return;
    }

    return;
  }
}

export default CopyClipboard;
