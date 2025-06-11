"use client";

import { AppStore, makeStore } from "@/lib/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useEffect, useRef, type ReactNode } from "react";
import { Provider } from "react-redux";

type StoreProviderProps = { readonly children: ReactNode };

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // 이 컴포넌트가 처음 렌더링될 때 스토어 인스턴스를 생성합니다
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // 제공된 기본값을 사용하여 리스너들을 설정합니다
      // 선택사항이지만, `refetchOnFocus`/`refetchOnReconnect` 동작을 위해서는 필수
      // refetchOnFocus - 브라우저 탭이 다시 포커스될 때 자동으로 데이터를 다시 가져옴
      // refetchOnReconnect - 네트워크 연결이 복구될 때 자동으로 데이터를 다시 가져옴
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};
