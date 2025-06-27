"use client";

import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";

export default function OrientationPage() {
  const { data } = useDeviceOrientation();
  return (
    <>
      <div>{data.alpha}</div>
      <div>{data.beta}</div>
      <div>{data.gamma}</div>
      <div>{data.absolute && "absolute"}</div>
    </>
  );
}
