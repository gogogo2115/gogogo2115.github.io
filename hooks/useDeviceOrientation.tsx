"use strict";

import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";

// 기기 방향 센서에서 반환되는 데이터의 타입 정의
// alpha: Z축 회전 각도 (0-360), 자북 기준 또는 디바이스 기준.
// beta: X축 회전 각도 (-180-180).
// gamma: Y축 회전 각도 (-90-90).
// absolute: 데이터가 지자기 북쪽을 기준으로 하는지 여부.
type Data = { alpha: number | null | undefined; beta: number | null | undefined; gamma: number | null | undefined; absolute: boolean | null | undefined };

// 훅의 옵션 타입 정의
// initialAction: 훅 초기화 시 즉시 데이터 수집을 시작할지 여부
// initialData: 초기 센서 데이터 (선택 사항)
// throttleTime: 스로틀링 시간 (밀리초), 기본값 100ms
type Options = { initialIsListening?: boolean; throttleTime?: number };

// 권한 상태
// idle: 시작전
// not_supported: DeviceOrientationEvent 지원하지 않음
// not_required: 권한 실행이 필요 없는 환경입니다.(권한 허용으로 처리)
// granted: 권한 허용됨
// denied: 권한 거부됨
// error_denied: 오류 발생
type Permission = "idle" | "not_supported" | "not_required" | "granted" | "denied" | "error_denied";

export const getIsSupported = (): boolean => {
  return typeof window !== "undefined" && "DeviceOrientationEvent" in window && typeof window.DeviceOrientationEvent === "function";
};

export const getIsPermissionGranted = (permission: unknown): permission is Permission => {
  return typeof permission === "string" && (permission === "granted" || permission === "not_required");
};

export const getRequestPermission = async (): Promise<Permission> => {
  if (!getIsSupported()) return "not_supported";
  if (!("requestPermission" in DeviceOrientationEvent) || typeof DeviceOrientationEvent.requestPermission !== "function") return "not_required";
  try {
    const permission = await DeviceOrientationEvent.requestPermission();
    return ["granted", "denied"].includes(permission) ? permission : "error_denied";
  } catch {
    return "denied";
  }
};

// 센서 활성화 여부 확인
// timeout 내에 유효한 데이터(alpha, beta, gamma 중 하나라도 null 아님)를 수신하면 true 반환
async function checkActive(timeout: number = 100, permission: Permission): Promise<boolean> {
  if (!getIsSupported() || !getIsPermissionGranted(permission)) return false;

  return new Promise((resolve) => {
    let hasData = false;
    const handler = (e: DeviceOrientationEvent) => {
      if (e.alpha !== null || e.beta !== null || e.gamma !== null) {
        hasData = true;
        clearTimeout(timer);
        window.removeEventListener("deviceorientation", handler);
        resolve(true);
      }
    };

    window.addEventListener("deviceorientation", handler);
    const timer = setTimeout(() => {
      window.removeEventListener("deviceorientation", handler);
      resolve(hasData);
    }, timeout);
  });
}

// 기본 값
const DEFAULT_THROTTLE = 100;
const DEFAULT_IS_LISTENING = false;

export const useDeviceOrientation = ({ initialIsListening = DEFAULT_IS_LISTENING, throttleTime = DEFAULT_THROTTLE }: Options = {}) => {
  const [supported, setSupported] = useState(getIsSupported());
  const [permission, setPermission] = useState<Permission>("idle");
  const [isListening, setIsListening] = useState(initialIsListening);
  const [data, setData] = useState<Data>({ alpha: null, beta: null, gamma: null, absolute: null });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleThrottledEvent = useCallback(
    throttle(
      (ev: DeviceOrientationEvent) => {
        setData({
          alpha: typeof ev.alpha === "number" ? ev.alpha : null,
          beta: typeof ev.beta === "number" ? ev.beta : null,
          gamma: typeof ev.gamma === "number" ? ev.gamma : null,
          absolute: typeof ev.absolute === "boolean" ? ev.absolute : null,
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
      } catch {}
    };

    init();
  }, [initialIsListening]);

  useEffect(() => {
    if (supported && isListening && getIsPermissionGranted(permission)) {
      window.addEventListener("deviceorientation", handleThrottledEvent);
    } else {
      window.removeEventListener("deviceorientation", handleThrottledEvent);
    }

    return () => {
      window.removeEventListener("deviceorientation", handleThrottledEvent);
      handleThrottledEvent.cancel();
    };
  }, [handleThrottledEvent, isListening, permission, supported]);

  return { supported, permission, isListening, data, requestPermission, start, stop };
};
