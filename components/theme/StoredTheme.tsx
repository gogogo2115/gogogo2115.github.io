"use client";

import { Fragment, type ReactNode, useRef, useEffect, useCallback } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicEffect";
import { useAppStoreSelector, useAppStoreDispatch } from "@/store";
import { shallowEqual } from "react-redux";
import { appStateActions } from "@/store/modules/appState";

type ColorTheme = "dark" | "light" | "auto" | "gray";
type StoredThemeProps = { children: ReactNode };

const { setTheme } = appStateActions;

export const COLOR_THEME_ARR: ColorTheme[] = ["dark", "light", "auto", "gray"];
const DEFAULT_COLOR_THEME: (typeof COLOR_THEME_ARR)[number] = "auto";

const COLOR_SCHEME_QUERY = {
  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
  /**
   * @deprecated dark 또는 light 값을 사용해주세요
   */
  noPreference: "(prefers-color-scheme: no-preference)",
};

// type ColorThemeObj = Record<ColorTheme, { value: ColorTheme; num: number }>;
// const COLOR_THEME_OBJ: ColorThemeObj = COLOR_THEME_ARR.reduce((acc, curr, index) => {
//   acc[curr] = { value: curr, num: index };
//   return acc;
// }, {} as ColorThemeObj);

const isValidColorTheme = (colorTheme: unknown): boolean => {
  return COLOR_THEME_ARR.includes(String(colorTheme) as ColorTheme);
};

const getPrefersColorScheme = () => {
  const isMatches = window.matchMedia(COLOR_SCHEME_QUERY.dark).matches;
  return isMatches ? "dark" : "light";
};

const resolveAutoColorTheme = (colorTheme: ColorTheme): ColorTheme => {
  return colorTheme === "auto" ? getPrefersColorScheme() : colorTheme;
};

const onColorSchemeEvent = (e: MediaQueryListEvent) => {
  const changeTheme = e.matches ? "dark" : "light";
  const bodyDataSetTheme = document.body.dataset[DATASET_NAME];
  if (bodyDataSetTheme !== changeTheme) {
    document.body.dataset[DATASET_NAME] = changeTheme;
  }
};

const STORED_NAME = "theme";
const DATASET_NAME = "theme";

export const useApplyTheme = () => {
  const currTheme = useAppStoreSelector(({ appState }) => appState.theme, shallowEqual) as ColorTheme | undefined;
  const dispatch = useAppStoreDispatch();

  const applyColorTheme = useCallback(
    (colorTheme: ColorTheme) => {
      if (currTheme === colorTheme) return;
      const isColorThemeCheck = isValidColorTheme(colorTheme);

      const toSaveColorTheme = isColorThemeCheck ? colorTheme : DEFAULT_COLOR_THEME;
      const toDataSetColorTheme = resolveAutoColorTheme(toSaveColorTheme);

      window.localStorage.setItem(STORED_NAME, toSaveColorTheme);
      document.body.dataset[DATASET_NAME] = toDataSetColorTheme;
      dispatch(setTheme(toSaveColorTheme));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currTheme]
  );
  return { currTheme, applyColorTheme };
};

const StoredTheme = (props: StoredThemeProps) => {
  const { children } = props;
  const currTheme = useAppStoreSelector(({ appState }) => appState.theme, shallowEqual);
  const dispatch = useAppStoreDispatch();

  useIsomorphicLayoutEffect(() => {
    const storedTheme = (window.localStorage?.getItem(STORED_NAME) ?? "").toLowerCase().trim();
    const isColorThemeCheck = isValidColorTheme(storedTheme);

    const toSaveColorTheme = isColorThemeCheck ? (storedTheme as ColorTheme) : DEFAULT_COLOR_THEME;
    const toDataSetColorTheme = resolveAutoColorTheme(toSaveColorTheme);

    if (!isColorThemeCheck) {
      window.localStorage.setItem(STORED_NAME, toSaveColorTheme);
    }

    const bodyDataSetTheme = document.body.dataset[DATASET_NAME];
    if (bodyDataSetTheme !== toDataSetColorTheme) {
      document.body.dataset[DATASET_NAME] = toDataSetColorTheme;
    }

    dispatch(setTheme(toSaveColorTheme));
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (currTheme !== "auto") return;
    const darkColorScheme = window.matchMedia(COLOR_SCHEME_QUERY.dark);

    darkColorScheme.addEventListener("change", onColorSchemeEvent);
    return () => darkColorScheme.removeEventListener("change", onColorSchemeEvent);
  }, [currTheme]);

  useIsomorphicLayoutEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      const { key, newValue, type } = e;
      if (key !== STORED_NAME && type !== "storage") return;
      const isColorThemeCheck = isValidColorTheme(newValue);
      const toSaveColorTheme = (isColorThemeCheck ? newValue : DEFAULT_COLOR_THEME) as ColorTheme;
      const toDataSetColorTheme = resolveAutoColorTheme(toSaveColorTheme);

      if (!isColorThemeCheck) {
        window.localStorage.setItem(STORED_NAME, toSaveColorTheme);
      }

      const getBodyDataSetTheme = document.body.dataset[DATASET_NAME];
      if (getBodyDataSetTheme !== toDataSetColorTheme) {
        document.body.dataset[DATASET_NAME] = toDataSetColorTheme;
      }

      dispatch(setTheme(toSaveColorTheme));
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, []);

  return <Fragment key="StoredTheme">{children}</Fragment>;
};

export default StoredTheme;
