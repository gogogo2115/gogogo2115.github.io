"use client";

import { type PropsWithChildren, useRef } from "react";
import { Provider } from "react-redux";
import reduxStore, { type ReduxStore } from "@/store";

type ReduxProviderProps = PropsWithChildren;

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  const storeRef = useRef<ReduxStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = reduxStore;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default ReduxProvider;
