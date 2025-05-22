/* eslint-disable @next/next/no-sync-scripts */
"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { selectSettings } from "@/lib/store/slice/settings/settingsSlice";
import { DEFAULT_KEY_NAME } from "@/lib/store/slice/settings/settingsUtils";
import { useLayoutEffect } from "react";

export function SettingsScript() {
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !("localStorage" in window)) return;

    const handleStorageChange = (ev: StorageEvent) => {
      if (ev.key !== DEFAULT_KEY_NAME) return;
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window) || settings.theme !== "system") return;

    const handleMediaQueryChange = (ev: MediaQueryListEvent) => {
      const systemTheme = ev.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", systemTheme);
      document.documentElement.style.colorScheme = systemTheme;
    };

    const query = "(prefers-color-scheme: dark)";
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, [settings.theme]);

  return <script key="SettingsScript" id="SettingsScript" dangerouslySetInnerHTML={{ __html: `` }} />;
}
