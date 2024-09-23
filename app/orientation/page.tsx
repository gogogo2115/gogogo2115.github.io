"use client";
import { useEffect, useState } from "react";
import { throttle } from "lodash";

import { isClient } from "@/utils/device";

type OrientationData = {
  alpha: number | null;
  beta: number | null;
  gamma: number | null;
};

export default function OrientationPage() {
  const client = isClient();
  const [orientationData, setOrientationData] = useState<OrientationData | null>(null);

  useEffect(() => {
    if (client) {
      const isSupportedOrientation = typeof window.DeviceOrientationEvent === "function" || "DeviceOrientationEvent" in window;
      if (!isSupportedOrientation) {
        setOrientationData(null);
        return () => {};
      }

      const handleOrientation = throttle((e: DeviceOrientationEvent) => {
        let { alpha = 0, beta = 0, gamma = 0 } = e;

        // console.log({ alpha, beta, gamma });

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
