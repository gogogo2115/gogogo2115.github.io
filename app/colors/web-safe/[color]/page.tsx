import { notFound } from "next/navigation";
import { isValidateWebSafeKey, isValidateWebSafeHex } from "@/app/colors/web-safe/colorsWebSafeData";

type PageProps = {
  params: { color: string };
  searchParams: { [string: string]: string };
};

export default function ColorsWebSafeColorPage(props: PageProps) {
  const { params } = props;
  const pramsColor = params.color;

  const isWebSafeKey = isValidateWebSafeKey(pramsColor);
  const isWebSafeHex = isValidateWebSafeHex(pramsColor);

  if (!isWebSafeKey && !isWebSafeHex) return notFound();
  return <>{pramsColor}</>;
}
