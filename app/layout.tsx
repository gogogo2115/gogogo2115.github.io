import "@/styles/globals.scss";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Nanum_Gothic_Coding } from "next/font/google";

import { IS_PROD_MAINTENANCE, PACKAGE_GENERATOR } from "@/utils";
import Maintenance from "@/components/Maintenance";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const nanum = Nanum_Gothic_Coding({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "묻지마요. 몰라요. 못해요. 안돼요. 싫어요.",
  description: "알아도 안 알려줄거임",
  generator: PACKAGE_GENERATOR,
  keywords: ["개발자", "블로그", "포트폴리오"],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <head></head>
      <body id="__next" className={nanum.className}>
        {IS_PROD_MAINTENANCE ? <Maintenance /> : children}

        <GoogleAnalytics />

        <script type="text/javascript" id="theme" defer async src="/theme.js" />
        <script type="text/javascript" id="featureNotBug" defer async src="/featureNotBug.js" />
      </body>
    </html>
  );
}
