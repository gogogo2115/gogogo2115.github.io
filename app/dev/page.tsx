import { Metadata } from "next";
import DevPageClient from "@/app/dev/page.client";

export const metadata: Metadata = {
  title: "개발 정보",
  description: "개발 정보",
};

export default function DevPage() {
  return <DevPageClient />;
}
