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
  const [orientationData, setOrientationData] = useState<OrientationData | null>({
    alpha: 0,
    beta: 0,
    gamma: 0,
  });

  useEffect(() => {
    if (client) {
      const aa = typeof window.DeviceMotionEvent;
      const bb = typeof window.DeviceOrientationEvent;
      console.log(aa, bb);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>기기 방향 정보</h1>
      <p>Alpha: {orientationData?.alpha}</p>
      <p>Beta: {orientationData?.beta}</p>
      <p>Gamma: {orientationData?.gamma}</p>
    </div>
  );
}
