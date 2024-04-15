"use client";

import { useStorageTheme } from "@/components/providers/StorageThemeProvider";
import { BUILD_HASH, BUILD_AT } from "@/utils/index";
import { MouseEvent, useCallback } from "react";

const SettingPage = () => {
  const utcDate = new Date(BUILD_AT);
  const BUILD_AT_KR = utcDate.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "long",
  });

  const { curr, applyTheme } = useStorageTheme();

  console.log("setting page", curr);

  const onClickThemeBtn = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const target = e.currentTarget;
      const theme = target.dataset["theme"] || target.value;
      applyTheme(theme as "dark" | "light" | "system");
    },
    [applyTheme]
  );

  return (
    <div>
      <div>
        <button type="button" data-theme="dark" value={"dark"} onClick={onClickThemeBtn} title="다크 테마" aria-label="다크 테마">
          다크
        </button>
        <button type="button" data-theme="light" value={"light"} onClick={onClickThemeBtn} title="라이트 테마" aria-label="다크 테마">
          라이트
        </button>
        <button type="button" data-theme="system" value={"system"} onClick={onClickThemeBtn} title="시스템 테마" aria-label="다크 테마">
          시스템
        </button>

        <ul>
          <li>build hash : {BUILD_HASH}</li>
          <li>build date : {BUILD_AT_KR}</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingPage;
