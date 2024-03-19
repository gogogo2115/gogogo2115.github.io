"use client";

import { Fragment, type ReactNode, useRef, useEffect } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicEffect";
import { useReduxDispatch, useReduxSelector } from "@/store";
import { shallowEqual } from "react-redux";

type ColorTheme = "dark" | "light" | "auto" | "gray";
type StoredThemeProps = { children: ReactNode };

export const COLOR_THEME_ARR: ColorTheme[] = ["dark", "light", "auto", "gray"];
const DEFAULT_COLOR_THEME: (typeof COLOR_THEME_ARR)[number] = "auto";

const isValidColorTheme = (colorTheme: unknown): boolean => {
  return COLOR_THEME_ARR.includes(colorTheme as ColorTheme);
};

const StoredTheme = (props: StoredThemeProps) => {
  const { children } = props;
  const appStateTheme = useReduxSelector(({ appState }) => appState.theme, shallowEqual);
  const dispatch = useReduxDispatch();

  useIsomorphicLayoutEffect(() => {
    const storedTheme = (window.localStorage?.getItem("theme") ?? "").toLowerCase().trim();
    const isValidTheme = isValidColorTheme(storedTheme) ? storedTheme : DEFAULT_COLOR_THEME;
  }, []);

  return <Fragment key="StoredTheme">{children}</Fragment>;
};

export default StoredTheme;
