import { errorInfo } from "@/utils/errorInfo";

export type NavigatorShareStatus = "unsupported" | "invalid-share-data" | "unsupported-share-data" | "aborted" | "failed" | "success";
export type NavigatorShareResult =
  | { success: true; status: "success" } // 성공
  | { success: false; status: Exclude<NavigatorShareStatus, "success">; error?: unknown }; // 실패

export const isNavigatorShareSupported = (): boolean => {
  return typeof navigator !== "undefined" && "share" in navigator && typeof navigator.share === "function";
};

export const isNavigatorCanShareSupported = (): boolean => {
  return typeof navigator !== "undefined" && "canShare" in navigator && typeof navigator.canShare === "function";
};

const isFile = (v: unknown): v is File => {
  if (typeof File !== "undefined" && v instanceof File) return true;
  return typeof v === "object" && v !== null && Object.prototype.toString.call(v) === "[object File]";
};

const validateShareData = (data?: ShareData) => {
  if (!data || typeof data !== "object") return { hasTextual: false, hasFiles: false };

  const title = typeof data.title === "string" ? data.title.trim() : "";
  const url = typeof data.url === "string" ? data.url.trim() : "";
  const text = typeof data.text === "string" ? data.text.trim() : "";

  const hasTextual = Boolean(title || url || text);
  const hasFiles = Array.isArray(data.files) && data.files.length > 0 && data.files.every(isFile);

  return { hasTextual, hasFiles };
};

export const navigatorShare = async (data?: ShareData): Promise<NavigatorShareResult> => {
  if (!isNavigatorShareSupported()) {
    return { success: false, status: "unsupported" };
  }

  const { hasTextual, hasFiles } = validateShareData(data);
  if (!hasTextual && !hasFiles) {
    return { success: false, status: "invalid-share-data" };
  }

  if (hasFiles && isNavigatorCanShareSupported()) {
    try {
      if (!navigator.canShare(data)) {
        return { success: false, status: "unsupported-share-data" };
      }
    } catch (e) {
      // canShare 구현 편차/버그/예외를 안전하게 처리
      return { success: false, status: "unsupported-share-data", error: e };
    }
  }

  try {
    await navigator.share(data);
    return { success: true, status: "success" };
  } catch (e) {
    const { name, code } = errorInfo(e);

    // 사용자가 공유 UI를 닫거나 취소한 경우가 일반적으로 AbortError
    if (name === "AbortError" || code === 20) {
      return { success: false, status: "aborted", error: e };
    }

    return { success: false, status: "failed", error: e };
  }
};
