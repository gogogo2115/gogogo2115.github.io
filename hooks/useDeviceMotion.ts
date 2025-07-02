"use client";

import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";

// 기기의 가속도 및 회전율 데이터를 위한 타입 정의
type Acceleration = {
  x: number | null | undefined;
  y: number | null | undefined;
  z: number | null | undefined;
};

type RotationRate = {
  alpha: number | null | undefined;
  beta: number | null | undefined;
  gamma: number | null | undefined;
};

// DeviceMotionEvent에서 반환되는 데이터의 타입 정의
type Data = {
  acceleration: Acceleration; // 중력을 제외한 가속도 (m/s^2)
  accelerationIncludingGravity: Acceleration; // 중력을 포함한 가속도 (m/s^2)
  rotationRate: RotationRate; // 회전율 (degrees/second)
  interval: number | null | undefined; // 데이터 획득 간격 (ms)
};

// 훅의 옵션 타입 정의
type Options = {
  initialIsListening?: boolean;
  throttleTime?: number;
};

// 권한 상태 (DeviceOrientation과 동일)
type Permission = "idle" | "not_supported" | "not_required" | "granted" | "denied" | "error_denied";

export const getIsSupported = (): boolean => {
  return typeof window !== "undefined" && "DeviceMotionEvent" in window && typeof window.DeviceMotionEvent === "function";
};

export const getIsPermissionGranted = (permission: unknown): permission is Permission => {
  return typeof permission === "string" && (permission === "granted" || permission === "not_required");
};

export const getRequestPermission = async (): Promise<Permission> => {
  if (!getIsSupported()) return "not_supported";
  if (!("requestPermission" in DeviceMotionEvent) || typeof DeviceMotionEvent.requestPermission !== "function") {
    return "not_required";
  }
  try {
    const permission = await DeviceMotionEvent.requestPermission();
    return ["granted", "denied"].includes(permission) ? permission : "error_denied";
  } catch {
    return "denied";
  }
};

const DEFAULT_THROTTLE = 100;
const DEFAULT_IS_LISTENING = false;

export const useDeviceMotion = ({ initialIsListening = DEFAULT_IS_LISTENING, throttleTime = DEFAULT_THROTTLE }: Options = {}) => {
  const [supported, setSupported] = useState<boolean>(getIsSupported());
  const [permission, setPermission] = useState<Permission>("idle");
  const [isListening, setIsListening] = useState(initialIsListening);
  const [data, setData] = useState<Data>({
    acceleration: { x: null, y: null, z: null },
    accelerationIncludingGravity: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null },
    interval: null,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleThrottledEvent = useCallback(
    throttle(
      (ev: DeviceMotionEvent) => {
        setData({
          acceleration: {
            x: typeof ev.acceleration?.x === "number" ? ev.acceleration.x : null,
            y: typeof ev.acceleration?.y === "number" ? ev.acceleration.y : null,
            z: typeof ev.acceleration?.z === "number" ? ev.acceleration.z : null,
          },
          accelerationIncludingGravity: {
            x: typeof ev.accelerationIncludingGravity?.x === "number" ? ev.accelerationIncludingGravity.x : null,
            y: typeof ev.accelerationIncludingGravity?.y === "number" ? ev.accelerationIncludingGravity.y : null,
            z: typeof ev.accelerationIncludingGravity?.z === "number" ? ev.accelerationIncludingGravity.z : null,
          },
          rotationRate: {
            alpha: typeof ev.rotationRate?.alpha === "number" ? ev.rotationRate.alpha : null,
            beta: typeof ev.rotationRate?.beta === "number" ? ev.rotationRate.beta : null,
            gamma: typeof ev.rotationRate?.gamma === "number" ? ev.rotationRate.gamma : null,
          },
          interval: typeof ev.interval === "number" ? ev.interval : null,
        });
      },
      throttleTime,
      { leading: true, trailing: true }
    ),
    [throttleTime]
  );

  const requestPermission = useCallback(async () => {
    const result = await getRequestPermission();
    setPermission(result);
    return result;
  }, []);

  const start = useCallback(async () => {
    if (!supported) return;

    let currPermission = permission;
    if (!getIsPermissionGranted(currPermission)) {
      currPermission = await requestPermission();
    }

    if (getIsPermissionGranted(currPermission)) {
      setIsListening(true);
    }
  }, [permission, requestPermission, supported]);

  const stop = useCallback(() => {
    setIsListening(false);
    handleThrottledEvent.cancel();
  }, [handleThrottledEvent]);

  useEffect(() => {
    const init = async () => {
      try {
        const checkSupported = getIsSupported();
        setSupported(checkSupported);

        const checkPermission = await getRequestPermission();
        setPermission(checkPermission);

        if (initialIsListening && checkSupported && getIsPermissionGranted(checkPermission)) {
          setIsListening(true);
        }
      } catch (error) {
        console.error("Failed to initialize device motion:", error);
      }
    };

    init();
  }, [initialIsListening]);

  useEffect(() => {
    if (supported && isListening && getIsPermissionGranted(permission)) {
      window.addEventListener("devicemotion", handleThrottledEvent);
    } else {
      window.removeEventListener("devicemotion", handleThrottledEvent);
    }

    return () => {
      window.removeEventListener("devicemotion", handleThrottledEvent);
      handleThrottledEvent.cancel();
    };
  }, [handleThrottledEvent, isListening, permission, supported]);

  return { supported, permission, isListening, data, requestPermission, start, stop };
};
