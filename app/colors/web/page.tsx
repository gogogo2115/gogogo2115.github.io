import ColorsWebPageClient from "@/app/colors/web/page.client";
import { data } from "./data";

import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹 컬러 140개 색상 이름, Hex 및 RGB 코드",
  description: "웹 컬러 이름, Hex 및 RGB 코드를 제공하는 필수 색상 참조 페이지. 140개의 웹 안전 색상을 한눈에 확인하세요.",
  keywords: ["HTML 색상 코드", "웹 컬러 목록", "웹 색상 이름", "140개 웹 색상"],
};

export default function ColorsWebPage() {
  const defaultData = data.sort((a, b) => a.name.localeCompare(b.name));
  const length = defaultData.length ?? 0;
  if (length >= 1) return <ColorsWebPageClient data={defaultData} />;
  return notFound();
}
