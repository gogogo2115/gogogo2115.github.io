import "@/styles/globals.scss";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { IS_PROD_MAINTENANCE, PACKAGE_GENERATOR } from "@/utils";
import MaintenancePage from "@/components/Maintenance";

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "묻지마요. 몰라요. 못해요. 안돼요. 싫어요.",
  description: "알아도 안 알려줄거임",
  generator: PACKAGE_GENERATOR,
  keywords: ["개발자", "블로그", "포트폴리오"],
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body id="__next" className={inter.className}>
        {IS_PROD_MAINTENANCE ? <MaintenancePage /> : children}
      </body>
    </html>
  );
}
