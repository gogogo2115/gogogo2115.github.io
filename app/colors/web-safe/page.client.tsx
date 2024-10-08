"use client";

import { useMemo, useState } from "react";
import { type WebSafeData } from "./data";
import Link from "next/link";
import { getOptimalFontColor } from "../color";

type WebSafePageClientProps = { data: WebSafeData[] };

export default function WebSafePageClient({ data }: WebSafePageClientProps) {
  const [selector] = useState(0);

  const selectorData = useMemo(() => {
    if (selector === 0) return data;
    if (selector === 1) return data.filter((v) => v.isReallySafe);
    return data;
  }, [data, selector]);

  return (
    <div>
      <ul className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {selectorData.map((v, i) => {
          const { r, g, b } = v.hex;
          const rgb = getOptimalFontColor(v.rgb);
          const fullHex = `${r}${g}${b}`;
          const cssColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
          return (
            <li key={i} className="min-w-40 max-w-56 aspect-[3/2] p-2 border-solid border-black border-[2px]" style={{ backgroundColor: `#${fullHex}`, color: cssColor }}>
              <Link className="text-bold text-bold" href={`/colors/web-safe/${fullHex}`}>
                {fullHex}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
