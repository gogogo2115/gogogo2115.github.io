"use client";

import { useAppDispatch } from "@/lib/store";
import { setTheme } from "@/lib/store/slice/settings/settingsSlice";
import { isValidTheme } from "@/lib/store/slice/settings/settingsUtils";
import { MouseEvent } from "react";

export default function SettingsPage() {
  const dispatch = useAppDispatch();

  const handleThemeChange = (ev: MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    const target = ev.currentTarget;
    const theme = target.dataset["theme"] ?? "";
    if (isValidTheme(theme)) {
      dispatch(setTheme({ value: theme, updateDocument: true, saveStorage: true }));
    }
  };

  return (
    <div>
      <button onClick={handleThemeChange} data-theme="dark">
        dark
      </button>
      /
      <button onClick={handleThemeChange} data-theme="light">
        light
      </button>
      /
      <button onClick={handleThemeChange} data-theme="system">
        system
      </button>
    </div>
  );
}
