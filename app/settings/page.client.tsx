"use client";

import { type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { selectSettings, setFontSize, setTheme } from "@/lib/store/slice/settings/settingsSlice";
import { isValidFontSize, isValidTheme } from "@/lib/store/slice/settings/settingsUtils";

const SettingsClientComponent = () => {
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const handleThemeClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const value = ev.currentTarget.dataset["value"];
    if (!value || !isValidTheme(value)) return;
    dispatch(setTheme({ value, setStorage: true, updateDocument: true }));
  };

  const handleFontSizeClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const value = ev.currentTarget.dataset["value"];
    if (!value || !isValidFontSize(value)) return;
    dispatch(setFontSize({ value, setStorage: true, updateDocument: true }));
  };

  return (
    <>
      <div role="radiogroup">
        <button type="button" className="cursor-pointer select-none align-middle" role="radio" aria-checked={settings.theme === "dark"} onClick={handleThemeClick} data-value="dark">
          <div className="relative overflow-hidden rounded-2xl min-w-28 max-w-36 w-full aspect-[4/3] bg-black block border-[2px] border-gray-500">
            <div className="absolute top-2 left-2 text-white font-black text-base select-none">가</div>
          </div>
        </button>

        <button type="button" className="cursor-pointer select-none align-middle" role="radio" aria-checked={settings.theme === "light"} onClick={handleThemeClick} data-value="light">
          <div className="relative overflow-hidden rounded-2xl min-w-28 max-w-36 w-full aspect-[4/3] bg-white block border-[2px] border-gray-500">
            <div className="absolute top-2 left-2 text-black font-black text-base select-none">가</div>
          </div>
        </button>

        <button type="button" className="cursor-pointer select-none align-middle" role="radio" aria-checked={settings.theme === "system"} onClick={handleThemeClick} data-value="system">
          <div className="relative overflow-hidden rounded-2xl min-w-28 max-w-36 w-full aspect-[4/3] block border-[2px] border-gray-500">
            <div className="absolute inset-0 flex flex-row">
              <div className="relative bg-black w-1/2">
                <div className="absolute top-2 left-2 text-white font-black text-base select-none">가</div>
              </div>
              <div className="relative bg-white w-1/2">
                <div className="absolute top-2 left-2 text-black font-black text-base select-none">가</div>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div role="radiogroup">
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={settings.fontSize === 1} data-value={1} onClick={handleFontSizeClick}>
          1
        </button>
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={settings.fontSize === 2} data-value={2} onClick={handleFontSizeClick}>
          2
        </button>
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={settings.fontSize === 3} data-value={3} onClick={handleFontSizeClick}>
          3
        </button>
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={settings.fontSize === 4} data-value={4} onClick={handleFontSizeClick}>
          4
        </button>
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={settings.fontSize === 5} data-value={5} onClick={handleFontSizeClick}>
          5
        </button>
      </div>
    </>
  );
};

const SettingsClientPage = dynamic(async () => SettingsClientComponent, { ssr: false });
export default SettingsClientPage;
