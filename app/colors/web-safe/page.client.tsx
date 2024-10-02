"use client";

import { useState, useMemo, MouseEvent, Suspense } from "react";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { type WebSafeHexObjData } from "@/app/colors/web-safe/data";
import { copyToClipboard } from "@/utils/copyToClipboard";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

type WebSafePageClientProps = { data: WebSafeHexObjData[] | undefined | null };

export default function WebSafePageClient({ data = [] }: WebSafePageClientProps) {
  const searchParams = useSearchParams();
  const getSelector = searchParams.get("selector");
  const [selector, setSelector] = useState<string | number | null>();

  const dataResult = useMemo((): WebSafeHexObjData[] => {
    try {
      if (!Array.isArray(data)) throw new Error("자료 타입의 오류 발생");
      if (data.length != 216) throw new Error("자료 개수의 오류 발생");
      if (selector == 0) return data; // 전체 출력
      if (selector == 1) return data.filter(({ isTrueSafeColor }) => isTrueSafeColor === true); // safest web colors 안전색 22종
      if (selector == 2) return data.filter(({ hex: { r, g, b } }) => r == g && g == b); // gray 회색 계열

      if (selector == 3) return data.filter(({ int: { r, g, b } }) => r > g && r > b);
      if (selector == 4) return data.filter(({ int: { r, g, b } }) => g > r && g > b);
      if (selector == 5) return data.filter(({ int: { r, g, b } }) => b > r && b > g);

      if (selector == 6) return data.filter(({ int: { r, g, b } }) => r + g + b > (255 * 3) / 2); // 밝은 색
      if (selector == 7) return data.filter(({ int: { r, g, b } }) => !(r + g + b > (255 * 3) / 2)); // 어두운 색

      return data;
    } catch (e) {
      return []; // 오류 [] 처리
    }
  }, [data, selector]);

  const onClickCopyBtn = (e: MouseEvent<HTMLButtonElement>, text: string) => {
    e.preventDefault();
    copyToClipboard(text, {
      onSuccess: () => alert("복사하였습니다."),
      onFailure: () => alert("복사 오류"),
      onNotSupported: () => alert("미지원"),
    });
    return;
  };

  const dataLength = data?.length ?? 0;
  const dataResultLength = dataResult.length ?? 0;
  if (dataResultLength <= 0) return notFound(); // 결과값 없음
  return (
    <Suspense fallback={<>loading</>}>
      <div>
        <div>총{dataLength}개의 색상</div>
        <div>{dataResultLength}개의 색상</div>
        <ul className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
          {dataResult.map(({ hex: { r, g, b } }, i) => {
            const colorHexText = `${r}${g}${b}`;
            return (
              <li
                key={i}
                className="flex flex-col justify-around min-w-32 max-w-48 w-full aspect-[1/1] rounded-lg pt-2 pb-3 pl-2 pr-2 border-black border-solid border-[1px] gap-2 mr-auto ml-auto"
                style={{ backgroundColor: `white` }}
              >
                <div className="flex-grow-[1] h-fit aspect-[1/1] border-black border-solid border-[1px] rounded-md" style={{ backgroundColor: `#${colorHexText}` }}>
                  <Link className="w-[100%] h-[100%] block" href={`/colors/web-safe/${colorHexText}`} title={`#${colorHexText} 색상의 상세보기 페이지로 이동합니다.`}>
                    <span></span>
                  </Link>
                </div>

                <div className="flex flex-row justify-between content-center align-middle bg-[#fff] text-black pl-1 pr-1 rounded-md">
                  <div style={{ fontWeight: 500 }}>{`#${colorHexText}`}</div>
                  <button
                    type="button"
                    aria-label={`#${colorHexText} 색상의 값을 복사 합니다.`}
                    title={`#${colorHexText} 색상의 값을 복사 합니다.`}
                    onClick={(e) => onClickCopyBtn(e, `#${colorHexText}`)}
                    data-value={`#${colorHexText}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Suspense>
  );
}
