"use client";

import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { selectSettings, setFontSize, setTheme } from "@/lib/store/slice/settings/settingsSlice";
import { isValidFontSize, isValidTheme } from "@/lib/store/slice/settings/settingsUtils";

export default function SettingsPage() {
  const settings = useAppSelector(selectSettings);
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
      <div role="radiogroup" aria-label="테마 선택" className="flex flex-row gap-1">
        <button
          type="button"
          role="radio"
          aria-checked={settings.theme === "light"}
          aria-label="라이트 테마"
          className="cursor-pointer align-middle select-none"
          data-value="light"
          onClick={handleThemeClick}
        >
          <div className="rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-full border-[2px] border-gray-700 box-border">
            <div className="relative overflow-hidden w-full h-full bg-white">
              <div className="absolute top-2 left-2 text-black font-medium text-xs select-none">Aa</div>
            </div>
          </div>

          <div>밝은 배경</div>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={settings.theme === "dark"}
          aria-label="다크 테마"
          className="cursor-pointer align-middle select-none"
          data-value="dark"
          onClick={handleThemeClick}
        >
          <div className="rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-full border-[2px] border-gray-700 box-border">
            <div className="relative overflow-hidden w-full h-full bg-black">
              <div className="absolute top-2 left-2 text-white font-medium text-xs select-none">Aa</div>
            </div>
          </div>
          <div>어두운 배경</div>
        </button>

        <button
          type="button"
          role="radio"
          aria-checked={settings.theme === "system"}
          aria-label="시스템 테마"
          className="cursor-pointer align-middle select-none"
          data-value="system"
          onClick={handleThemeClick}
        >
          <div className="rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-full border-[2px] border-gray-700 box-border flex flex-row">
            <div className="relative overflow-hidden w-1/2 h-full bg-white">
              <div className="absolute top-2 left-2 text-black font-medium text-xs select-none">Aa</div>
            </div>
            <div className="relative overflow-hidden w-1/2 h-full bg-black">
              <div className="absolute top-2 left-2 text-white font-medium text-xs select-none">Aa</div>
            </div>
          </div>
          <div>사용자 배경</div>
        </button>
      </div>

      {/* <div role="radiogroup">
        <button type="button" className="" role="radio" aria-checked={settings.fontSize === 1} data-value="1" onClick={handleFontSizeClick}>
          1
        </button>
        <button type="button" className="" role="radio" aria-checked={settings.fontSize === 2} data-value="2" onClick={handleFontSizeClick}>
          2
        </button>
        <button type="button" className="" role="radio" aria-checked={settings.fontSize === 3} data-value="3" onClick={handleFontSizeClick}>
          3
        </button>
        <button type="button" className="" role="radio" aria-checked={settings.fontSize === 4} data-value="4" onClick={handleFontSizeClick}>
          4
        </button>
        <button type="button" className="" role="radio" aria-checked={settings.fontSize === 5} data-value="5" onClick={handleFontSizeClick}>
          5
        </button>
        <button type="button" className="" role="radio" aria-checked={settings.fontSize === 6} data-value="6" onClick={handleFontSizeClick}>
          6
        </button>
      </div> */}
    </>
  );
}
