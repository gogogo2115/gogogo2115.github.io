"use client";

import { WebData } from "@/app/colors/web/data";
import ColorWebPalette from "@/components/ColorWebPalette";

type ColorsWebPageClientProps = { data: WebData[] };

export default function ColorsWebPageClient({ data }: ColorsWebPageClientProps) {
  return (
    <>
      <h1 className="p-4">웹 색상 리스트</h1>
      <h2></h2>
      <div className="w-full grid gap-4 p-4 grid-cols-1 xs:grid-cols-1 2xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data.map((v, i) => {
          return <ColorWebPalette key={i} data={v} />;
        })}
      </div>
      <div></div>
    </>
  );
}
