import { getWebSafeHexObjData } from "@/app/colors/web-safe/data";
import WebSafePageClient from "@/app/colors/web-safe/[slug]/page.client";

import { notFound } from "next/navigation";

type WebSafeSlugPageProps = { params: { slug: string } };

export async function generateStaticParams() {
  const data = getWebSafeHexObjData();
  return data.map(({ hex }) => {
    return { slug: `${hex.r}${hex.g}${hex.b}` };
  });
}

export default function WebSafeSlugPage({ params: { slug } }: WebSafeSlugPageProps) {
  const webSafeData = getWebSafeHexObjData();
  const findWebSafe = webSafeData.find(({ hex }) => `${hex.r}${hex.g}${hex.b}` === slug);
  if (!findWebSafe) return notFound();
  return <WebSafePageClient data={findWebSafe} />;
}
