"use client";
import { Fragment, useEffect, type ReactNode } from "react";
import { shallowEqual } from "react-redux";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicEffect";
import { useAppStoreDispatch, useAppStoreSelector } from "@/store";
import { appStateActions, selectAppStateTheme } from "@/store/modules/appState";
import { isClient } from "@/utils";

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
    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY.dark);
    mediaQuery.addEventListener("change", onChangeColorScheme);
    return () => mediaQuery.removeEventListener("change", onChangeColorScheme);
  }, [currTheme]);

  // localStorage가 변경이 일어날때
  useEffect(() => {
    const onStorageChange = (e: StorageEvent) => {
      if (e.type !== "storage" && e.key !== STORAGE_NAME) return;
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

// const { setTheme } = appStateActions;

// type ThemeColorObj = Record<ThemeColor, { value: ThemeColor; num: number }>;

// export const THEME_COLOR_OBJ: ThemeColorObj = THEME_COLOR_ARR.reduce((acc, curr, index) => {
//   acc[curr] = { value: curr, num: index };
//   return acc;
// }, {} as ThemeColorObj);

// // const COLOR_SCHEME_QUERY = {
// //   dark: "(prefers-color-scheme: dark)",
// //   light: "(prefers-color-scheme: light)",

// //   /**
// //    * @deprecated dark 또는 light 값을 사용해주세요
// //    */
// //   noPreference: "(prefers-color-scheme: no-preference)",
// // };

// const isValidateThemeColor = (theme: unknown): boolean => {
//   return THEME_COLOR_ARR.includes(theme as ThemeColor);
// };

// const getPrefersColorScheme = () => {
//   const isMatches = window.matchMedia(COLOR_SCHEME_QUERY.dark).matches;
//   return isMatches ? "dark" : "light";
// };

// const resolveSystemThemeColor = (themeColor: ThemeColor): ThemeColor => {
//   return themeColor === "system" ? getPrefersColorScheme() : themeColor;
// };

// const onChangeColorScheme = (e: MediaQueryListEvent) => {
//   const changeColorTheme = e.matches ? "dark" : "light";
//   document.body.dataset[DATASET_NAME] !== changeColorTheme && (document.body.dataset[DATASET_NAME] = changeColorTheme);
//   return;
// };

// const StorageThemeProvider = ({ children }: ProviderProps) => {
//   const currTheme = useAppStoreSelector(selectAppStateTheme, shallowEqual) as ThemeColor;
//   const dispatch = useAppStoreDispatch();

//   useIsomorphicLayoutEffect(() => {
//     const storageTheme = (window.localStorage.getItem(STORAGE_NAME) ?? "").toLowerCase() as ThemeColor;
//     const isThemeColor = isValidateThemeColor(storageTheme);

//     const toStorageTheme = isThemeColor ? storageTheme : DEFAULT_THEME_COLOR;
//     const toDatasetTheme = resolveSystemThemeColor(toStorageTheme);

//     if (!isThemeColor) {
//       window.localStorage.setItem(STORAGE_NAME, toStorageTheme);
//     }

//     if (document.body.dataset[DATASET_NAME] !== toDatasetTheme) {
//       document.body.dataset[DATASET_NAME] = toDatasetTheme;
//     }

//     dispatch(setTheme(toStorageTheme));
//   }, []);

//   useIsomorphicLayoutEffect(() => {
//     if (currTheme !== "system") return;
//     const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY.dark);
//     mediaQuery.addEventListener("change", onChangeColorScheme);
//     return () => mediaQuery.removeEventListener("change", onChangeColorScheme);
//   }, [currTheme]);

//   useIsomorphicLayoutEffect(() => {}, []);

//   return <Fragment key={"StorageThemeProvider"}>{children}</Fragment>;
// };

// export const useStorageTheme = () => {
//   const currTheme = useAppStoreSelector(selectAppStateTheme, shallowEqual);
//   const prevTheme = usePrevious(currTheme);

//   const dispatch = useAppStoreDispatch();

//   const applyTheme = useCallback(
//     (themeColor: ThemeColor) => {
//       if (currTheme === themeColor) return;
//       dispatch(setTheme(themeColor));
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [currTheme]
//   );

//   return { currTheme, prevTheme, applyTheme };
// };

//
