import { Metadata } from "next";

import { randomHexColor } from "@/app/colors/toColor";
import ContrastPageClient from "@/app/colors/contrast/page.client";

export const metadata: Metadata = {
  title: "웹 접근성 명도 대비 체크",
  description: "이 명도 대비 체크 도구는 웹 접근성 평가를 위한 색상 대비 비율을 계산합니다. WCAG 기준을 따르며, 웹사이트의 텍스트와 배경 색상이 충분한 대비를 갖추었는지 확인할 수 있습니다.",
  keywords: ["웹 접근성 명도 테스트", "웹 접근성 명도 대비 검사", "명도 대비 계산기", "웹 접근성 도구", "색상 명도", "WCAG 기준 색상 대비"],
};

export default function ContrastPage() {
  const props = { defaultFontColor: randomHexColor(), defaultBackgroundColor: randomHexColor() };
  return <ContrastPageClient {...props} />;
}
