"use client";

// export function generateStaticParams() {
//   return [{ color: "1" }, { color: "2" }, { color: "3" }];
// }

// Three versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
// - /product/1
// - /product/2
// - /product/3
export default function Page({ params }: { params: { color: string } }) {
  return <div>My Post: {params.color}</div>;
}
