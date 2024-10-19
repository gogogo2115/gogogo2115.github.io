import ContrastPageClient from "@/app/colors/contrast/page.client";
import { randHexObj } from "@/utils/color";

export default function ContrastPage() {
  const fontHexObj = randHexObj();
  const backHexObj = randHexObj();
  return <ContrastPageClient fontHexObj={fontHexObj} backHexObj={backHexObj} />;
}
