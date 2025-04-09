"use client";

import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

import { getQueryClient } from "@/lib/query/getQueryClient";
import { IS_DEVELOPMENT } from "@/utils/configNode";

type QueryProviderProps = { readonly children: ReactNode };

export const QueryPrefetchingProvider = ({ children }: QueryProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider key={"QueryPrefetchingProvider"} client={queryClient}>
      {children}
      {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export const QueryStreamingProvider = (props: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider key={"QueryStreamingProvider"} client={queryClient}>
      <ReactQueryStreamedHydration>{props.children}</ReactQueryStreamedHydration>
      {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};
