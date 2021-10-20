import { useEffect, useCallback } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { throttle } from "lodash";

import { isBrowser } from "lib/useSSR";

import wrapper from "store";

import toBoolean from "lib/toBoolean";
import Maintence from "components/Maintenance";
import { setWindowStore } from "store/appWinodw";

function NextApp({ Component, pageProps }) {

    const isMaintenance = toBoolean(process.env.NEXT_PUBLIC_MAINTENANCE_MODE, true);

    const dispatch = useDispatch();
    const appWindow = useSelector(state => state.appWindow);
    
    const eventResize = useCallback((e) => {
        e.preventDefault();
        const { innerWidth, innerHeight } = isBrowser ? window :  { innerWidth: 0, innerHeight: 0 };
        dispatch(setWindowStore(innerWidth, innerHeight));
        return false;
    },[dispatch]);
    
    useEffect(() => {
        window.addEventListener("resize", throttle(eventResize, 500), false);
        return () => {
            window.removeEventListener("resize", throttle(eventResize, 500), false);
        }
    }, []);

    return (<>
    <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width" />
        <title>ssss</title>
    </Head>
    {(isMaintenance === true) 
    ? (<Maintence />) 
    : (<Component {...pageProps} />)} 
    </>);
}
export default wrapper.withRedux(NextApp);