"use client";

import { WebData } from "@/app/colors/web/data";
import { getOptimalFontColor } from "../color";
import Link from "next/link";

type ColorsWebPageClientProps = { data: WebData[] };

export default function ColorsWebPageClient({ data }: ColorsWebPageClientProps) {
  return (
    <>
      <div className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {data.map((v, i) => {
          const name = v.name;

          const { r: rH, g: gH, b: bH } = v.hex;
          const fullHex = `${rH}${gH}${bH}`;

          const { r: rOf, g: gOf, b: bOf } = getOptimalFontColor(v.rgb);
          const optimalFontColor = `rgb(${rOf},${gOf},${bOf})`;

          return (
            <div
              key={i}
              className="flex flex-row justify-between content-center items-center gap-2 p-2"
              data-hex={`#${fullHex}`}
              data-name={`${name}`}
              style={{ backgroundColor: name, color: optimalFontColor }}
            >
              <Link href={`/colors/web/${name.toLowerCase()}`}>{name}</Link>
              <button style={{ height: "28px", width: "28px" }}>복사</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
