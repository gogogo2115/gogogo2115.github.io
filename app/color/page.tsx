"use client";

const ColorPage = () => {
  return <div></div>;
};

export default ColorPage;

// import { ChangeEvent, useState } from "react";

// type RgbColorObj = { r: number; g: number; b: number; a?: number };

// const ColorPage = () => {
//   const [rgbaColor, setRgbaColor] = useState<RgbColorObj | undefined>(undefined);

//   const onRgbChange = (e: ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const target = e.target;
//     const value = parseInt(target.value);
//     const clampedValue = !isNaN(value) ? Math.min(Math.max(value, 0), 255) : 0;
//     const dataset = target.dataset["rgb"] as keyof RgbColorObj;
//     if (dataset === "r") {
//       setRgbaColor((prevColor) => {
//         const { r = 0, g = 0, b = 0, a = 1 } = (prevColor as RgbColorObj) ?? { r: 0, g: 0, b: 0, a: 1 };
//         return { r: clampedValue, g, b, a };
//       });
//     }
//     if (dataset === "g") {
//       setRgbaColor((prevColor) => {
//         const { r = 0, g = 0, b = 0, a = 1 } = prevColor as RgbColorObj;
//         return { r, g: clampedValue, b, a };
//       });
//     }
//     if (dataset === "b") {
//       setRgbaColor((prevColor) => {
//         const { r = 0, g = 0, b = 0, a = 1 } = prevColor as RgbColorObj;
//         return { r, g, b: clampedValue, a };
//       });
//     }
//   };

//   const inputRangeAttr = { type: "range", min: 0, max: 255, step: 1, defaultValue: 0, onChange: onRgbChange };

//   console.log(rgbaColor);

//   return (
//     <div>
//       <style></style>
//       <div>
//         <input data-rgb="r" {...inputRangeAttr} />
//         <input data-rgb="g" {...inputRangeAttr} />
//         <input data-rgb="b" {...inputRangeAttr} />
//       </div>
//     </div>
//   );
// };

// export default ColorPage;
