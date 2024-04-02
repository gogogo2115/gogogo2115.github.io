import "@/styles/globals.scss";
import type { ReactNode } from "react";
import type { Metadata } from "next";
// import { cookies } from "next/headers";

import { Nanum_Gothic_Coding as NanumGothicCoding } from "next/font/google";

import { IS_PROD_MAINTENANCE, PACKAGE_GENERATOR } from "@/utils";
import Maintenance from "@/components/Maintenance";

import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import WebVitals from "@/components/analytics/web-vitals";

import ReactQueryProvider from "@/components/providers/ReactQueryProvider";
import StyledComponentsProvider from "@/components/providers/StyledComponentsProvider";
import AppStoreProvider from "@/components/providers/AppStoreProvider";

import StoredTheme from "@/components/theme/StoredTheme";

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const nanum = NanumGothicCoding({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "묻지마요. 몰라요. 못해요. 안돼요. 싫어요.",
  description: "알아도 안 알려줄거임",
  generator: PACKAGE_GENERATOR,
  keywords: ["개발자", "블로그", "포트폴리오", "잡소리"],
};

export default function RootLayout({ children }: RootLayoutProps) {
  // const cookieStore = cookies();
  // const theme = cookieStore.get("theme")?.value ?? "dark";
  return (
    <AppStoreProvider>
      <StoredTheme>
        <html lang="ko" dir="ltr">
          <body id="__next" className={nanum.className}>
            <ReactQueryProvider>
              <StyledComponentsProvider>
                <>{IS_PROD_MAINTENANCE ? <Maintenance /> : children}</>
              </StyledComponentsProvider>
            </ReactQueryProvider>
            <script type="text/javascript" id="theme" defer async src="/theme.js" />
            <script type="text/javascript" id="featureNotBug" defer async src="/featureNotBug.js" />

            <GoogleAnalytics />
            <WebVitals />
          </body>
        </html>
      </StoredTheme>
    </AppStoreProvider>
  );
}
