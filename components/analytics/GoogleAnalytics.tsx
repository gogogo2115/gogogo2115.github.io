"use client";
import Script from "next/script";

type GoogleAnalyticsProps = { GA_ID?: string };

const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? "";

const GoogleAnalytics = ({ GA_ID = gaId }: GoogleAnalyticsProps) => {
  const isPassGaId = typeof GA_ID === "string" && GA_ID.length !== 0;
  if (!isPassGaId) return null;
  return <></>;
};

export default GoogleAnalytics;
