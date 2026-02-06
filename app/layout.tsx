import "@/styles/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryStreamingProvider } from "@/lib/query/providers/QueryStreamingProvider";

type RootLayoutProps = Readonly<{ children: ReactNode }>;

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gogogo2115.github.io",
  description: "개인 페이지 입니다.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko-KR" dir="ltr">
      <body id="__next" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryStreamingProvider>{children}</QueryStreamingProvider>
      </body>
    </html>
  );
}
