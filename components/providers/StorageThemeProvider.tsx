"use client";
import { Fragment, useCallback, type ReactNode } from "react";
import { shallowEqual } from "react-redux";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicEffect";
import { useAppStoreDispatch, useAppStoreSelector } from "@/store";
import { appStateActions, selectAppStateTheme } from "@/store/modules/appState";
import { isClient } from "@/utils";
import usePrevious from "@/hooks/usePrevious";

type ProviderProps = {
  children: ReactNode;
};

const { setTheme } = appStateActions;

export type ThemeColor = "dark" | "light" | "system" | "gray";
type ThemeColorObj = Record<ThemeColor, { value: ThemeColor; num: number }>;

const STORAGE_NAME = "theme";
const DATASET_NAME = "theme";

const THEME_COLOR_ARR: ThemeColor[] = ["dark", "light", "system", "gray"];
export const DEFAULT_THEME_COLOR: (typeof THEME_COLOR_ARR)[number] = "system";

export const THEME_COLOR_OBJ: ThemeColorObj = THEME_COLOR_ARR.reduce((acc, curr, index) => {
  acc[curr] = { value: curr, num: index };
  return acc;
}, {} as ThemeColorObj);

const COLOR_SCHEME_QUERY = {
  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",

  /**
   * @deprecated dark 또는 light 값을 사용해주세요
   */
  noPreference: "(prefers-color-scheme: no-preference)",
};

const isValidThemeColor = (theme: unknown): boolean => {
  return THEME_COLOR_ARR.includes(theme as ThemeColor);
};

const getPrefersColorScheme = () => {
  const isMatches = window.matchMedia(COLOR_SCHEME_QUERY.dark).matches;
  return isMatches ? "dark" : "light";
};

const resolveSystemThemeColor = (themeColor: ThemeColor): ThemeColor => {
  return themeColor === "system" ? getPrefersColorScheme() : themeColor;
};

const onStorageChange = (e: StorageEvent) => {
  // const { key, newValue, type } = e;
  if (e.key !== STORAGE_NAME && e.type !== "storage") return;
  return;
};

const onChangeColorScheme = (e: MediaQueryListEvent) => {
  const changeColorTheme = e.matches ? "dark" : "light";
  document.body.dataset[DATASET_NAME] !== changeColorTheme && (document.body.dataset[DATASET_NAME] = changeColorTheme);
  return;
};

const StorageThemeProvider = ({ children }: ProviderProps) => {
  const currTheme = useAppStoreSelector(selectAppStateTheme, shallowEqual) as ThemeColor;
  const dispatch = useAppStoreDispatch();

  // 초기랜더링
  useIsomorphicLayoutEffect(() => {
    if (!isClient) return;
    const storageTheme = (window.localStorage.getItem(STORAGE_NAME) ?? "").toLowerCase() as ThemeColor;
    const isThemeColor = isValidThemeColor(storageTheme);

    const toStorageTheme = isThemeColor ? (storageTheme as ThemeColor) : DEFAULT_THEME_COLOR;
    const toDatasetTheme = resolveSystemThemeColor(toStorageTheme);

    document.body.dataset[DATASET_NAME] !== toDatasetTheme && (document.body.dataset[DATASET_NAME] = toDatasetTheme);
    dispatch(setTheme(toStorageTheme));

    return () => {};
  }, []);

  // theme가 system일때 운영체제(window, mac)의 테마가 변경이 일어날때
  useIsomorphicLayoutEffect(() => {
    if (currTheme !== "system") return;
    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY.dark);
    mediaQuery.addEventListener("change", onChangeColorScheme);
    return () => mediaQuery.removeEventListener("change", onChangeColorScheme);
  }, [currTheme]);

  // localStorage가 변경이 일어날때
  useIsomorphicLayoutEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.type !== "storage" && e.key !== STORAGE_NAME) return;
      const isThemeColor = isValidThemeColor(e.newValue);
      const toStorageTheme = (isThemeColor ? e.newValue : DEFAULT_THEME_COLOR) as ThemeColor;
      const toDatasetTheme = resolveSystemThemeColor(toStorageTheme);
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return <Fragment key={"StorageThemeProvider"}>{children}</Fragment>;
};

export const useStorageTheme = () => {
  const currTheme = useAppStoreSelector(selectAppStateTheme, shallowEqual);
  const prevTheme = usePrevious(currTheme);
  const dispatch = useAppStoreDispatch();

  const applyTheme = useCallback(
    (themeColor: ThemeColor) => {
      if (currTheme === themeColor) return;
      dispatch(setTheme(themeColor));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currTheme]
  );

  return { currTheme, prevTheme, applyTheme };
};

export default StorageThemeProvider;
