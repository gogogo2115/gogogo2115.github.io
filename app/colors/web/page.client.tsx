"use client";

import { WebData } from "@/app/colors/web/data";

type ColorsWebPageClientProps = { data: WebData[] };

export default function ColorsWebPageClient({ data }: ColorsWebPageClientProps) {
  console.log(data);

  return (
    <>
      {data.map((v, i) => (
        <div key={i} style={{ backgroundColor: v.name }}>
          {v.name}
        </div>
      ))}
    </>
  );
}
