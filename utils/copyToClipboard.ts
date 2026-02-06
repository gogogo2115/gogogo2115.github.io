type CopySuccessType = "clipboard" | "execCommand";
type CopyToClipboardStatus = "success" | "invalid-text" | "unsupported" | "failed";
type CopyToClipboardResult =
  | { success: true; status: "success"; type: CopySuccessType } // 성공
  | { success: false; status: Exclude<CopyToClipboardStatus, "success"> }; // 실패

export const isNavigatorClipboardSupported = (): boolean => {
  return typeof navigator !== "undefined" && "clipboard" in navigator && !!navigator.clipboard && typeof navigator.clipboard.writeText === "function";
};

export const isQueryCommandSupported = (): boolean => {
  return typeof document !== "undefined" && typeof document.queryCommandSupported === "function" && document.queryCommandSupported("copy");
};

export const isCopyToClipboardSupported = (): boolean => {
  return isNavigatorClipboardSupported() || isQueryCommandSupported();
};

const clipboardID = "copyToClipboard";
const cssText = `position: fixed;top: 0;left: 0;width: 1px;height: 1px;padding: 0;margin: 0;border: 0;opacity: 0;pointer-events: none;z-index: -1;`;

export const copyToClipboard = async (text?: string): Promise<CopyToClipboardResult> => {
  if (typeof text !== "string" || text.length === 0) {
    return { success: false, status: "invalid-text" };
  }

  if (isNavigatorClipboardSupported()) {
    try {
      await navigator.clipboard.writeText(text);
      return { success: true, status: "success", type: "clipboard" };
    } catch {
      // 실패하면 폴백 진행
    }
  }

  if (isQueryCommandSupported()) {
    document.getElementById(clipboardID)?.remove();

    const textarea = document.createElement("textarea");
    textarea.style.cssText = cssText;
    textarea.id = clipboardID;
    textarea.value = text;

    textarea.setAttribute("tabindex", "-1");
    textarea.setAttribute("readonly", "");
    textarea.setAttribute("aria-hidden", "true");

    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    let success = false;

    try {
      const enabled = typeof document.queryCommandEnabled === "function" ? document.queryCommandEnabled("copy") : true;
      success = enabled && document.execCommand("copy");
    } catch {
      success = false;
    } finally {
      textarea.remove();
    }

    return success ? { success: true, status: "success", type: "execCommand" } : { success: false, status: "failed" };
  }

  return { success: false, status: "unsupported" };
};
