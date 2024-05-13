import { type RGB_OBJ, generateWebSafeColors } from "../func/color/colorUtils";

const webSafeObjColors = generateWebSafeColors({ returnType: "OBJECT" }) as {
  hex: string;
  rgb: Omit<RGB_OBJ, "a">;
}[];

const dataLength = webSafeObjColors.length ?? 0;

export default function WebSafeColorsPage() {
  return <div>{dataLength}</div>;
}

// {webSafeObjColors.map((v, index) => {
//   const { hex, rgb } = v;
//   const hexColor = `#${hex}`;
//   return (
//     <div key={index} id={`${hexColor}`} data-index={index} style={{ display: "inline-flex", flexDirection: "column", gap: "2px", margin: "2px" }}>
//       <div style={{ backgroundColor: hexColor, width: "64px", height: "64px", borderRadius: "8px" }} />
//       <div style={{ fontSize: "1.3rem", textAlign: "center" }}>{hexColor}</div>
//       <Link href={`/web-safe-colors/${hex}`}>
//         {rgb?.r}/{rgb?.g}/{rgb?.b}
//       </Link>
//     </div>
//   );
// })}
// const 绿色_蓝色 = () => {
//   const rgb = webSafeObjColors.filter((v) => v.rgb.r === 0);
//   return rgb;
// };

// const 红色_蓝色 = () => {
//   const rgb = webSafeObjColors.filter((v) => v.rgb.g === 0);
//   return rgb;
// };

// const 红色_绿色 = () => {
//   const rgb = webSafeObjColors.filter((v) => v.rgb.b === 0);
//   return rgb;
// };

// const 柔和色 = () => {
//   const rgb = webSafeObjColors.filter((v) => v.rgb.r >= 102 && v.rgb.g >= 102 && v.rgb.b >= 102);
//   return rgb;
// };

// const 灰色 = () => {
//   const rgb = webSafeObjColors.filter((v) => v.rgb.r == v.rgb.g && v.rgb.g == v.rgb.b);
//   return rgb;
// };
