export const isClient = (): boolean => Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
export const isServer = (): boolean => !isClient();
export const isNavigator = (): boolean => Boolean(isClient() && typeof navigator !== "undefined");
export const isReactNative = () => Boolean(isNavigator() && /^(ReactNative|RN)$/i.test(navigator.product));

export const isIOS = (): boolean => (!isNavigator() ? false : /ipad|iphone/i.test(navigator.userAgent));
export const isAndroid = (): boolean => (!isNavigator() ? false : /Android/i.test(navigator.userAgent));
export const isWindowOS = (): boolean => (!isNavigator() ? false : /Windows/i.test(navigator.userAgent));
export const isRobot = (): boolean => (!isNavigator() ? false : /bot|crawl|slurp|robot|spiders|python/i.test(navigator.userAgent));

export const isMacOS = () => {
  if (!isNavigator()) return false;
  const regexMacOS = RegExp(/Macintosh|MacIntel|MacPPC|Mac68K|macOS|Mac OS/i);
  return regexMacOS.test(navigator.platform) || regexMacOS.test(navigator.userAgent);
};

export const isLinuxOS = (): boolean => (!isNavigator() || isAndroid() ? false : /Linux|X11/i.test(navigator.platform) || /Linux|X11/i.test(navigator.userAgent));
