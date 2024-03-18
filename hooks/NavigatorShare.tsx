"use client";
import { isNavigator } from "@/utils";

export type NavigatorShareData = {
  title?: string; // 공유 제목
  text?: string; // 공유 설명
  url?: string; // 공유할 URL
  files?: File[]; // 공유할 파일 배열
};

export const isNavigatorShareSupported = (): boolean => {
  return isNavigator && typeof navigator.share === "function" && typeof navigator.canShare === "function";
};

class NavigatorShare {
  private notSupportedCallback: (() => void) | null = null;
  private successCallback: (() => void) | null = null;
  private failureCallback: (() => void) | null = null;
  private cancelCallback: (() => void) | null = null;

  /**
   * 공유 미지원
   * @param callback
   * @returns
   */
  notSupported(callback: () => void): NavigatorShare {
    this.notSupportedCallback = callback;
    return this;
  }

  /**
   * 공유 성공
   * @param callback
   * @returns
   */
  success(callback: () => void): NavigatorShare {
    this.successCallback = callback;
    return this;
  }

  /**
   * 공유 실패
   * @param callback
   * @returns
   */
  failure(callback: () => void): NavigatorShare {
    this.failureCallback = callback;
    return this;
  }

  /**
   * 취소 관련
   * @param callback
   * @returns
   */
  cancel(callback: () => void): NavigatorShare {
    this.cancelCallback = callback;
    return this;
  }

  share(data?: NavigatorShareData): void {
    //지원 여부
    if (!isNavigatorShareSupported()) {
      if (typeof this.notSupportedCallback === "function") {
        this.notSupportedCallback();
      }
      return;
    }
  }
}

export default NavigatorShare;
