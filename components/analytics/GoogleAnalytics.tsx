"use client";
import Script from "next/script";
import { useEffect } from "react";

type GoogleAnalyticsProps = { GA_ID?: string };

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "";

const GoogleAnalytics = ({ GA_ID = gaId }: GoogleAnalyticsProps) => {
  const isPassGaId = typeof GA_ID === "string" && GA_ID.length !== 0;

  useEffect(() => {
    if (!isPassGaId) return;
  }, [isPassGaId]);

  if (!isPassGaId) return null;
  return (
    <>
      <Script key={`next-ga-${GA_ID}`} id={`next-ga-${GA_ID}`} strategy="afterInteractive" async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
      <Script
        key={`next-ga-init-${GA_ID}`}
        id={`next-ga-init-${GA_ID}`}
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');` }}
      />
    </>
  );
};

export default GoogleAnalytics;
