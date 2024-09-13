"use client";

import { useState, MouseEvent, useMemo } from "react";

type WebSafePageClientProps = { data: string[] | undefined | null };

export default function WebSafePageClient({ data = [] }: WebSafePageClientProps) {
  const [selector, setSelector] = useState(0);

  const dataLength = data?.length ?? 0;

  return (
    <>
      <div>{dataLength}개의 색상</div>
      <div>
        {dataLength >= 1 &&
          data?.map((v) => (
            <div key={v} style={{ background: `#${v}` }}>
              {v}
            </div>
          ))}
      </div>
    </>
  );
}
