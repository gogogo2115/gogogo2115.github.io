"use client";

import { MouseEvent } from "react";
import { useAppDispatch } from "@/lib/store";
import { setTheme } from "@/lib/store/slice/settings/settingsSlice";
import { isValidTheme } from "@/lib/store/slice/settings/settingsUtils";

export default function SettingsPage() {
  const dispatch = useAppDispatch();

  const handleTheme = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const dataTheme = ev.currentTarget.getAttribute("data-setting-theme");
    if (!isValidTheme(dataTheme)) return;
    dispatch(setTheme({ value: dataTheme, setStorage: true, updateDocument: true }));
  };

  return (
    <>
      <div className="flex flex-row gap-1">
        <button type="button" className="cursor-pointer align-middle select-none" data-setting-theme="light" onClick={handleTheme}>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-ful border-[2px] border-gray-700 box-border">
            <div className="relative overflow-hidden w-full h-full bg-white">
              <div className="absolute bottom-2 right-2 text-black font-medium text-xs select-none">Aa</div>
            </div>
          </div>
        </button>

        <button type="button" className="cursor-pointer align-middle select-none" data-setting-theme="dark" onClick={handleTheme}>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-full border-[2px] border-gray-700 box-border">
            <div className="relative overflow-hidden w-full h-full bg-black">
              <div className="absolute bottom-2 right-2 text-white font-medium text-xs select-none">Aa</div>
            </div>
          </div>
        </button>

        <button type="button" className="cursor-pointer align-middle select-none" data-setting-theme="system" onClick={handleTheme}>
          <div className="rounded-2xl overflow-hidden aspect-[4/3] min-w-[100px] max-w-[120px] w-full border-[2px] border-gray-700 box-border flex flex-row">
            <div className="relative overflow-hidden w-1/2 h-full bg-white">
              <div className="absolute bottom-2 right-2 text-black font-medium text-xs select-none">Aa</div>
            </div>
            <div className="relative overflow-hidden w-1/2 h-full bg-black">
              <div className="absolute bottom-2 right-2 text-white font-medium text-xs select-none">Aa</div>
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
