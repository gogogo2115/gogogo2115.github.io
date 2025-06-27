"use client";

import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";

export default function OrientationPage() {
  const { data } = useDeviceOrientation();
  return (
    <>
      <div>alpha: {data.alpha}</div>
      <div>beta: {data.beta}</div>
      <div>gamma: {data.gamma}</div>
      <div>absolute: {data.absolute ? "지원" : "미지원"}</div>
    </>
  );
}
