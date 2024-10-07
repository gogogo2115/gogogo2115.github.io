"use client";

import { type WebSafeData } from "@/app/colors/web-safe/data";
import { getOptimalFontColor } from "../../color";

type WebSafePageClientProps = { slug: string; data: WebSafeData };

export default function WebSafeSlugPageClient({ slug, data }: WebSafePageClientProps) {
  const optimalFontColor = getOptimalFontColor(data.rgb);
  const { r: fR, g: fG, b: fB } = optimalFontColor;
  const color = `rgb(${fR}, ${fG}, ${fB} )`;
  return (
    <div>
      <div style={{ backgroundColor: `#${slug}`, color }}>{slug}</div>
    </div>
  );
}
