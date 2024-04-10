"use client";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicEffect";
import { useAppStoreSelector } from "@/store";
import { selectAppStateTheme } from "@/store/modules/appState";
import { Fragment, type ReactNode } from "react";

type ProviderProps = {
  children: ReactNode;
};

const StorageThemeProvider = ({ children }: ProviderProps) => {
  const theme = useAppStoreSelector(selectAppStateTheme);

  useIsomorphicLayoutEffect(() => {
    console.log(theme);
  }, []);

  return <Fragment key={"StorageThemeProvider"}>{children}</Fragment>;
};

export default StorageThemeProvider;
