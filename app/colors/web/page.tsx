import WebPageClient from "@/app/colors/web/page.client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹 색상",
  description: "웹 색상",
};

export default function WebPage() {
  return <WebPageClient />;
}
