"use client";

import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";

// 기기의 가속도 및 회전율 데이터를 위한 타입 정의
type Vector3D = { x: null | number; y: null | number; z: null | number };
type RotationRate = { alpha: null | number; beta: null | number; gamma: null | number };

// DeviceMotionEvent에서 반환되는 데이터의 타입 정의
type Data = {
  acceleration: Vector3D; // 중력을 제외한 가속도 (m/s^2)
  accelerationIncludingGravity: Vector3D; // 중력을 포함한 가속도 (m/s^2)
  rotationRate: RotationRate; // 회전율 (degrees/second)
  interval: null | number; // 데이터 획득 간격 (ms)
};

// 훅의 옵션 타입 정의
type Options = { initialIsListening?: boolean; initialData?: Data; throttleTime?: number };

// 권한 상태 (DeviceOrientation과 동일)
type Permission = "idle" | "not_supported" | "not_required" | "granted" | "denied" | "error_denied";

export const isSupported = (): boolean => {
  // DeviceMotionEvent가 window 객체에 있는지 확인
  return typeof window !== "undefined" && "DeviceMotionEvent" in window && typeof window.DeviceMotionEvent === "function";
};

export const isPermissionGranted = (permission: unknown): permission is Permission => {
  return typeof permission === "string" && (permission === "granted" || permission === "not_required");
};

export const getRequestPermission = async (): Promise<Permission> => {
  if (!isSupported()) return "not_supported";
  if (!("requestPermission" in DeviceMotionEvent) || typeof DeviceMotionEvent.requestPermission !== "function") return "not_required";
  try {
    const permission = await DeviceMotionEvent.requestPermission(); // 타입 캐스팅
    return isPermissionGranted(permission) ? permission : "error_denied";
  } catch {
    return "error_denied";
  }
};

// data 기본 값
const DEFAULT_DATA: Readonly<Data> = {
  acceleration: { x: null, y: null, z: null },
  accelerationIncludingGravity: { x: null, y: null, z: null },
  rotationRate: { alpha: null, beta: null, gamma: null },
  interval: null,
};

export const useDeviceMotion = ({ initialIsListening = false, initialData = DEFAULT_DATA, throttleTime = 100 }: Options = {}) => {
  const [supported, setSupported] = useState<boolean>(isSupported());
  const [permission, setPermission] = useState<Permission>("idle");
  const [isListening, setIsListening] = useState(initialIsListening);
  const [data, setData] = useState<Data>(initialData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleThrottledEvent = useCallback(
    throttle(
      (ev: DeviceMotionEvent) => {
        const newData: Data = {
          acceleration: {
            x: ev.acceleration?.x ?? null,
            y: ev.acceleration?.y ?? null,
            z: ev.acceleration?.z ?? null,
          },
          accelerationIncludingGravity: {
            x: ev.accelerationIncludingGravity?.x ?? null,
            y: ev.accelerationIncludingGravity?.y ?? null,
            z: ev.accelerationIncludingGravity?.z ?? null,
          },
          rotationRate: {
            alpha: ev.rotationRate?.alpha ?? null,
            beta: ev.rotationRate?.beta ?? null,
            gamma: ev.rotationRate?.gamma ?? null,
          },
          interval: ev.interval ?? null,
        };
        setData((prev) => ({ ...prev, ...newData }));
      },
      throttleTime,
      { leading: true, trailing: true }
    ),
    [throttleTime] // throttleTime이 변경될 때만 이 함수를 다시 생성
  );

  const requestPermission = useCallback(async () => {
    try {
      const result = await getRequestPermission();
      setPermission(result);
      return result;
    } catch {
      setPermission("error_denied");
      return "error_denied";
    }
  }, []);

  const start = useCallback(async () => {
    if (!supported) return;

    let currentPermission = permission;
    if (!isPermissionGranted(currentPermission)) {
      currentPermission = await requestPermission();
    }

    if (isPermissionGranted(currentPermission)) {
      setIsListening(true);
    }
  }, [permission, requestPermission, supported]);

  const stop = useCallback(() => {
    handleThrottledEvent.cancel();
    setIsListening(false);
  }, [handleThrottledEvent]);

  useEffect(() => {
    const init = async () => {
      const checkSupported = isSupported();
      const checkPermission = await getRequestPermission();

      setSupported(checkSupported);
      setPermission(checkPermission);

      if (initialIsListening && checkSupported && isPermissionGranted(checkPermission)) {
        setIsListening(true);
      }
    };
    init();
  }, [initialIsListening]);

  useEffect(() => {
    if (!supported || !isListening || !isPermissionGranted(permission)) {
      window.removeEventListener("devicemotion", handleThrottledEvent);
    } else {
      window.addEventListener("devicemotion", handleThrottledEvent);
    }

    return () => {
      handleThrottledEvent.cancel();
      window.removeEventListener("devicemotion", handleThrottledEvent);
    };
  }, [handleThrottledEvent, isListening, permission, supported]);

  return { supported, permission, isListening, data, requestPermission, start, stop };
};
