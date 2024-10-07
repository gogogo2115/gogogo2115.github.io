import WebSafePageClient from "@/app/colors/web-safe/page.client";
import { generateWebSafeData } from "./data";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹 안전 216개 색상표와 HEX 코드",
  description: "모든 브라우저에서 안정적으로 표시되는 Web-Safe 색상표를 확인하세요.",
  keywords: ["web-safe 색상", "216 웹 안전 색상", "웹 개발 색상"],
};

const defaultData = generateWebSafeData();

export default async function WebSafePage() {
  return <WebSafePageClient data={defaultData} />;
}
