export const isClient = (): boolean => Boolean(typeof window !== "undefined" && window.document && window.document.createElement);
export const isServer = (): boolean => !isClient();
export const isNavigator = (): boolean => Boolean(isClient() && typeof navigator !== "undefined");
export const isReactNative = () => Boolean(isNavigator() && /^(ReactNative|RN)$/i.test(navigator.product));