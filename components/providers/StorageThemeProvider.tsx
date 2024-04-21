"use client";

import { type ReactNode, Fragment, useEffect, useCallback, useState, useLayoutEffect, use } from "react";
import { shallowEqual } from "react-redux";

import { useAppStoreDispatch, useAppStoreSelector } from "@/store";
import { appStateActions, appStateSelectors } from "@/store/modules/appState";
import { isClient } from "@/utils";
import usePrevious from "@/hooks/usePrevious";

//type ModeColor = "system" | "no-preference";
export type ThemeColor = "dark" | "light" | "system" | "gray";
type ThemeValue = Exclude<ThemeColor, "system">;

type ProviderProps = { children: ReactNode; propsTheme?: ThemeColor | string };

const THEME_COLOR_ARR: ThemeColor[] = ["dark", "light", "system", "gray"];
const THEME_VALUE_ARR: ThemeValue[] = ["dark", "light", "gray"];
export const DEFAULT_STORAGE_THEME_COLOR: ThemeColor = "system";
export const DEFAULT_STORAGE_THEME_VALUE: ThemeValue = "light";

export const COLOR_SCHEME_QUERY = {
  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
  /**
   * prefers-color-scheme: no-preference는 사용자가 선호하는 테마를 알리지 않았음을 의미
   * @deprecated 일부 브라우저용이므로 light 값을 사용하여 기본값으로 잡아주는게 좋음
   */
  noPreference: "(prefers-color-scheme: no-preference)",
};

const FRAGMENT_KEY = "StorageThemeProvider";
const STORAGE_NAME = "theme";
const DATASET_NAME = "theme";

export const isValidateThemeColor = (themeColor: unknown): themeColor is ThemeColor => {
  return THEME_COLOR_ARR.includes(themeColor as ThemeColor);
};

export const isValidateThemeValue = (themeValue: unknown): themeValue is ThemeValue => {
  return THEME_VALUE_ARR.includes(themeValue as ThemeValue);
};

export const getSystemColorScheme = (): ThemeValue => {
  if (!isClient) return "light";
  if (window.matchMedia(COLOR_SCHEME_QUERY.noPreference).matches) return "light";
  return window.matchMedia(COLOR_SCHEME_QUERY.dark).matches ? "dark" : "light";
};

export const validateThemeData = (themeColor: unknown) => {
  const isValidTheme = isValidateThemeColor(themeColor);
  const toTheme = isValidTheme ? themeColor : DEFAULT_STORAGE_THEME_COLOR;
  const toValue = toTheme === "system" ? getSystemColorScheme() : toTheme;
  const errTheme = !isValidTheme ? themeColor : undefined;
  return { isValidTheme, toTheme, toValue, errTheme };
};

const { selectTheme } = appStateSelectors;
const { setTheme } = appStateActions;

export default function StorageThemeProvider({ children, propsTheme }: ProviderProps) {
  const { theme: currThemeColor, value: currThemeValue } = useAppStoreSelector(selectTheme, shallowEqual) as { theme: ThemeColor; value: ThemeValue };
  const dispatch = useAppStoreDispatch();

  const onChangeColorScheme = useCallback(
    (event: MediaQueryListEvent) => {
      event.preventDefault();
      const { media, matches } = event;
      const themeValue = (media === COLOR_SCHEME_QUERY.dark && matches ? "dark" : "light") as ThemeValue;

      document.body.dataset[DATASET_NAME] !== themeValue && (document.body.dataset[DATASET_NAME] = themeValue);
      dispatch(setTheme({ theme: "system", value: themeValue }));
    },
    [dispatch]
  );

  const onChangeStorage = useCallback(
    (event: StorageEvent) => {
      event.preventDefault();
      if (event.key !== STORAGE_NAME) return;
      const { isValidTheme, toTheme, toValue } = validateThemeData(event.newValue);

      !isValidTheme && window.localStorage.setItem(STORAGE_NAME, toTheme);
      document.body.dataset[DATASET_NAME] !== toValue && (document.body.dataset[DATASET_NAME] = toValue);
      dispatch(setTheme({ theme: toTheme, value: toValue }));
    },
    [dispatch]
  );

  // 초기 랜더링
  useLayoutEffect(() => {
    const storageTheme = (window.localStorage.getItem("theme") ?? "").toLowerCase();
    const { isValidTheme, toTheme, toValue } = validateThemeData(storageTheme);
    !isValidTheme && window.localStorage.setItem(STORAGE_NAME, toTheme);

    document.body.dataset[DATASET_NAME] !== toValue && (document.body.dataset[DATASET_NAME] = toValue);
    dispatch(setTheme({ theme: toTheme, value: toValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 미디어 테마 변경
  useEffect(() => {
    if (currThemeColor !== "system") return;
    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY.dark);
    mediaQuery.addEventListener("change", onChangeColorScheme);
    return () => mediaQuery.removeEventListener("change", onChangeColorScheme);
  }, [currThemeColor, onChangeColorScheme]);

  // storage 변경
  useEffect(() => {
    window.addEventListener("storage", onChangeStorage);
    return () => window.removeEventListener("storage", onChangeStorage);
  }, [onChangeStorage]);

  return (
    <Fragment key={FRAGMENT_KEY}>
      {/* <script type="text/javascript" id="storageThemeScript" defer async src="/storageTheme.js" /> */}
      {children}
    </Fragment>
  );
}

export const useStorageTheme = () => {
  const { theme: currThemeColor, value: currThemeValue } = useAppStoreSelector(selectTheme, shallowEqual) as { theme: ThemeColor; value: ThemeValue };
  const currTheme = { theme: currThemeColor, value: currThemeValue };
  const prevTheme = usePrevious(currTheme);
  const dispatch = useAppStoreDispatch();

  const applyTheme = useCallback(
    (themeColor: ThemeColor) => {
      const { isValidTheme, toTheme, toValue } = validateThemeData(themeColor);
      if (!isValidTheme || themeColor === currThemeColor) return;
      window.localStorage.setItem(STORAGE_NAME, toTheme);
      document.body.dataset[DATASET_NAME] !== toValue && (document.body.dataset[DATASET_NAME] = toValue);
      dispatch(setTheme({ theme: toTheme, value: toValue }));
    },
    [currThemeColor, dispatch]
  );

  return { currTheme, prevTheme, applyTheme };
};
