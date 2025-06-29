"use client";

import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";

// 기기 방향 센서에서 반환되는 데이터의 타입 정의
// alpha: Z축 회전 각도 (0-360), 자북 기준 또는 디바이스 기준.
// beta: X축 회전 각도 (-180-180).
// gamma: Y축 회전 각도 (-90-90).
// absolute: 데이터가 지자기 북쪽을 기준으로 하는지 여부.
type Data = { alpha: null | number; beta: null | number; gamma: null | number; absolute: null | boolean };

// 훅의 옵션 타입 정의
// initialAction: 훅 초기화 시 즉시 데이터 수집을 시작할지 여부
// initialData: 초기 센서 데이터 (선택 사항)
// throttleTime: 스로틀링 시간 (밀리초), 기본값 100ms
type Options = { initialIsListening?: boolean; initialData?: Data; throttleTime?: number };

// 권한 상태
// idle: 시작전
// not_supported: DeviceOrientationEvent 지원하지 않음
// not_required: 권한 실행이 필요 없는 환경입니다.(권한 허용으로 처리)
// granted: 권한 허용됨
// denied: 권한 거부됨
// error_denied: 오류 발생
type Permission = "idle" | "not_supported" | "not_required" | "granted" | "denied" | "error_denied";

export const isSupported = (): boolean => {
  return typeof window !== "undefined" && "DeviceOrientationEvent" in window && typeof window.DeviceOrientationEvent === "function";
};

export const isPermissionGranted = (permission: unknown): permission is Permission => {
  return typeof permission === "string" && (permission === "granted" || permission === "not_required");
};

export const getRequestPermission = async (): Promise<Permission> => {
  if (!isSupported()) return "not_supported";
  if (!("requestPermission" in DeviceOrientationEvent) || typeof DeviceOrientationEvent.requestPermission !== "function") return "not_required";
  try {
    const permission = await DeviceOrientationEvent.requestPermission();
    return isPermissionGranted(permission) ? permission : "error_denied";
  } catch {
    return "error_denied";
  }
};

// data 기본 값
const DEFAULT_DATA: Readonly<Data> = { alpha: null, beta: null, gamma: null, absolute: null };

export const useDeviceOrientation = ({ initialIsListening = false, initialData = DEFAULT_DATA, throttleTime = 100 }: Options = {}) => {
  const [supported, setSupported] = useState<boolean>(isSupported());
  const [permission, setPermission] = useState<Permission>("idle");
  const [isListening, setIsListening] = useState(initialIsListening);
  const [data, setData] = useState<Data>(initialData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleThrottledEvent = useCallback(
    throttle(
      (ev: DeviceOrientationEvent) => {
        const newData: Data = { alpha: ev.alpha, beta: ev.beta, gamma: ev.gamma, absolute: ev.absolute };
        setData((prev) => ({ ...prev, ...newData }));
      },
      throttleTime,
      { leading: true, trailing: true }
    ),
    [throttleTime]
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
      window.removeEventListener("deviceorientation", handleThrottledEvent);
    } else {
      window.addEventListener("deviceorientation", handleThrottledEvent);
    }

    return () => {
      handleThrottledEvent.cancel();
      window.removeEventListener("deviceorientation", handleThrottledEvent);
    };
  }, [handleThrottledEvent, isListening, permission, supported]);

  return { supported, permission, isListening, data, requestPermission, start, stop };
};
