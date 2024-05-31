"use client";

import { webSafeColorsData } from "@/app/web-safe-colors/webSafeColorsData";

const webSafeData = webSafeColorsData();

export default function WebSafeColors() {
  return (
    <>
      {webSafeData.map((v, i) => {
        const dataKey = `${v.key.r}${v.key.g}${v.key.b}`;
        const dataHex = `${v.hex.r}${v.hex.g}${v.hex.b}`;
        const backgroundColor = `rgb(${v.rgb.r}, ${v.rgb.g}, ${v.rgb.b})`;
        return (
          <div key={i} data-idx={v.idx} data-key={dataKey} data-hex={dataHex} style={{ backgroundColor }}>
            {i}
          </div>
        );
      })}
    </>
  );
}
