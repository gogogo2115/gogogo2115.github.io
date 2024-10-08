import "@/styles/globals.scss";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactQueryStreamedProvider } from "@/components/react-query/ReactQueryProvider";
import { ENV_NEXT_VERSION } from "@/utils/env";

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const inter = Inter({ subsets: ["latin"] });
const NEXT_VERSION = ENV_NEXT_VERSION ?? "";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "개인 블로그",
  keywords: ["nextjs", "react", "blog"],
  generator: `Next.js ${NEXT_VERSION}`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko" dir="ltr">
      <body id="__next" className={inter.className}>
        <ReactQueryStreamedProvider>{children}</ReactQueryStreamedProvider>
      </body>
    </html>
  );
}
