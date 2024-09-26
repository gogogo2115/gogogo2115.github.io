"use client";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { ChangeEvent, MouseEvent, useMemo } from "react";
import { useForm } from "react-hook-form";
import { randomHexColor, fullHexToRGB, isValidFullHexColorValue } from "../toColor";
import { throttle } from "lodash";

type ContrastClientPageProps = { defaultFontColor: string; defaultBackgroundColor: string };
type FormInputColor = { fontColor: string; backgroundColor: string };

const defaultValueColor = (value: string) => {
  value = (value ?? "").trim();
  if (/^#([a-f0-9]{6})$/i.test(value)) return value;
  // if (/^#([a-f0-9]{3})$/i.test(value)) {
  //   const r = value.slice(1, 2),
  //     g = value.slice(2, 3),
  //     b = value.slice(3, 4);
  //   return `#${r}${r}${g}${g}${b}${b}`;
  // }
  return "#000000";
};

// 명도 계산 함수
const luminance = (r: number, g: number, b: number) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export default function ContrastClientPage({ defaultFontColor, defaultBackgroundColor }: ContrastClientPageProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInputColor>({
    mode: "onChange",
    defaultValues: { fontColor: defaultFontColor, backgroundColor: defaultBackgroundColor },
  });
  const watchFields = watch(); // 모든 필드를 감시

  const contrast = useMemo((): number => {
    try {
      const { fontColor, backgroundColor } = watchFields,
        fontToRGB = fullHexToRGB(fontColor),
        backgroundToRGB = fullHexToRGB(backgroundColor);
      if (fontToRGB === null || backgroundToRGB === null) throw new Error("fontToRGB, backgroundToRGB 형식 오류 발생");
      const { r: fR, g: fG, b: fB } = fontToRGB;
      const { r: bR, g: bG, b: bB } = backgroundToRGB;
      const lum1 = luminance(fR, fG, fB);
      const lum2 = luminance(bR, bG, bB);
      const ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
      return Number(ratio.toFixed(3));
      return 1;
    } catch (e) {
      return 1;
    }
  }, [watchFields]);

  const onChangePalette = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const value = target.value ?? "";
    const dataTarget = target.dataset["target"] as "fontColor" | "backgroundColor";
    ["fontColor", "backgroundColor"].includes(dataTarget) && setValue(dataTarget, value, { shouldValidate: true, shouldTouch: true, shouldDirty: true });
  };

  const onClickRandomColor = throttle((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const dataTarget = target.dataset["target"] as "fontColor" | "backgroundColor";
    if (["fontColor", "backgroundColor"].includes(dataTarget)) {
      setValue(dataTarget, randomHexColor("#"), { shouldValidate: true, shouldTouch: true, shouldDirty: true });
    }
  }, 150);

  const fontColorRegister = register("fontColor", {
    required: { value: true, message: "fontColor를 반드시 입력해주세요." },
    maxLength: { value: 7, message: "fontColor 문자열을 초과하였습니다." },
    pattern: { value: /^#([a-fA-F0-9]{6})$/i, message: "#ffffff 형식으로 넣어주세요." },
    validate: (value) => (value === "" ? "빈 값을 허용하지 않습니다." : true),
    onChange: (e) => {
      const value: string = e?.target?.value ?? "";
      const match = value.match(/^(#)?[0-9A-Fa-f]{6}$/i);
      if (match !== null) {
        const isPrefix = value.startsWith("#");
        setValue("fontColor", isPrefix ? value : `#${value}`, { shouldValidate: true });
      }
    },
  });

  const backgroundColorRegister = register("backgroundColor", {
    required: { value: true, message: "backgroundColor를 반드시 입력해주세요." },
    maxLength: { value: 7, message: "backgroundColor 문자열을 초과하였습니다." },
    pattern: { value: /^#([a-fA-F0-9]{6})$/i, message: "#ffffff 형식으로 넣어주세요" },
    validate: (value) => (value === "" ? "빈 값을 허용하지 않습니다." : true),
    onChange: (e) => {
      const value: string = e?.target?.value ?? "";
      const match = value.match(/^(#)?[0-9A-Fa-f]{6}$/i);
      if (match !== null) {
        const isPrefix = value.startsWith("#");
        setValue("backgroundColor", isPrefix ? value : `#${value}`, { shouldValidate: true });
      }
    },
  });

  useIsomorphicLayoutEffect(() => {
    console.log(defaultFontColor, defaultBackgroundColor);
  }, []);

  return (
    <>
      <div>
        <div className="flex">
          <input className="w-10 h-10" type="color" data-target="fontColor" onChange={onChangePalette} value={defaultValueColor(watchFields.fontColor)} />
          <input {...fontColorRegister} type="text" id="fontColor" maxLength={7} className="text-black h-10 outline-none p-2" defaultValue={defaultFontColor} />
          <button type="button" className="w-10 h-10 bg-white text-black" data-target="fontColor" onClick={onClickRandomColor}>
            랜덤
          </button>
        </div>
        <p className="text-red-500 h-10">{errors.fontColor && errors.fontColor.message}</p>
      </div>
      <div>
        <div className="flex">
          <input className="w-10 h-10" type="color" data-target="backgroundColor" onChange={onChangePalette} value={defaultValueColor(watchFields.backgroundColor)} />
          <input {...backgroundColorRegister} type="text" id="backgroundColor" maxLength={7} className="text-black h-10 outline-none p-2" defaultValue={defaultBackgroundColor} />
          <button type="button" className="w-10 h-10 bg-white text-black" data-target="backgroundColor" onClick={onClickRandomColor}>
            랜덤
          </button>
        </div>
        <p className="text-red-500 h-10">{errors.backgroundColor && errors.backgroundColor.message}</p>
      </div>

      <div className="flex aspect-[5/3] w-[300px] rounded-lg p-2 m-2 border-[#ffffff] border-solid border-2" style={{ backgroundColor: `${defaultValueColor(watchFields.backgroundColor)}` }}>
        <div style={{ color: `${defaultValueColor(watchFields.fontColor)}` }}>
          <h1>111111</h1>
          <h2>ssssss</h2>
          <div>{contrast}: 1</div>
        </div>
      </div>
    </>
  );
}
