import { notFound } from "next/navigation";

type PageProps = {
  params: { color: string };
  searchParams: { [string: string]: string };
};

const isColorHexRegex = (color?: string) => {
  const regex = /^#?([0-9A-F]{3}([0-9A-F]{1})|[0-9A-F]{6}([0-9A-F]{2})?)$/i;
  return regex.test(color as string);
};

export default function ColorsWebSafeColorPage(props: PageProps) {
  const { params } = props;
  const { color: propsColor } = params;

  if (!isColorHexRegex(propsColor)) return notFound();
  return <>{propsColor}</>;
}
