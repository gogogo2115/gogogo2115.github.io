"use client";
import { Fragment, useCallback, useEffect, useState, type ReactNode } from "react";
import { shallowEqual } from "react-redux";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicEffect";
import { useAppStoreDispatch, useAppStoreSelector } from "@/store";
import { appStateActions, selectAppStateTheme } from "@/store/modules/appState";
import { isClient } from "@/utils";
import usePrevious from "@/hooks/usePrevious";

type ProviderProps = { children: ReactNode };
type ThemeColor = "dark" | "light" | "system" | "gray";

const { setTheme } = appStateActions;

const STORAGE_NAME = "theme";
const DATASET_NAME = "theme";

const THEME_COLOR_ARR: ThemeColor[] = ["dark", "light", "system", "gray"];
const DEFAULT_THEME_COLOR: (typeof THEME_COLOR_ARR)[number] | ThemeColor = "system";

const COLOR_SCHEME_QUERY = {
  dark: "(prefers-color-scheme: dark)",
  light: "(prefers-color-scheme: light)",
  /**
   * @deprecated dark 또는 light 값을 사용해주세요
   */
  // noPreference: "(prefers-color-scheme: no-preference)",
};

const isValidateThemeColor = (theme: unknown): theme is ThemeColor => THEME_COLOR_ARR.includes(theme as ThemeColor);

const getSystemThemeColor = (): ThemeColor => (window.matchMedia(COLOR_SCHEME_QUERY.dark).matches ? "dark" : "light");

// const useStorageThemeChangeListener = (currTheme: ThemeColor, dispatch: ReturnType<typeof useAppStoreDispatch>) => {};

const StorageThemeProvider = ({ children }: ProviderProps) => {
  const currTheme = useAppStoreSelector(selectAppStateTheme, shallowEqual) as ThemeColor;
  const dispatch = useAppStoreDispatch();

  // 초기랜더링
  useIsomorphicLayoutEffect(() => {
    if (!isClient) return;
    const storageTheme = (window.localStorage.getItem(STORAGE_NAME) ?? "").toLowerCase() as ThemeColor;
    const isThemeColor = isValidateThemeColor(storageTheme);

    const toStorageTheme = isThemeColor ? storageTheme : DEFAULT_THEME_COLOR;
    const toDatasetTheme = toStorageTheme === "system" ? getSystemThemeColor() : toStorageTheme;

    // console.log({ storageTheme, isThemeColor, toStorageTheme, toDatasetTheme });

    // storage가 존재하지 않거나 틀린값을 가지고 있으므로 새로운 값으로 입력
    !isThemeColor && window.localStorage.setItem(STORAGE_NAME, toStorageTheme);

    // body의 dataset["theme"]의 값이 일치하지 않을때 새로운 값으로 갱신
    document.body.dataset[DATASET_NAME] !== toDatasetTheme && (document.body.dataset[DATASET_NAME] = toDatasetTheme);

    dispatch(setTheme(toStorageTheme));

    return () => {};
  }, []);

  // theme가 system일때 운영체제(window, mac)의 테마가 변경이 일어날때
  useEffect(() => {
    if (currTheme !== "system") return;

    const onChangeColorScheme = (e: MediaQueryListEvent) => {
      const changeColorTheme = e.matches ? "dark" : "light";

      if (document.body.dataset[DATASET_NAME] !== changeColorTheme) {
        document.body.dataset[DATASET_NAME] = changeColorTheme;
      }
    };

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY.dark);
    mediaQuery.addEventListener("change", onChangeColorScheme);
    return () => mediaQuery.removeEventListener("change", onChangeColorScheme);
  }, [currTheme]);

  // localStorage가 변경이 일어날때
  useEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.key !== STORAGE_NAME) return;
      const isThemeColor = isValidateThemeColor(e.newValue);
      const toStorageTheme = isThemeColor ? (e.newValue as ThemeColor) : DEFAULT_THEME_COLOR;
      const toDatasetTheme = toStorageTheme === "system" ? getSystemThemeColor() : toStorageTheme;

      !isThemeColor && window.localStorage.setItem(STORAGE_NAME, toStorageTheme);
      document.body.dataset[DATASET_NAME] !== toDatasetTheme && (document.body.dataset[DATASET_NAME] = toDatasetTheme);

      dispatch(setTheme(toStorageTheme));
    };

    window.addEventListener("storage", onStorageChange);
    return () => window.removeEventListener("storage", onStorageChange);
  }, [dispatch]);

  return <Fragment key={"StorageThemeProvider"}>{children}</Fragment>;
};

export default StorageThemeProvider;

export const useStorageTheme = () => {
  const currTheme = useAppStoreSelector(selectAppStateTheme, shallowEqual) as ThemeColor;
  const dispatch = useAppStoreDispatch();
  const [dataset, setDataset] = useState(currTheme === "system" ? getSystemThemeColor() : currTheme);

  useEffect(() => {
    if (currTheme !== "system") return;
    const onChangeColorScheme = (e: MediaQueryListEvent) => {
      const changeColorTheme = e.matches ? "dark" : "light";
      if (document.body.dataset[DATASET_NAME] !== changeColorTheme) {
        document.body.dataset[DATASET_NAME] = changeColorTheme;
      }
      setDataset(changeColorTheme);
    };

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY.dark);
    mediaQuery.addEventListener("change", onChangeColorScheme);
    return () => mediaQuery.removeEventListener("change", onChangeColorScheme);
  }, [currTheme]);

  const applyTheme = useCallback(
    (themeColor: ThemeColor) => {
      if (currTheme === themeColor || !isValidateThemeColor(themeColor)) return;
      const toDatasetTheme = themeColor === "system" ? getSystemThemeColor() : themeColor;
      document.body.dataset.theme = toDatasetTheme;
      window.localStorage.setItem(STORAGE_NAME, themeColor);
      setDataset(toDatasetTheme);
      dispatch(setTheme(themeColor));
    },
    [currTheme, dispatch]
  );

  return { curr: { theme: currTheme, dataset }, applyTheme };
};
