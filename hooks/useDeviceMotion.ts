"use strict";

import { useCallback, useEffect, useState } from "react";
import throttle from "lodash/throttle";

// 기기 모션 데이터 타입 정의
// acceleration: 중력 제외 가속도 (x, y, z)
// accelerationIncludingGravity: 중력 포함 가속도 (x, y, z)
// rotationRate: 회전 속도 (alpha, beta, gamma)
// interval: 이벤트 간격 (밀리초)
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

type Data = {
  acceleration: Acceleration; // 중력을 제외한 가속도 (m/s^2)
  accelerationIncludingGravity: Acceleration; // 중력을 포함한 가속도 (m/s^2)
  rotationRate: RotationRate; // 회전율 (degrees/second)
  interval: number | null | undefined; // 데이터 획득 간격 (ms)
};

// 훅 옵션 타입 정의
// initialIsListening: 훅 초기화 시 즉시 데이터 수집 시작 여부
// throttleTime: 스로틀링 시간 (밀리초), 기본값 100ms
type Options = {
  initialIsListening?: boolean;
  throttleTime?: number;
};

// 권한 상태
// idle: 시작 전
// not_supported: DeviceMotionEvent 지원하지 않음
// not_required: 권한 요청이 필요 없는 환경 (권한 허용으로 처리)
// granted: 권한 허용됨
// denied: 권한 거부됨
// error_denied: 오류 발생
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

// 기본 값
const DEFAULT_THROTTLE = 100;
const DEFAULT_IS_LISTENING = false;

/**
 * 기기 모션 데이터(가속도계 및 자이로스코프)를 수집하는 커스텀 훅
 * @param options 훅 설정 옵션
 * @param options.initialIsListening 즉시 데이터 수집 시작 여부 (기본값: false)
 * @param options.throttleTime 스로틀링 시간(밀리초, 기본값: 100)
 * @returns 지원 여부, 권한 상태, 수집 상태, 모션 데이터, 제어 함수를 포함한 객체
 */
export const useDeviceMotion = ({ initialIsListening = DEFAULT_IS_LISTENING, throttleTime = DEFAULT_THROTTLE }: Options = {}) => {
  const [supported, setSupported] = useState(getIsSupported());
  const [permission, setPermission] = useState<Permission>("idle");
  const [isListening, setIsListening] = useState(initialIsListening);
  const [data, setData] = useState<Data>({
    acceleration: { x: null, y: null, z: null },
    accelerationIncludingGravity: { x: null, y: null, z: null },
    rotationRate: { alpha: null, beta: null, gamma: null },
    interval: null,
  });

  // 스로틀링된 이벤트 핸들러
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

  // 권한 요청 함수
  const requestPermission = useCallback(async () => {
    const result = await getRequestPermission();
    setPermission(result);
    return result;
  }, []);

  // 데이터 수집 시작 함수
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

  // 데이터 수집 중지 함수
  const stop = useCallback(() => {
    setIsListening(false);
    handleThrottledEvent.cancel();
  }, [handleThrottledEvent]);

  // 초기화
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
        console.error("기기 모션 초기화 실패:", error);
      }
    };

    init();
  }, [initialIsListening]);

  // 이벤트 리스너 관리
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
