export const isClient = (): boolean => Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
export const isServer = (): boolean => !isClient();
export const isNavigator = () => Boolean(typeof navigator !== "undefined");
export const isReactNative = () => Boolean(isNavigator() && /^(ReactNative|RN)$/i.test(navigator.product));

const regexAndroid = /Android/i;
const regexIOS = /iPad|iPhone|iPod/i;
const regexLinux = /Linux|X11|Fedora|Ubuntu/i;
const regexWindows = /Windows|Windows NT/i;
const regexMacOS = /Macintosh|MacIntel|MacPPC|Mac68K|macOS|Mac OS/i;

const hasIsNavigator = !isServer() && isNavigator();

export const isAndroidOS = (userAgent?: string): boolean => {
  if (typeof userAgent === "string" && userAgent.trim()) return regexAndroid.test(userAgent.trim());
  return hasIsNavigator && regexAndroid.test(navigator.userAgent);
};

export const isIOS = (userAgent?: string): boolean => {
  if (typeof userAgent === "string" && userAgent.trim()) return regexIOS.test(userAgent.trim());
  return hasIsNavigator && regexIOS.test(navigator.userAgent);
};

export const isLinuxOS = (userAgent?: string): boolean => {
  if (typeof userAgent === "string" && userAgent.trim()) return regexLinux.test(userAgent.trim());
  return hasIsNavigator && (regexLinux.test(navigator.platform || "") || regexLinux.test(navigator.userAgent));
};

export const isWindowOS = (userAgent?: string): boolean => {
  if (typeof userAgent === "string" && userAgent.trim()) return regexWindows.test(userAgent.trim());
  return hasIsNavigator && regexWindows.test(navigator.userAgent);
};

export const isMacOS = (userAgent?: string): boolean => {
  if (typeof userAgent === "string" && userAgent.trim()) return regexMacOS.test(userAgent.trim());
  return hasIsNavigator && (regexMacOS.test(navigator.platform || "") || regexMacOS.test(navigator.userAgent));
};

type GetDevice = "server" | "ios" | "android" | "window" | "linux" | "macOS" | "unknown";
export const getDevice = (userAgent?: string): GetDevice => {
  if (isServer()) return "server";
  if (isAndroidOS(userAgent)) return "android";
  if (isIOS(userAgent)) return "ios";
  if (isMacOS(userAgent)) return "macOS";
  if (isLinuxOS(userAgent)) return "linux";
  if (isWindowOS(userAgent)) return "window";
  return "unknown";
};
