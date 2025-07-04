"use client";

import { useAppSelector } from "@/lib/store";
import { selectSettings } from "@/lib/store/slice/settings/settingsSlice";
import { DEFAULT_FONT_SIZE, DEFAULT_KEY, DEFAULT_THEME, VALID_FONT_SIZES, VALID_THEMES } from "@/lib/store/slice/settings/settingsUtils";
import { useLayoutEffect } from "react";

const vt = JSON.stringify([...VALID_THEMES]);
const vf = JSON.stringify([...VALID_FONT_SIZES]);
const dk = `"${DEFAULT_KEY}"`;
const dt = `"${DEFAULT_THEME}"`;
const df = `"${DEFAULT_FONT_SIZE}"`;

const dangerouslyScript = `((vt,vf,dk,dt,df)=>{try{const s=(()=>{try{if(typeof window==="undefined"||!("localStorage"in window))return{theme:dt,fontSize:df};const r=(localStorage.getItem(dk)||"").trim(),j=r?JSON.parse(r):{};if(!j||typeof j!=="object"||Array.isArray(j))return{theme:dt,fontSize:df};const t=String(j.theme).toLowerCase().trim(),f=Number(j.fontSize);return{theme:vt.includes(t)?t:dt,fontSize:Number.isFinite(f)?Math.max(Math.min(...vf),Math.min(Math.max(...vf),Math.floor(f))):df};}catch{return{theme:dt,fontSize:df};}})(),e=s.theme==="system"?("matchMedia"in window&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s.theme,d=document.documentElement;d.setAttribute("data-theme",e);d.style.colorScheme=["dark","gray"].includes(e)?"dark":"light";}catch{}})(${vt},${vf},${dk},${dt},${df})`;

export default function SettingsScript() {
  const settings = useAppSelector(selectSettings);

  useLayoutEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window) || settings.theme !== "system") return;

    const handleMediaQueryChange = (ev: MediaQueryListEvent) => {
      const systemTheme = ev.matches ? "dark" : "light";
      const de = document.documentElement;
      de.setAttribute("data-theme", systemTheme);
      de.style.colorScheme = systemTheme;
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, [settings.theme]);

  return <script id="SettingsScript" key="SettingsScript" dangerouslySetInnerHTML={{ __html: dangerouslyScript }} />;
}
