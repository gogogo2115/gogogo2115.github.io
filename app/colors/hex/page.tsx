import ColorsHexClient from "./page.client";
import { randomHexColor } from "@/app/colors/toColor";

export default function ColorsHexPage() {
  return <ColorsHexClient defaultFullHexColor={randomHexColor()} />;
}
