import { isBrowser, isServer } from "libs/useSSR";

const WINDOW_SIZE = 'appWindow/WINDOW_SIZE';

const { innerWidth, innerHeight } = isBrowser() ? window : { innerWidth:0, innerHeight:0 }

function deviceType(windowWidth){
    if( windowWidth >= 280 && windowWidth <= 479 ){ //모바일, 저해상도 모바일
        return 'mobile';
    } else if( windowWidth >= 480 && windowWidth <= 767 ) { //모바일, 저해상도 태블릿 
        return 'moblie';
    } else if( windowWidth >= 768 && windowWidth <= 1023 ) { //태블릿 
        return 'tablet';
    } else if( windowWidth >= 1024 ){ //pc
        return 'pc'; //pc
    } else {
        return isServer() ? 'server' : "unknown";
    }
}

const initialState = {
    width : innerWidth,
    height : innerHeight,
    deviceType : deviceType(innerWidth)
}

export const storeSetWindow = (width = innerWidth, height = innerHeight) => ({
    type : WINDOW_SIZE, setWidth : width, setHeight : height
});

export default function appWindow(state=initialState, action){
    switch (action.type) {
        case WINDOW_SIZE:
            return { ...state, width : action.setWidth, height: action.setHeight, deviceType : deviceType(action.setWidth) }
        default:
            return state;
    }
}