"use client";
// import { useState } from "react";

import { type WebSafeHexObjData } from "@/app/colors/web-safe/data";
import { rgbToCMYK, rgbToHSL } from "@/app/colors/toColor";

type WebSafePageClientProps = { data: WebSafeHexObjData };

export default function WebSafePageClient({ data }: WebSafePageClientProps) {
  const { hex, int } = data;
  const { r: hexR, g: hexG, b: hexB } = hex;
  const { r: intR, g: intG, b: intB } = int;

  const fullHex = `#${hexR}${hexG}${hexB}`;
  const shortHex = `#${hexR[0]}${hexG[0]}${hexB[0]}`;

  const cssRGB = `rgb(${intR}, ${intG}, ${intB})`;

  const toCMYK = rgbToCMYK(data.int, true);
  const cmyk = toCMYK != null ? `cmyk(${toCMYK.c}%,${toCMYK.m}%,${toCMYK.y}%,${toCMYK.k}%)` : null;

  const toHSL = rgbToHSL(data.int);
  const hsl = toHSL != null ? `hsl(${toHSL.h}, ${toHSL.s}%, ${toHSL.l}%)` : null;

  return (
    <div className="p">
      <div></div>

      <div className="flex flex-row justify-between">
        <span>{fullHex}</span>
        <button type="button" title={`${fullHex} 복사하기`} data-color={fullHex}>
          복사
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <span>{shortHex}</span>
        <button type="button" title={`${fullHex} 복사하기`} data-color={shortHex}>
          복사
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <span>{cssRGB}</span>
        <button type="button" title={`${fullHex} 복사하기`} data-color={cssRGB}>
          복사
        </button>
      </div>
      {cmyk !== null && (
        <div className="flex flex-row justify-between">
          <span>{cmyk}</span>
          <button type="button" title={`${fullHex} 복사하기`} data-color={cmyk}>
            복사
          </button>
        </div>
      )}
      {hsl !== null && (
        <div className="flex flex-row justify-between">
          <span>{hsl}</span>
          <button type="button" title={`${fullHex} 복사하기`} data-color={hsl}>
            복사
          </button>
        </div>
      )}
    </div>
  );
}
