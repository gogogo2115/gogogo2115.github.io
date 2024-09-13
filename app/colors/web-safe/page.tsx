import { Metadata } from "next";
import WebSafePageClient from "./page.client";
import { WEB_SAFE_HEX_DATA } from "@/app/colors/web-safe/data";

export const metadata: Metadata = {
  title: "웹 216색상",
  description: "웹 216색상",
};

const data = WEB_SAFE_HEX_DATA();

export default function colorsWebSafePage() {
  return (
    <>
      <WebSafePageClient data={data} />
    </>
  );
}
