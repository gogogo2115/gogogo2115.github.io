"use client";

import { WebData } from "@/app/colors/web/data";
import { getContrastRatio, getOptimalFontColor } from "../color";

type ColorsWebPageClientProps = { data: WebData[] };

export default function ColorsWebPageClient({ data }: ColorsWebPageClientProps) {
  return (
    <div className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {data.map((v, i) => {
        const name = v.name;

        const { r: rH, g: gH, b: bH } = v.hex;
        const fullHex = `${rH}${gH}${bH}`;

        const { r: rOp, g: gOp, b: bOp } = getOptimalFontColor(v.rgb);
        const color = `rgb(${rOp},${gOp},${bOp})`;

        return (
          <div key={i} className="p-2" data-hex={`#${fullHex}`} data-name={`${name}`} style={{ backgroundColor: name, color }}>
            {v.name}
          </div>
        );
      })}
    </div>
  );
}
