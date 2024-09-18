"use client";

import { type WebSafeHexObjData } from "@/app/colors/web-safe/data";

type WebSafePageClientProps = { data: WebSafeHexObjData };

export default function WebSafePageClient({ data }: WebSafePageClientProps) {
  const {
    hex: { r: hexR, g: hexG, b: hexB },
    int: { r: intR, g: intG, b: intB },
  } = data;

  const cssRGB = `rgb(${intR}, ${intG}, ${intB})`;
  const fullHex = `#${hexR}${hexG}${hexB}`;
  const shortHex = `#${hexR[0]}${hexG[0]}${hexB[0]}`;

  return (
    <div>
      <div>{fullHex}</div>
      <div>{shortHex}</div>
      <div>{cssRGB}</div>
    </div>
  );
}
