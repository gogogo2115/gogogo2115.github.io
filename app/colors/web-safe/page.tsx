import WebSafePageClient from "@/app/colors/web-safe/page.client";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "웹 안전색",
  description: "웹 안전색",
};

export default function WebSafePage() {
  return <WebSafePageClient />;
}
