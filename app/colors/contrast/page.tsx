import { Metadata } from "next";

import { randomHexColor } from "@/app/colors/toColor";
import ContrastClientPage from "./page.client";

export const metadata: Metadata = {
  title: "웹 접근성",
  description: "웹 접근성",
};

export default function ContrastPage() {
  const props = { defaultFontColor: randomHexColor(), defaultBackgroundColor: randomHexColor() };
  return <ContrastClientPage {...props} />;
}
