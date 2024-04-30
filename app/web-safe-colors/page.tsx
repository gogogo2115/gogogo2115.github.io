import Link from "next/link";
import { type RGB_OBJ, generateWebSafeColors } from "../func/color/colorUtils";

const webSafeHexColors = generateWebSafeColors({ returnType: "OBJECT" }) as {
  hex: string;
  rgb: RGB_OBJ;
}[];

export default function WebSafeColorsPage() {
  return (
    <div>
      {webSafeHexColors.map((v, index) => {
        const { hex, rgb } = v;
        const hexColor = `#${hex}`;
        return (
          <div key={index} data-index={index} style={{ display: "inline-flex", flexDirection: "column", gap: "2px", margin: "2px" }}>
            <div style={{ backgroundColor: hexColor, width: "64px", height: "64px", borderRadius: "8px" }} />
            <div style={{ fontSize: "1.3rem", textAlign: "center" }}>{hexColor}</div>
            <Link href={`/web-safe-colors/${hex}`}>
              {rgb?.r}/{rgb?.g}/{rgb?.b}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
