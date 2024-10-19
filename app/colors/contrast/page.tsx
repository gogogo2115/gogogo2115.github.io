import ContrastPageClient from "@/app/colors/contrast/page.client";
import { randHexObj } from "@/utils/color";

// import dynamic from "next/dynamic";
// const ContrastPageClient = dynamic(() => import("./page.client"), { ssr: false });

export default function ContrastPage() {
  const fontHexObj = randHexObj(),
    backHexObj = randHexObj();
  return <ContrastPageClient fontHexObj={fontHexObj} backHexObj={backHexObj} />;
}
