export const isServerCached: boolean = typeof window === "undefined";
export const isClientCached: boolean = !isServerCached;
export const hasNavigatorCached: boolean = isClientCached && typeof navigator !== "undefined";

export const isServer = (): boolean => typeof window === "undefined";
export const isClient = (): boolean => !isServer();
export const hasNavigator = (): boolean => isClient() && typeof navigator !== "undefined";
