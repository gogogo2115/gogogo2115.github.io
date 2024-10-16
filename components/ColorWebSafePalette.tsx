"use client";

import { CMYK_OBJ, hexObjToFullHex, rgbObjToCmykObj } from "@/app/colors/color";
import { WebSafeData } from "@/app/colors/web-safe/data";
import CopySVG from "@/svgs/copy (1).svg";
import { copyToClipboard } from "@/utils/copyToClipboard";

import Link from "next/link";
import { HTMLAttributes, MouseEvent, useState } from "react";

type Props = { data: WebSafeData } & HTMLAttributes<HTMLDivElement>;

const ColorWebSafePalette = ({ data, ...rest }: Props) => {
  const { hex, rgb } = data;
  const fullHex = hexObjToFullHex(hex);
  const cmyk = rgbObjToCmykObj(rgb, true) as CMYK_OBJ;

  const cssRgb = `rgb(${rgb.r},${rgb.g},${rgb.b})`;
  const cssCmyk = `cmyk(${cmyk.c}%,${cmyk.m}%,${cmyk.y}%,${cmyk.k}%)`;

  const [copied, setCopied] = useState<{ msg: string | null }>({ msg: null });

  const handleCopy = (e: MouseEvent<HTMLButtonElement>, copy: string, msg: string = "") => {
    e.preventDefault();
    copyToClipboard(copy, {
      onSuccess: () => {
        setCopied({ msg: msg });
        setTimeout(() => setCopied({ msg: null }), 1500);
      },
      onFailure: (errMsg) => {
        setCopied({ msg: errMsg ?? "오류발생" });
        setTimeout(() => setCopied({ msg: null }), 1500);
      },
    });
  };

  return (
    <div
      className={`flex flex-col justify-between items-stretch gap-2 bg-white px-2 pt-3 pb-4 rounded-lg shadow-lg border border-gray-200 w-full max-w-md mx-auto transition-all hover:shadow-xl`}
      {...rest}
    >
      {/* 색상 미리보기와 상세보기 링크 */}
      <Link
        href={`/colors/web-safe/${fullHex}`}
        className="relative w-full h-20 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow group"
        style={{ backgroundColor: `#${fullHex}` }}
        title={`#${fullHex} 정보 상세보기`}
      >
        <div className="hidden rounded-lg group-hover:flex w-full h-full text-white inset-0 items-center justify-center bg-black bg-opacity-50">{`#${fullHex} 상세보기`}</div>
      </Link>

      {/* 헤더 */}
      <div className="relative flex justify-between items-center px-1">
        <div className="flex items-center gap-1 font-semibold">
          <span className="block w-5 h-5 rounded-full border border-gray-300 shadow" style={{ backgroundColor: `#${fullHex}` }} aria-label={`색상 미리보기: #${fullHex}`} />
          <span className="text-gray-800 font-lg font-bold truncate">{`#${fullHex}`}</span>
        </div>
        <button
          type="button"
          className="w-8 h-8 flex items-center p-1 justify-center text-gray-800 hover:scale-105 active:scale-95 transition-transform"
          aria-label={`HEX 코드 복사`}
          title={`HEX 코드 복사`}
          onClick={(e) => handleCopy(e, `#${fullHex}`, "HEX값 복사 성공")}
        >
          <CopySVG />
        </button>
      </div>

      {/* 색상 정보 */}
      <div className="flex flex-col gap-2 px-2">
        {/* RGB 값 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium text-sm sm:text-base truncate">{cssRgb}</span>
          <button
            type="button"
            className="w-8 h-8 flex items-center p-1 justify-center text-gray-800 hover:scale-105 active:scale-95 transition-transform font-bold"
            aria-label={`RGB 코드 복사`}
            title={`RGB 코드 복사`}
            onClick={(e) => handleCopy(e, cssRgb, "RGB값 복사 성공")}
          >
            <CopySVG />
          </button>
        </div>

        {/* CMYK 값 */}
        <div className="flex justify-between items-center">
          <span className="text-gray-800 font-medium text-sm sm:text-base truncate">{cssCmyk}</span>
          <button
            type="button"
            className="w-8 h-8 flex items-center p-1 justify-center text-gray-800 hover:scale-105 active:scale-95 transition-transform font-bold"
            aria-label={`CMYK 코드 복사`}
            title={`CMYK 코드 복사`}
            onClick={(e) => handleCopy(e, cssCmyk, "CMYK값 복사 성공")}
          >
            <CopySVG />
          </button>
        </div>
      </div>

      {/* 복사 완료 메시지 */}
      <div className="text-base text-green-500 h-6 px-2 py-2 w-full text-center">{copied.msg && copied.msg}</div>
    </div>
  );
};

export default ColorWebSafePalette;
