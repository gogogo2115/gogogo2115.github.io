"use client";

import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { IS_DEVELOPMENT } from "@/utils/envNode";
import { getQueryClient } from "@/lib/getQueryClient";

type ReactQueryProviderProps = { children: ReactNode };

export const QueryPrefetchingProvider = ({ children }: ReactQueryProviderProps) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export const QueryStreamingProvider = ({ children }: ReactQueryProviderProps) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
