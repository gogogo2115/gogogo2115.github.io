import { getWebSafeHexObjData } from "@/app/colors/web-safe/data";
import WebSafePageClient from "@/app/colors/web-safe/[slug]/page.client";

import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";

// export const dynamicParams = true;

type WebSafeSlugPageProps = { params: { slug: string } };
type generateMetadataProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const data = getWebSafeHexObjData();
  return data.map(({ hex }) => {
    return { slug: `${hex.r}${hex.g}${hex.b}` };
  });
}

export async function generateMetadata({ params }: generateMetadataProps, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug;
  return {
    title: `웹 216 색상: #${slug}`,
    description: `웹 216 색상: #${slug}`,
  };
}

export default async function WebSafeSlugPage({ params: { slug } }: WebSafeSlugPageProps) {
  const webSafeData = getWebSafeHexObjData();
  const findWebSafe = webSafeData.find(({ hex }) => `${hex.r}${hex.g}${hex.b}` === slug);
  if (!findWebSafe) return notFound();
  return <WebSafePageClient data={findWebSafe} />;
}
