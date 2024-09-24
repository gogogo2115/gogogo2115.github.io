"use client";

import { useState } from "react";
import { throttle } from "lodash";

import { isClient } from "@/utils/device";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

type OrientationData = {
  alpha: number; // 0도부터 360도까지 범위의 z축을 중심으로 디바이스의 움직임
  beta: number; // -180도부터 180도(모바일 사파리: -90도~90도)까지 범위의 x축을 중심으로 디바이스의 움직임 (앞/뒤)
  gamma: number; // -90도부터 90도(모바일 사파리: -180도~180도)까지 범위의 y축을 중심으로 디바이스의 움직임 (오른쪽/왼쪽)
};

// portrait landscape

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

  return (
    <div>
      <h1>기기 방향 정보</h1>
      {orientationData !== null ? (
        <>
          <div>
            <p>Alpha: {orientationData.alpha}</p>
            <div></div>
          </div>
          <div>
            <p>Beta: {orientationData.beta}</p>
            <div></div>
          </div>
          <div>
            <p>Gamma: {orientationData.gamma}</p>
            <div></div>
          </div>
        </>
      ) : (
        <>deviceorientation를 지원하지 않습니다.</>
      )}
    </div>
  );
}
