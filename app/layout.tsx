import "@/styles/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { QueryStreamingProvider } from "@/components/providers/QueryProvider";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { SettingsScript } from "@/components/settings/SettingsScript";

type RootLayoutProps = Readonly<{ children: ReactNode }>;

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const NEXT_VERSION = `Next.js ${process.env.NEXT_PUBLIC_CONFIG_NEXT_VERSION ?? ""}`.trim();
// const BUILD_RAND_KEY = (process.env.BUILD_RAND_KEY ?? "unknown").replace(/\s+/g, "");

export const metadata: Metadata = {
  title: "gogogo2115.github.io",
  description: "gogogo2115.github.io 블로그",
  generator: NEXT_VERSION,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko-KR" dir="ltr" suppressHydrationWarning>
      <body id="__next" className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <StoreProvider>
          <SettingsScript />
          <QueryStreamingProvider>{children}</QueryStreamingProvider>
        </StoreProvider>
        <div id="root_modal" />
      </body>
    </html>
  );
}
