import ContrastPageClient from "@/app/colors/contrast/page.client";
import { randHexColor } from "@/utils/color";

// import dynamic from "next/dynamic";
// const ContrastPageClient = dynamic(() => import("./page.client"), { ssr: false });

export default function ContrastPage() {
  const fontHexColor = randHexColor("#"),
    backHexColor = randHexColor("#");
  return <ContrastPageClient fontHexColor={fontHexColor} backHexColor={backHexColor} />;
}
