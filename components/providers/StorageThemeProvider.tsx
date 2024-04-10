"use client";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicEffect";
import { useAppStoreDispatch, useAppStoreSelector } from "@/store";
import { appStateActions, selectAppStateTheme } from "@/store/modules/appState";
import { Fragment, useCallback, type ReactNode } from "react";
import { shallowEqual } from "react-redux";

type ProviderProps = {
  children: ReactNode;
};

const { setTheme } = appStateActions;

export type ThemeColor = "dark" | "light" | "system" | "gray";
type ThemeColorObj = Record<ThemeColor, { value: ThemeColor; num: number }>;

const THEME_COLOR_ARR: ThemeColor[] = ["dark", "light", "system", "gray"];
export const DEFAULT_THEME_COLOR: (typeof THEME_COLOR_ARR)[number] = "system";

const THEME_COLOR_OBJ: ThemeColorObj = THEME_COLOR_ARR.reduce((acc, curr, index) => {
  acc[curr] = { value: curr, num: index };
  return acc;
}, {} as ThemeColorObj);

const STORAGE_NAME = "theme";
const DATASET_NAME = "theme";

const isValidThemeColor = (theme?: string) => {
  return THEME_COLOR_ARR.includes(theme as ThemeColor);
};

const COLOR_SCHEME_QUERY = {
  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
  /**
   * @deprecated dark 또는 light 값을 사용해주세요
   */
  noPreference: "(prefers-color-scheme: no-preference)",
};

// const getPrefersColorScheme = () => {
//   const isMatches = window.matchMedia("(prefers-color-scheme: dark)").matches;
//   const { dark, light } = COLOR_THEME_OBJ;
//   return isMatches ? dark.value : light.value;
// };

// const resolveSystemThemeColor = (themeColor: ThemeColor): ThemeColor => {
//   return themeColor === "system" ? getPrefersColorScheme() : themeColor;
// };

const StorageThemeProvider = ({ children }: ProviderProps) => {
  const currTheme = useAppStoreSelector(selectAppStateTheme, shallowEqual) as ThemeColor;

  useIsomorphicLayoutEffect(() => {
    if (currTheme !== "system") return;
    const darkColorScheme = window.matchMedia(COLOR_SCHEME_QUERY.dark);
  }, [currTheme]);

  return <Fragment key={"StorageThemeProvider"}>{children}</Fragment>;
};

export const useStorageTheme = () => {
  const currTheme = useAppStoreSelector(selectAppStateTheme, shallowEqual);
  const dispatch = useAppStoreDispatch();

  const applyTheme = useCallback(
    (themeColor: ThemeColor) => {
      if (currTheme === themeColor) return;
      dispatch(setTheme(themeColor));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currTheme]
  );

  return { currTheme, applyTheme };
};

export default StorageThemeProvider;
