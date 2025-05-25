/* eslint-disable @next/next/no-sync-scripts */
"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { selectSettings, setSettings } from "@/lib/store/slice/settings/settingsSlice";
import { DEFAULT_FONT_SIZE, DEFAULT_KEY_NAME, DEFAULT_SETTINGS, DEFAULT_THEME, isValidSettings, VALID_FONT_SIZES, VALID_THEMES } from "@/lib/store/slice/settings/settingsUtils";
import { useLayoutEffect } from "react";

const vt = JSON.stringify([...VALID_THEMES]);
const vf = JSON.stringify([...VALID_FONT_SIZES]);
const dn = `"${DEFAULT_KEY_NAME}"`;
const dt = `"${DEFAULT_THEME}"`;
const df = `"${DEFAULT_FONT_SIZE}"`;
const setInnerScript = `((vt,vf,dn,dt,df)=>{try{const gs=()=>{try{const rw=(window.localStorage.getItem(dn)??"").trim(),s=rw?JSON.parse(rw.trim()):{},t=String(s.theme).toLowerCase().trim(),f=Number(s.fontSize);return{theme:vt.includes(t)?t:dt,fontSize:isNaN(f)?df:Math.max(Math.min(...vf),Math.min(Math.max(...vf),Math.floor(f)))}}catch{return{theme:dt,fontSize:df}}};const st=gs(),et=st.theme==="system"?("matchMedia"in window&&window.matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"):st.theme,dk=et==="dark"||et==="gray",de=document.documentElement;de.setAttribute("data-theme",et);de.style.colorScheme=dk?"dark":"light"}catch(e){}})(${vt},${vf},${dn},${dt},${df});`;

export function SettingsScript() {
  const settings = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  // localStorage 변경때 적용
  useLayoutEffect(() => {
    if (typeof window === "undefined" || !("localStorage" in window)) return;

    const handleStorageChange = (ev: StorageEvent) => {
      if (ev.key !== DEFAULT_KEY_NAME) return;
      const newValue = ev.newValue ?? "";
      const isValid = isValidSettings(newValue);
      const settingsValue = isValid ? JSON.parse(newValue) : DEFAULT_SETTINGS;
      if (!isValid) {
        dispatch(setSettings({ value: settingsValue, saveStorage: true }));
        return;
      }
      dispatch(setSettings({ value: settingsValue, saveStorage: false }));
      return;
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch]);

  // theme가 system(자동)일떄 테마가 변겅 적용
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
  }, [settings]);

  return <script key="SettingsScript" id="SettingsScript" dangerouslySetInnerHTML={{ __html: setInnerScript }} />;
}
