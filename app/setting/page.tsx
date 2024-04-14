"use client";

import { BUILD_HASH, BUILD_AT } from "@/utils/index";
import { MouseEvent } from "react";

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

  const onClickThemeBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const value = target.value;
    const dataTheme = target.dataset["theme"];
    alert(dataTheme);
  };

  return (
    <div>
      <div>
        <button type="button" data-theme="dark" value={"dark"} onClick={onClickThemeBtn} title="">
          다크
        </button>
        <button type="button" data-theme="light" value={"light"} onClick={onClickThemeBtn} title="">
          라이트
        </button>
        <button type="button" data-theme="system" value={"system"} onClick={onClickThemeBtn} title="">
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
