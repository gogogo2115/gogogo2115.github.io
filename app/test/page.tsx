"use client";

import Svg from "@/public/next.svg";

export default function TestPage() {
  const BUILD_DATE_ISO = process.env.BUILD_DATE_ISO ?? "";
  const BUILD_RAND_KEY = process.env.BUILD_RAND_KEY ?? "";
  return (
    <>
      <Svg />
      <div>BUILD_DATE_ISO: {BUILD_DATE_ISO}</div>
      <div>BUILD_RAND_KEY: {BUILD_RAND_KEY}</div>
    </>
  );
}
