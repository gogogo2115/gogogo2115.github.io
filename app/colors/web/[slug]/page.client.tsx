import { WebData } from "@/app/colors/web/data";
import { getOptimalFontColor } from "../../color";

type WebSlugPageClientProps = {
  slug: string;
  data: WebData;
};

export default function WebSlugPageClient({ data }: WebSlugPageClientProps) {
  const { rgb, name, hex } = data;
  const { r: rHx, g: gHx, b: bHx } = hex;
  const { r: rWc, g: gWc, b: bWc } = rgb;
  const { r: rOF, g: gOF, b: bOF } = getOptimalFontColor(rgb);

  const cssOptimalColor = `rgb(${rOF},${gOF},${bOF})`;
  const fullHex = `#${rHx}${gHx}${bHx}`;
  const cssColor = `rgb(${rWc},${gWc},${bWc})`;

  return (
    <>
      <div className="flex flex-col gap-[2px] p-2 max-w-72 aspect-[2/1]" style={{ backgroundColor: name, color: cssOptimalColor, fontWeight: 600 }}>
        <div>
          <b className="text-2xl font-bold">{name}</b>
        </div>
        <div>{fullHex}</div>
        <div>{cssColor}</div>
      </div>
      <div className="flex flex-col gap-[2px] p-2 max-w-72 aspect-[2/1]" style={{ backgroundColor: cssOptimalColor, color: name, fontWeight: 600 }}>
        <div>
          <b className="text-2xl font-bold">{name}</b>
        </div>
        <div>{fullHex}</div>
        <div>{cssColor}</div>
      </div>
    </>
  );
}
