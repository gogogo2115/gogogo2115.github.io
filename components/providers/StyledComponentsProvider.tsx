"use client";

import { useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager, ThemeProvider } from "styled-components";
import styledTheme from "@/styles/styledTheme";

type StyledComponentsProviderProps = { children: ReactNode };

const StyledComponentsProvider = (props: StyledComponentsProviderProps) => {
  const { children } = props;
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") return <>{children}</>;
  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={styledTheme}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
};

export default StyledComponentsProvider;
