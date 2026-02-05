/* eslint-disable react-hooks/refs */
"use client";

import { type ReactNode, useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import { type AppStore, makeStore } from "@/lib/store";

type StoreProviderProps = { readonly children: ReactNode };

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
