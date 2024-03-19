"use client";

import { type PropsWithChildren, useRef, useEffect } from "react";
import { Provider } from "react-redux";
import reduxStore, { type ReduxStore } from "@/store";
import { setupListeners } from "@reduxjs/toolkit/query";

type ReduxProviderProps = PropsWithChildren;

const ReduxProvider = ({ children }: ReduxProviderProps) => {
  const storeRef = useRef<ReduxStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = reduxStore;
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

export default ReduxProvider;
