export const isBrowser = !!( typeof window !== 'undefined' && window.document && window.document.createElement );
export const isServer = !isBrowser;
export const isNavigator = !!(typeof navigator != 'undefined');
export const isNative = !!(isNavigator && navigator.product == 'ReactNative');

const useSSR = () =>{
    return {
        isBrowser: isBrowser,
        isServer: isServer,
        isNavigator : isNavigator,
        isNative: isNative
    };
}
export default useSSR;