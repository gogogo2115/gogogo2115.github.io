import ContrastPageClient from "@/app/colors/contrast/page.client";
import { randHexObj } from "@/utils/color";

// import dynamic from "next/dynamic";
// const DynamicComponentWithNoSSR = dynamic(() => import("./page.client"), { ssr: false });

export default function ContrastPage() {
  const fontHexObj = randHexObj();
  const backHexObj = randHexObj();
  return <ContrastPageClient fontHexObj={fontHexObj} backHexObj={backHexObj} />;
}
