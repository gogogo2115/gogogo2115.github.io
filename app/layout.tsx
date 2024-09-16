import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.scss";
import { toBoolean } from "@/utils/isBoolean";

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const inter = Inter({ subsets: ["latin"] });
const NEXT_VERSION = process.env.NEXT_VERSION || "";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "개인 블로그",
  keywords: ["nextjs", "react", "blog"],
  generator: `Next.js ${NEXT_VERSION}`,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko">
      <body id="__next" className={inter.className}>
        {children}
      </body>
    </html>
  );
}
