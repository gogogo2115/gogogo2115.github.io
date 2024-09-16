import { Metadata } from "next";
import WebSafePageClient from "./page.client";
import { getWebSafeHexObjData } from "@/app/colors/web-safe/data";

const data = getWebSafeHexObjData();

export const metadata: Metadata = {
  title: "웹 216색상",
  description: "웹 216색상",
};

export default async function WebSafePage() {
  return (
    <>
      <WebSafePageClient data={data} />
    </>
  );
}
