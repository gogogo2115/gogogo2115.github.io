import { notFound } from "next/navigation";

type PageProps = {
  params: { color: string };
  searchParams: { [string: string]: string };
};

export default function ColorsWebSafeColorPage(props: PageProps) {
  const { params } = props;
  const pramsColor = params.color;

  if (false) return notFound();
  return <>{pramsColor}</>;
}
