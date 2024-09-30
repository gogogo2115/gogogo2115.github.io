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
                className="max-w-48 min-w-56 w-[80%] aspect-[1/1] rounded-lg pt-2 pb-3 pl-2 pr-2 flex justify-around flex-col border-black border-solid border-[1px] gap-2"
                style={{ backgroundColor: `white` }}
              >
                <div className="flex-grow-[1] rounded-md border-solid  border-black border-[1px] h-fit" style={{ background: `#${colorHexText}` }}>
                  <Link className="w-[100%] h-[100%] block" href={`/colors/web-safe/${colorHexText}`} title={`#${colorHexText} 색상의 상세보기 페이지로 이동합니다.`}>
                    <span></span>
                  </Link>
                </div>

                <div className="flex flex-row justify-between content-center align-middle bg-[#fff] text-black p-2 rounded-md border-solid border-black border-[1px] items-center">
                  <div>{`#${colorHexText}`}</div>
                  <button type="button" aria-label={`#${colorHexText} 색상의 값을 복사 합니다.`} title={`#${colorHexText} 색상의 값을 복사 합니다.`} onClick={() => alert("테스트 중입니다.")}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
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
