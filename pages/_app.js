import { useEffect, useCallback, useState } from "react";
import throttle from "lodash/throttle";

import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";

import wrapper from "store";
import toBoolean from "libs/toBoolean";

import Maintenance from "components/Maintenance";
import Loading from "components/Loading";
import AppHead from "components/AppHead";
import { isNavigator as getIsNavigator } from "libs/useSSR";
import { storeSetIsLoading, storeSetIsOnline } from "store/appState";
import DevModeView from "components/DevModeView";

import "public/reset.css";
import Modal from "components/Modal";

function NextAPP({ Component, pageProps }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const appStateLoading = useSelector((state) => state.appState.loading);
  const appWindowDeviceType = useSelector(
    (state) => state.appWindow.deviceType
  );

  const isMaintenanceMode = toBoolean(process.env.NEXT_PUBLIC_MAINTENANCE_MODE);

  //<!-- window addEventListener
  const handleResizeEvent = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);

  const handleScrollEvent = useCallback((e) => {
    e.preventDefault();
    return false;
  }, []);
  // window addEventListener -->

  //<!-- router events
  const handleRouteStart = useCallback(() => {
    //console.log('handleRouteStart');
    dispatch(storeSetIsLoading(true));
    return false;
  }, [dispatch]);

  const handleRouteComplete = useCallback(() => {
    //console.log('handleRouteComplete');
    const isOnline = getIsNavigator() ? navigator.onLine : true;
    dispatch(storeSetIsLoading(false));
    dispatch(storeSetIsOnline(isOnline));
    return false;
  }, [dispatch]);
  // router events -->

  useEffect(() => {
    window.addEventListener("resize", throttle(handleResizeEvent, 450));
    window.addEventListener("scroll", throttle(handleScrollEvent, 450));
    return () => {
      window.removeEventListener("resize", throttle(handleResizeEvent, 450));
      window.removeEventListener("scroll", throttle(handleScrollEvent, 450));
    };
  }, []);

  useEffect(() => {
    router.events.on("routeChangeStart", handleRouteStart);
    router.events.on("routeChangeComplete", handleRouteComplete);
    router.events.on("routeChangeError", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteStart);
      router.events.off("routeChangeComplete", handleRouteComplete);
      router.events.off("routeChangeError", handleRouteComplete);
    };
  }, [router.events]);

  return (
    <>
      <DevModeView />

      <AppHead />

      <noscript id="noScript">
        모든 기능을 활용하기 위해서는 자바스크립트(JavaScript) 활성화가
        필요합니다.
      </noscript>

      {isMaintenanceMode === true ? (
        <Maintenance />
      ) : (
        <Component {...pageProps} />
      )}

      <Modal />

      {appStateLoading === true ? <Loading /> : null}
    </>
  );
}
export default wrapper.withRedux(NextAPP);
