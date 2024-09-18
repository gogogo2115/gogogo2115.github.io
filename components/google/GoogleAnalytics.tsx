"use client";

import { useEffect } from "react";
import Script from "next/script";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

export type GoogleAnalyticsProps = { gaId?: string | null | undefined };

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  //
  useIsomorphicLayoutEffect(() => {
    console.log();
  }, []);

  if (typeof gaId !== "string" || gaId.trim() == "") return null;
  return (
    <>
      <Script id={`ga-init-${gaId}`} />
    </>
  );
}
