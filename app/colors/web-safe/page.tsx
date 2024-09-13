import { Metadata } from "next";
import WebSafePageClient from "./page.client";

export const metadata: Metadata = {
  title: "웹 216색상",
  description: "웹 216색상",
};

export default function colorsWebSafePage() {
  return (
    <>
      <WebSafePageClient />
    </>
  );
}
