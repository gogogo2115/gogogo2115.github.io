import { Metadata } from "next";
import TestPageClient from "./page.client";

export const metadata: Metadata = {
  title: "테스트 정보",
  description: "테스트 정보",
};

export default function TestPage() {
  return <TestPageClient />;
}
