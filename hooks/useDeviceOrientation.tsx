import { useCallback, useEffect, useState } from "react";

// alpha - Z축 회전 각도 (0-360), 자북 기준 또는 디바이스 기준.
// beta - X축 회전 각도 (-180-180).
// gamma - Y축 회전 각도 (-90-90).
// absolute - 데이터가 지자기 북쪽을 기준으로 하는지 여부.
type DeviceOrientationData = { alpha: null | number; beta: null | number; gamma: null | number; absolute: null | boolean };
const defaultData: DeviceOrientationData = { alpha: null, beta: null, gamma: null, absolute: null };

type Options = { initialAction?: boolean; initialData?: DeviceOrientationData };

export const isSupported = () => {
  return typeof window !== "undefined" && "DeviceOrientationEvent" in window && typeof window.DeviceOrientationEvent === "function";
};

export const isRequestPermission = async () => {
  if (!isSupported()) return false;
  if ("requestPermission" in DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === "function") {
    try {
      const permission = (await DeviceOrientationEvent.requestPermission()) as "granted" | "denied";
      return permission === "granted";
    } catch {
      return false;
    }
  }
  return true;
};

export const useDeviceOrientation = ({ initialAction = true, initialData = defaultData }: Options = {}) => {
  const supported = isSupported();
  const [action, setAction] = useState(initialAction); // 정지 시작 기능을 위함
  const [data, setData] = useState(initialData);

  // 기기 방향 이벤트 핸들러
  const handleDeviceOrientation = useCallback((event: DeviceOrientationEvent) => {
    setData({ alpha: event.alpha, beta: event.beta, gamma: event.gamma, absolute: event.absolute });
  }, []);

  useEffect(() => {
    window.addEventListener("deviceorientation", handleDeviceOrientation);
    return () => window.removeEventListener("deviceorientation", handleDeviceOrientation);
  }, [handleDeviceOrientation]);

  return { data };
};
