"use client";

import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { selectSettings, setFontSize, setTheme } from "@/lib/store/slice/settings/settingsSlice";
import { isValidFontSize, isValidTheme } from "@/lib/store/slice/settings/settingsUtils";

export default function SettingsPage() {
  const { theme, fontSize } = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const handleThemeClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const dataTheme = ev.currentTarget.getAttribute("data-value");
    if (!isValidTheme(dataTheme)) return;
    dispatch(setTheme({ value: dataTheme, setStorage: true, updateDocument: true }));
  };

  const handleFontSizeClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const dataFontSize = ev.currentTarget.getAttribute("data-value");
    if (!isValidFontSize(dataFontSize)) return;
    dispatch(setFontSize({ value: dataFontSize, setStorage: true }));
  };

  return (
    <>
      <div role="radiogroup" aria-label="테마 변경" className="flex flex-row gap-1">
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={theme === "dark"} aria-label="라이트" onClick={handleThemeClick} data-value="dark">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-full border-[2px] border-gray-500 box-border">
            <div className="relative block overflow-hidden w-full h-full bg-black">
              <div className="absolute top-2 left-2 text-white font-medium text-xs select-none">가</div>
            </div>
          </div>
          <div>다크</div>
        </button>
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={theme === "light"} aria-label="다크" onClick={handleThemeClick} data-value="light">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-full border-[2px] border-gray-500 box-border">
            <div className="relative block overflow-hidden w-full h-full bg-white">
              <div className="absolute top-2 left-2 text-black font-medium text-xs select-none">가</div>
            </div>
          </div>
          <div>라이트</div>
        </button>
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={theme === "system"} aria-label="시스템" onClick={handleThemeClick} data-value="system">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-full border-[2px] border-gray-500 box-border flex flex-row">
            <div className="relative block bg-black w-1/2 h-full">
              <div className="absolute top-2 left-2 text-white font-medium text-xs select-none">가</div>
            </div>
            <div className="relative block bg-white w-1/2 h-full">
              <div className="absolute top-2 left-2 text-black font-medium text-xs select-none">가</div>
            </div>
          </div>
          <div>시스템</div>
        </button>
      </div>

      <div role="radiogroup" aria-label="글자 크기 변경" className="flex flex-row gap-1">
        <button type="button" className="w-10 h-10 cursor-pointer" role="radio" aria-checked={fontSize === 1} data-value={1} onClick={handleFontSizeClick}>
          1
        </button>
        <button type="button" className="w-10 h-10 cursor-pointer" role="radio" aria-checked={fontSize === 2} data-value={2} onClick={handleFontSizeClick}>
          2
        </button>
        <button type="button" className="w-10 h-10 cursor-pointer" role="radio" aria-checked={fontSize === 3} data-value={3} onClick={handleFontSizeClick}>
          3
        </button>
        <button type="button" className="w-10 h-10 cursor-pointer" role="radio" aria-checked={fontSize === 4} data-value={4} onClick={handleFontSizeClick}>
          4
        </button>
        <button type="button" className="w-10 h-10 cursor-pointer" role="radio" aria-checked={fontSize === 5} data-value={5} onClick={handleFontSizeClick}>
          5
        </button>
        <button type="button" className="w-10 h-10 cursor-pointer" role="radio" aria-checked={fontSize === 6} data-value={6} onClick={handleFontSizeClick}>
          6
        </button>
      </div>
    </>
  );
}
