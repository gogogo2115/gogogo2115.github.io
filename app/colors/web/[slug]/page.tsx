import { data } from "@/app/colors/web/data";
import WebSlugPageClient from "@/app/colors/web/[slug]/page.client";

import { notFound } from "next/navigation";

type WebSlugPageProps = {
  params: { slug: string };
  // searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  return data.map(({ name }) => ({ slug: name.toLowerCase() }));
}

export default function WebSlugPage({ params: { slug } }: WebSlugPageProps) {
  const findWeb = data.find(({ name }) => name.toLowerCase() === slug);
  if (!findWeb) return notFound();
  return <WebSlugPageClient slug={slug} data={findWeb} />;
}
