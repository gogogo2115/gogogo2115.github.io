"use client";

import { MouseEvent, useCallback, useState } from "react";
import classNames from "classnames";

import { BUILD_HASH, BUILD_AT, isNavigator } from "@/utils/index";

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

  // console.log("setting page", curr);

  const onClickThemeBtn = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const theme = target.dataset["theme"] || target.value;
    isNavigator && "vibrate" in navigator && navigator.vibrate(500);
  }, []);

  return (
    <div>
      <div>
        <button type="button" className={classNames([])} data-theme="dark" value={"dark"} onClick={onClickThemeBtn} title="다크 테마" aria-label="다크 테마">
          다크
        </button>
        <button type="button" className={classNames([])} data-theme="light" value={"light"} onClick={onClickThemeBtn} title="라이트 테마" aria-label="라이트 테마">
          라이트
        </button>
        <button type="button" className={classNames([])} data-theme="system" value={"system"} onClick={onClickThemeBtn} title="시스템 테마" aria-label="시스템 테마">
          시스템
        </button>
      </div>
      <div>
        <ul>
          <li>build hash : {BUILD_HASH}</li>
          <li>build date : {BUILD_AT_KR}</li>
        </ul>
      </div>
    </div>
  );
};

export default SettingPage;
