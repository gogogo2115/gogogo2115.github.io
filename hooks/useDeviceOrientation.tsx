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

const DEFAULT_DATA: Readonly<Data> = { alpha: null, beta: null, gamma: null, absolute: null };

export const isSupported = (): boolean => {
  return typeof window !== "undefined" && "DeviceOrientationEvent" in window && typeof window.DeviceOrientationEvent === "function";
};

export const requestPermission = async (): Promise<Permission> => {
  if (!isSupported()) return "not_supported";
  if (!("requestPermission" in DeviceOrientationEvent) || typeof DeviceOrientationEvent.requestPermission !== "function") return "not_required";
  try {
    const permission = (await DeviceOrientationEvent.requestPermission()) as string;
    return ["granted", "denied"].includes(permission) ? (permission as Permission) : "error_denied";
  } catch {
    return "error_denied";
  }
};

export const useDeviceOrientation = ({ initialIsListening = true, initialData = DEFAULT_DATA, throttleTime = 100 }: Options = {}) => {
  const [supported, setSupported] = useState<boolean>(false);
  const [permission, setPermission] = useState<Permission>("idle");
  const [isListening, setIsListening] = useState(initialIsListening);
  const [data, setData] = useState(initialData);

  // 센서 데이터 범위 조정 코드를 제거 (대부분 브라우저에서 이미 올바른 범위 반환)
  const updateData = useCallback((ev: DeviceOrientationEvent) => {
    const newData = { alpha: ev.alpha, beta: ev.beta, gamma: ev.gamma, absolute: ev.absolute };
    setData((prevData) => ({ ...prevData, ...newData }));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleThrottledEvent = useCallback(throttle(updateData, throttleTime, { leading: true, trailing: true }), [updateData, throttleTime]);

  const start = useCallback(() => {
    if (supported && ["not_required", "granted"].includes(permission)) {
      setIsListening(true); // 리스닝 시작
    }
  }, [supported, permission]);

  const stop = useCallback(() => {
    setIsListening(false); // 리스닝 중지
  }, []);

  useEffect(() => {
    const init = async () => {
      const checkSupported = isSupported();
      const checkPermission = await requestPermission();
      setSupported(checkSupported);
      setPermission(checkPermission);
    };
    init();
  }, []);

  useEffect(() => {
    if (!supported || !isListening || !["not_required", "granted"].includes(permission)) {
      window.removeEventListener("deviceorientation", handleThrottledEvent);
    } else {
      window.addEventListener("deviceorientation", handleThrottledEvent);
    }

    return () => window.removeEventListener("deviceorientation", handleThrottledEvent);
  }, [handleThrottledEvent, isListening, permission, supported]);

  return { supported, permission, isListening, data, start, stop };
};
