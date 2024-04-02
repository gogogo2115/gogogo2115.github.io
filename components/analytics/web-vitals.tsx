"use client";

import { useReportWebVitals } from "next/web-vitals";

import { IS_DEVELOPMENT, IS_TEST } from "@/utils";

type MetricName = "TTFB" | "FCP" | "LCP" | "FID" | "CLS" | "INP";

const WebVitals = () => {
  const isPass = IS_DEVELOPMENT || IS_TEST;
  if (!isPass) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useReportWebVitals((metric) => {
    switch (metric.name as MetricName) {
      case "FCP": {
        // handle FCP results
        console.log("FCP", metric);
        return;
      }
      case "LCP": {
        // handle LCP results
        console.log("LCP", metric);
        return;
      }
      default: {
        console.log("default", metric);
        return;
      }
    }
  });

  return null;
};

export default WebVitals;
