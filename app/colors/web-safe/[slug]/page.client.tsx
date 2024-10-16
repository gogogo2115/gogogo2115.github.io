"use client";

import { type WebSafeData } from "@/app/colors/web-safe/data";
import { data as webData } from "@/app/colors/web/data";
import { hexObjToFullHex, rgbObjToCmykObj, rgbObjToHsvObj, rgbObjToHslObj, type CMYK_OBJ } from "@/app/colors/color";

type WebSafePageClientProps = { slug: string; data: WebSafeData };

export default function WebSafeSlugPageClient({ slug, data }: WebSafePageClientProps) {
  const { hex, rgb } = data;
  const filterWebColors = webData.filter((v) => hexObjToFullHex(v.hex) === slug.toUpperCase());

  const fullHex = hexObjToFullHex(hex);
  const cmyk = rgbObjToCmykObj(rgb, true) as CMYK_OBJ;
  const hsv = rgbObjToHsvObj(rgb);
  const hsl = rgbObjToHslObj(rgb);

  const cssFullHEX = `#${fullHex}`;
  const cssCMYK = `cmyk(${cmyk.c}%,${cmyk.m}%,${cmyk.y}%,${cmyk.k}%)`;
  const cssRGB = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  const cssHSV = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
  const cssHSL = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div>
      <div>{cssFullHEX}</div>
      {filterWebColors.length >= 1 && <div>{`웹 색상 이름: ${filterWebColors.map((v) => v.name).join(" / ")}`}</div>}
      <div>{cssCMYK}</div>
      <div>{cssRGB}</div>
      <div>hsl:{cssHSL}</div>
      <div>hsv:{cssHSV}</div>
    </div>
  );
}
