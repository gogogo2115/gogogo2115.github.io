"use client";
import { type ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { AppStore, makeStore } from "@/store/index";

type ReactReduxProviderProps = { readonly children: ReactNode };

export default function ReactReduxProvider({ children }: ReactReduxProviderProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(); // Create the store instance the first time this renders
  }

  useIsomorphicLayoutEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return (
    <Provider key={`ReactReduxProvider`} store={storeRef.current}>
      {children}
    </Provider>
  );
}
