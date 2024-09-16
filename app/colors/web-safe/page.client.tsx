"use client";

import { notFound } from "next/navigation";
import { useState, MouseEvent, useMemo } from "react";

import { type WebSafeHexObjData } from "@/app/colors/web-safe/data";

type WebSafePageClientProps = { data: WebSafeHexObjData[] | undefined | null };

export default function WebSafePageClient({ data = [] }: WebSafePageClientProps) {
  const [selector, setSelector] = useState(0);

  const dataResult = useMemo((): WebSafeHexObjData[] => {
    try {
      if (!Array.isArray(data)) throw new Error("자료 타입의 오류 발생");
      if (data.length != 216) throw new Error("자료 개수의 오류 발생");
      if (selector == 0) return data; // 전체 출력
      if (selector == 1) return data.filter((v) => v.isTrueSafeColor === true); // safest web colors

      return data;
    } catch (e) {
      return []; // 오류 [] 처리
    }
  }, [data, selector]);

  const dataLength = data?.length ?? 0;
  const dataResultLength = dataResult.length ?? 0;

  if (dataResultLength <= 0) return notFound(); // 결과값 없음
  return (
    <>
      <div>{dataLength}개의 색상</div>
      <div>
        <div>{dataResultLength}개의 색상</div>
        {dataResult.map((v) => {
          const { r, g, b } = v.hex;
          return <div key={String(v)} style={{ background: `#${`${r}${g}${b}`}` }}>{`${r}${g}${b}`}</div>;
        })}
      </div>
    </>
  );
}
