"use client";

import Script from "next/script";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { IS_DEVELOPMENT } from "@/utils/isNodeEnv";

type GoogleTagManagerProps = { gtmId?: string | undefined };

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  //
  useIsomorphicLayoutEffect(() => {}, []);

  if (typeof gtmId !== "string" || gtmId.trim() == "" || IS_DEVELOPMENT) return null;
  return (
    <>
      <Script id={`gtm-init-${gtmId}`} />
    </>
  );
}

export const sendGTMEvent = (data: Object) => {};
