import { getWebSafeHexObjData } from "@/app/colors/web-safe/data";
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
  const isFindWebSafe = webSafeData.find(({ hex }) => `${hex.r}${hex.g}${hex.b}` === slug);
  if (!isFindWebSafe) return notFound();
  return (
    <div>
      <div>{slug}</div>
      <div>현재 준비 중입니다.</div>
    </div>
  );
}
