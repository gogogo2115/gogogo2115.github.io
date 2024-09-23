"use client";

import { useState } from "react";
import { throttle } from "lodash";

import { isClient } from "@/utils/device";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

type OrientationData = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
};

export default function OrientationPage() {
  const client = isClient();
  const [orientationData, setOrientationData] = useState<OrientationData | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (client) {
      const isSupportedOrientation = typeof window.DeviceOrientationEvent === "function" || "DeviceOrientationEvent" in window;

      // DeviceOrientationEvent 지원하지 않음
      if (!isSupportedOrientation) {
        setOrientationData(null);
        return () => {};
      }

      const handleOrientation = throttle((e: DeviceOrientationEvent) => {
        let { alpha = 0, beta = 0, gamma = 0 } = e;

        // console.log({ alpha, beta, gamma, absolute });

        alpha = Number((alpha ?? 0).toFixed(4));
        beta = Number((beta ?? 0).toFixed(4));
        gamma = Number((gamma ?? 0).toFixed(4));

        setOrientationData({ alpha, beta, gamma });
      }, 100);

      window.addEventListener("deviceorientation", handleOrientation);
      return () => window.removeEventListener("deviceorientation", handleOrientation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (client) {
      const isSupportedMotion = typeof window.DeviceMotionEvent === "function" || "DeviceMotionEvent" in window;
      if (!isSupportedMotion) return () => {};

      const handleMotion = (e: DeviceMotionEvent) => {
        console.log("handleMotion", e);
      };

      window.addEventListener("devicemotion", handleMotion);
      return () => window.removeEventListener("devicemotion", handleMotion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>기기 방향 정보</h1>
      {orientationData !== null ? (
        <>
          <p>Alpha: {orientationData?.alpha}</p>
          <p>Beta: {orientationData?.beta}</p>
          <p>Gamma: {orientationData?.gamma}</p>
        </>
      ) : (
        <>deviceorientation를 지원하지 않습니다.</>
      )}
    </div>
  );
}
