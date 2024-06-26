"use client";

import { MouseEvent, Suspense, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useStorageTheme } from "./providers/StorageThemeProvider";

const StyledMaintenance = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const fetchData = () => {
  return new Promise((resolve) => setTimeout(() => resolve("World!"), 2000));
};

const AsyncDataFetcher = () => {
  const dataPromise = fetchData();
  return <>{dataPromise}</>;
};

const Maintenance = () => {
  const { applyTheme } = useStorageTheme();

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
    <StyledMaintenance id="Maintenance">
      <div>
        Hello{" "}
        <Suspense fallback="...">
          <AsyncDataFetcher />
        </Suspense>
      </div>

      <div>준비중입니다. </div>

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
      </div>
    </StyledMaintenance>
  );
};

export default Maintenance;
