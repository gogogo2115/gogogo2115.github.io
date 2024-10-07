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
      <ul>
        {selectorData.map((v, i) => {
          const { r, g, b } = v.hex;
          const rgb = getOptimalFontColor(v.rgb);
          const fullHex = `${r}${g}${b}`;
          const cssColor = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
          return (
            <li key={i} className="max-w-40 aspect-[3/2]" style={{ backgroundColor: `#${fullHex}`, color: cssColor }}>
              <Link href={`/colors/web-safe/${fullHex}`}>{fullHex}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
