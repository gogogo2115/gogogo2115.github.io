"use client";

import { isClient } from "@/utils/device";
import { useEffect, useState } from "react";

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
      const isSupportedOrientation = typeof window.DeviceOrientationEvent === "function";
      if (isSupportedOrientation) {
        const handleOrientation = (e: DeviceOrientationEvent) => {
          const { alpha = 0, beta = 0, gamma = 0 } = e;
          setOrientationData({ alpha, beta, gamma });
        };

        window.addEventListener("deviceorientation", handleOrientation);
        return () => window.removeEventListener("deviceorientation", handleOrientation);
      } else {
        setOrientationData(null);
        return () => {};
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>기기 방향 정보</h1>
      {orientationData !== null && (
        <>
          <p>Alpha: {orientationData?.alpha}</p>
          <p>Beta: {orientationData?.beta}</p>
          <p>Gamma: {orientationData?.gamma}</p>
        </>
      )}
    </div>
  );
}
