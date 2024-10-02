"use client";

import Script from "next/script";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { IS_DEVELOPMENT } from "@/utils/isNodeEnv";

export type GoogleAnalyticsProps = { gaId?: string | undefined; dataLayerName?: string };

let currDataLayerName: string | undefined = undefined;

export default function GoogleAnalytics(props: GoogleAnalyticsProps) {
  const { gaId, dataLayerName = "dataLayer" } = props;

  if (currDataLayerName === undefined) {
    currDataLayerName = dataLayerName;
  }

  useIsomorphicLayoutEffect(() => {}, []);

  if (typeof gaId !== "string" || gaId.trim() == "" || IS_DEVELOPMENT) return null;
  return (
    <>
      <Script id={`next-ga-init-${gaId}`} />
      <Script id={`next-ga-{${gaId}}`} src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
    </>
  );
}

export function sandGAEvent() {}
