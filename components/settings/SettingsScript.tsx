/* eslint-disable @next/next/no-sync-scripts */
"use client";

import { useEffect } from "react";

const setInnerScript = `!(function(){ console.log("!") })()`;

export default function SettingsScript() {
  useEffect(() => {}, []);
  return <script id="SettingsScript" key="SettingsScript" src="/settingsScript.js" />;
}
