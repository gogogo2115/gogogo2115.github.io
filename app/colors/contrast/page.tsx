import type { Metadata } from "next";
import ColorsContrastClient from "./page.client";

export const metadata: Metadata = {
  title: "명도 대비 계산기 | WCAG 2.1",
  description: "WCAG 2.1 기준을 준수하는 명도 대비 계산기. AA 및 AAA 기준에 맞는지 확인하세요.",
};

export default function ColorsContrastPage() {
  return <ColorsContrastClient />;
}
