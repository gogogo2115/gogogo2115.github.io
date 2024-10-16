"use client";

import { useMemo, useState } from "react";
import { type WebSafeData } from "./data";

import ColorWebSafePalette from "@/components/ColorWebSafePalette";

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
      <div>웹 안전색</div>
      <ul className="grid gap-4 p-4 grid-cols-1 xs:grid-cols-1 2xs:grid-cols-1 3xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {selectorData.map((v, i) => {
          return <ColorWebSafePalette key={i} data={v} />;
        })}
      </ul>
    </div>
  );
}
