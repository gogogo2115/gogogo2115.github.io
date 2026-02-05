"use client";

import { type ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/lib/query/getQueryClient";
import { IS_DEVELOPMENT } from "@/utils/env.config";

type QueryPrefetchingProviderProps = { readonly children: ReactNode };

const QueryPrefetchingProvider = ({ children }: QueryPrefetchingProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {IS_DEVELOPMENT && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default QueryPrefetchingProvider;
