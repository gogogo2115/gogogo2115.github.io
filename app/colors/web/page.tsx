import ColorsWebPageClient from "@/app/colors/web/page.client";
import { data } from "@/app/colors/web/data";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹 색상",
  description: "웹 색상",
  keywords: ["웹 색상"],
};

export default function ColorsWebPage() {
  return <ColorsWebPageClient data={data} />;
}
