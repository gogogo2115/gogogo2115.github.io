"use client";

import { MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { selectSettings, setFontSize, setTheme } from "@/lib/store/slice/settings/settingsSlice";
import { isValidFontSize, isValidTheme } from "@/lib/store/slice/settings/settingsUtils";

export default function SettingsClientPage() {
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const handleThemeClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const value = ev.currentTarget.dataset["value"];
    if (!isValidTheme(value)) return;
    dispatch(setTheme({ value, setStorage: true, updateDocument: true }));
  };

  const handleFontSizeClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const value = ev.currentTarget.dataset["value"];
    if (!isValidFontSize(value)) return;
    dispatch(setFontSize({ value, setStorage: true, updateDocument: true }));
  };

  return (
    <div role="radiogroup">
      <button type="button" role="radio" aria-checked={settings.theme === "dark"} data-value="dark" onClick={handleThemeClick}>
        dark
      </button>
      <button type="button" role="radio" aria-checked={settings.theme === "light"} data-value="light" onClick={handleThemeClick}>
        light
      </button>
      <button type="button" role="radio" aria-checked={settings.theme === "system"} data-value="system" onClick={handleThemeClick}>
        system
      </button>
    </div>
  );
}
