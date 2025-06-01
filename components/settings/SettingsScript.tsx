/* eslint-disable @next/next/no-sync-scripts */
"use client";

import { DEFAULT_FONT_SIZE, DEFAULT_KEY, DEFAULT_THEME, VALID_FONT_SIZES, VALID_THEMES } from "@/lib/store/slice/settings/settingsUtils";

const vt = JSON.stringify([...VALID_THEMES]);
const vf = JSON.stringify([...VALID_FONT_SIZES]);
const dk = `"${DEFAULT_KEY}"`;
const dt = `"${DEFAULT_THEME}"`;
const df = `"${DEFAULT_FONT_SIZE}"`;
const setInnerScript = `((vt,vf,dk,dt,df)=>{try{const s=(()=>{try{const r=(localStorage.getItem(dk)??"").trim(),j=r?JSON.parse(r):{},t=String(j.theme).toLowerCase().trim(),f=Number(j.fontSize);return{theme:vt.includes(t)?t:dt,fontSize:isNaN(f)?df:Math.max(Math.min(...vf),Math.min(Math.max(...vf),Math.floor(f)))};}catch{return{theme:dt,fontSize:df};}})(),e=s.theme==="system"?("matchMedia"in window&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):s.theme,d=document.documentElement;d.setAttribute("data-theme",e);d.style.colorScheme=["dark","gray"].includes(e)?"dark":"light";}catch{}})(${vt},${vf},${dk},${dt},${df});`;

export function SettingsScript() {
  return <script key="SettingsScript" id="SettingsScript" dangerouslySetInnerHTML={{ __html: setInnerScript }} />;
}
