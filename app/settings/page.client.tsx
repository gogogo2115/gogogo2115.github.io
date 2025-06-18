"use client";

import { type MouseEvent } from "react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { selectSettings, setTheme } from "@/lib/store/slice/settings/settingsSlice";
import { isValidTheme } from "@/lib/store/slice/settings/settingsUtils";

const SettingsClientComponent = () => {
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const handleThemeClick = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const value = ev.currentTarget.dataset["value"];
    if (!value || !isValidTheme(value)) return;
    dispatch(setTheme({ value, setStorage: true, updateDocument: true }));
  };

  return (
    <div role="radiogroup">
      <button type="button" className="cursor-pointer" role="radio" aria-checked={settings.theme === "dark"} data-value="dark" onClick={handleThemeClick}>
        dark
      </button>
      <button type="button" className="cursor-pointer" role="radio" aria-checked={settings.theme === "light"} data-value="light" onClick={handleThemeClick}>
        light
      </button>
      <button type="button" className="cursor-pointer" role="radio" aria-checked={settings.theme === "system"} data-value="system" onClick={handleThemeClick}>
        system
      </button>
    </div>
  );
};

const SettingsClientPage = dynamic(async () => SettingsClientComponent, { ssr: false });
export default SettingsClientPage;
