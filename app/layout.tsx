import "@/styles/globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { QueryStreamingProvider } from "@/lib/query/providers/QueryStreamingProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

type RootLayoutProps = Readonly<{ children: ReactNode }>;

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gogogo2115.github.io",
  description: "gogogo2115의 개인 페이지 입니다.",
  generator: "next.js",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="ko-KR" dir="ltr">
      <head></head>
      <body id="__next" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryStreamingProvider>{children}</QueryStreamingProvider>
        <GoogleAnalytics gaId={"G-MR7CLCCCQP"} />
      </body>
    </html>
  );
}
