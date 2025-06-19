"use client";

import { type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { selectSettings, setFontSize, setTheme } from "@/lib/store/slice/settings/settingsSlice";
import { isValidFontSize, isValidTheme, VALID_FONT_SIZES } from "@/lib/store/slice/settings/settingsUtils";

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
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={settings.theme === "dark"} data-value="dark" onClick={handleThemeClick}>
          dark
        </button>
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={settings.theme === "light"} data-value="light" onClick={handleThemeClick}>
          light
        </button>
        <button type="button" className="cursor-pointer select-none" role="radio" aria-checked={settings.theme === "system"} data-value="system" onClick={handleThemeClick}>
          system
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
