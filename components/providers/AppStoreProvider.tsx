"use client";

import { type PropsWithChildren, useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/store";
import { setupListeners } from "@reduxjs/toolkit/query";

type AppStoreProviderProps = PropsWithChildren;

const AppStoreProvider = ({ children }: AppStoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};

export default AppStoreProvider;
