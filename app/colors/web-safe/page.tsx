import { Metadata } from "next";
import WebSafePageClient from "./page.client";
import { getWebSafeHexObjData } from "@/app/colors/web-safe/data";

const data = getWebSafeHexObjData();

export const metadata: Metadata = {
  title: "웹 안전 216개 색상표와 HEX 코드",
  description: "모든 브라우저에서 안정적으로 표시되는 Web-Safe 색상표를 확인하세요.",
  keywords: ["web-safe 색상", "216 웹 안전 색상", "웹 개발 색상"],
};

export default async function WebSafePage() {
  return <WebSafePageClient data={data} />;
}
