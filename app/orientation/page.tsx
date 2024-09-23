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
      const deviceorientation = (e: DeviceOrientationEvent) => {
        const { alpha = 0, beta = 0, gamma = 0 } = e;
        setOrientationData({ alpha, beta, gamma });
      };
      window.addEventListener("deviceorientation", deviceorientation);
      return () => window.removeEventListener("deviceorientation", deviceorientation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>11</>;
}
