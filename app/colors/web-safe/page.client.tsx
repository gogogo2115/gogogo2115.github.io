"use client";

import { notFound } from "next/navigation";
import { useState, useMemo } from "react";

import { type WebSafeHexObjData } from "@/app/colors/web-safe/data";
import Link from "next/link";

type WebSafePageClientProps = { data: WebSafeHexObjData[] | undefined | null };

export default function WebSafePageClient({ data = [] }: WebSafePageClientProps) {
  const [selector, setSelector] = useState(1);

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
      <div>총{dataLength}개의 색상</div>
      <div>
        <div>{dataResultLength}개의 색상</div>
        <div className="flex flex-wrap gap-2 content-between justify-start">
          {dataResult.map(({ hex: { r, g, b } }, i) => {
            const colorHexText = `${r}${g}${b}`;
            return (
              <div
                key={i}
                className="max-w-48 min-w-56 w-[80%] aspect-[1/1] rounded-lg pb-2 pl-1 pr-1 flex justify-end flex-col border-white border-solid border-[1px]"
                style={{ background: `#${colorHexText}` }}
              >
                <div className="flex flex-row justify-between content-center bg-[#fff] text-black p-2 rounded-lg border-solid border-black border-[1px]">
                  <Link href={`/colors/web-safe/${colorHexText}`} title={`#${colorHexText} 색상의 상세보기 페이지로 이동합니다.`}>
                    #{colorHexText}
                  </Link>
                  <button type="button" title={`#${colorHexText} 색상의 값을 복사 합니다.`} onClick={() => alert("테스트 중입니다.")}>
                    복사
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
