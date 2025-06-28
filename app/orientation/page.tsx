"use client";

import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";

export default function OrientationPage() {
  const { data, stop, start, isListening, supported, permission } = useDeviceOrientation({ initialIsListening: true, throttleTime: 100 });

  return (
    <>
      <div>{supported ? "센서 지원" : "센서 미지원"}</div>
      <div>{isListening ? "센서 활성화" : "센서 비활성화"}</div>
      <div>권한: {permission}</div>
      <button onClick={start}>시작</button>
      <button onClick={stop}>정지</button>
      <div>alpha: {data.alpha}</div>
      <div>beta: {data.beta}</div>
      <div>gamma: {data.gamma}</div>
      <div>absolute: {data.absolute ? "지원" : "미지원"}</div>
    </>
  );
}
