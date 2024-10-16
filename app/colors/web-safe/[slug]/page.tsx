import WebSafePageClient from "@/app/colors/web-safe/[slug]/page.client";
import { generateWebSafeData } from "@/app/colors/web-safe/data";
import { Metadata } from "next";
import Head from "next/head";
import { notFound } from "next/navigation";

type WebSafeSlugPageProps = {
  params: { slug: string };
  // searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const data = generateWebSafeData();
  return data.map(({ hex }) => ({ slug: `${hex.r}${hex.g}${hex.b}` }));
}

export async function generateMetadata({ params: { slug } }: WebSafeSlugPageProps /*, parent: ResolvingMetadata*/): Promise<Metadata> {
  return {
    title: `웹 안전 색상 #${slug} 상세 정보`,
    description: `웹 안전 색상 #${slug}의 값을 다른 색상 코드로 변환해주는 페이지입니다. RGB, HSL, CMYK 등으로 변환된 색상값을 확인해보세요.`,
  };
}

export function generateViewport({ params: { slug } }: WebSafeSlugPageProps) {
  return {
    themeColor: `#${slug}`,
    title: `웹 안전색 #${slug} 상세 정보`,
  };
}

export default async function WebSafeSlugPage({ params: { slug } }: WebSafeSlugPageProps) {
  const webSafeData = generateWebSafeData();
  const findWebSafe = webSafeData.find(({ hex }) => `${hex.r}${hex.g}${hex.b}` === slug);
  if (!findWebSafe) return notFound();
  return (
    <>
      <WebSafePageClient slug={slug} data={findWebSafe} />
    </>
  );
}
