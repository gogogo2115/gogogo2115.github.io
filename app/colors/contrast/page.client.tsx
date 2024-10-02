"use client";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { ChangeEvent, MouseEvent, useMemo } from "react";
import { useForm } from "react-hook-form";
import { randomHexColor, fullHexToRGB } from "../toColor";
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

export default function ContrastPageClient({ defaultFontColor, defaultBackgroundColor }: ContrastClientPageProps) {
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
      const toString = String(ratio);
      if (toString.indexOf(".") !== -1) {
        const split = toString.split(".");
        if (split.length == 1) {
          return Number(toString);
        } else {
          return Number(split[0] + "." + split[1].charAt(0) + split[1].charAt(1));
        }
      }
      return parseFloat(ratio.toFixed(3));
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
      setValue(dataTarget, randomHexColor(), { shouldValidate: true, shouldTouch: true, shouldDirty: true });
    } else {
      setValue("fontColor", randomHexColor(), { shouldValidate: true, shouldTouch: true, shouldDirty: true });
      setValue("backgroundColor", randomHexColor(), { shouldValidate: true, shouldTouch: true, shouldDirty: true });
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
      <div>WCAG 2.0</div>
      <div>
        <div className="flex">
          <input className="w-10 h-10" type="color" data-target="fontColor" onChange={onChangePalette} value={defaultValueColor(watchFields.fontColor)} />
          <input {...fontColorRegister} type="text" id="fontColor" maxLength={7} className="text-black h-10 outline-none p-2" autoComplete="off" defaultValue={defaultFontColor} />
          <button type="button" className="w-10 h-10 bg-white text-black" data-target="fontColor" onClick={onClickRandomColor}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-refresh"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </svg>
          </button>
        </div>
        <p className="text-red-500 h-10">{errors.fontColor && errors.fontColor.message}</p>
      </div>
      <div>
        <div className="flex">
          <input className="w-10 h-10" type="color" data-target="backgroundColor" onChange={onChangePalette} value={defaultValueColor(watchFields.backgroundColor)} />
          <input {...backgroundColorRegister} type="text" id="backgroundColor" maxLength={7} className="text-black h-10 outline-none p-2" autoComplete="off" defaultValue={defaultBackgroundColor} />
          <button type="button" className="w-10 h-10 bg-white text-black" data-target="backgroundColor" onClick={onClickRandomColor}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-refresh"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
              <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </svg>
          </button>
        </div>
        <p className="text-red-500 h-10">{errors.backgroundColor && errors.backgroundColor.message}</p>
      </div>

      <div
        className="flex flex-col justify-between content-start aspect-[5/3] w-[80%] max-w-[480px] rounded-lg p-3 border-[#ffffff] border-solid border-2"
        style={{ backgroundColor: `${defaultValueColor(watchFields.backgroundColor)}` }}
      >
        <div style={{ color: `${defaultValueColor(watchFields.fontColor)}` }}>
          <div style={{ fontSize: "14pt" }}>일반 글자 14pt (18.5px)</div>
          <div style={{ fontSize: "18pt" }}>대형 글자 18pt (24px)</div>
          <div>{contrast}: 1</div>
        </div>

        <div style={{ color: `${defaultValueColor(watchFields.fontColor)}` }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={`none`}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-share"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
            <path d="M8.7 10.7l6.6 -3.4" />
            <path d="M8.7 13.3l6.6 3.4" />
          </svg>
        </div>
      </div>

      <div>
        <input
          placeholder="테스트 입력"
          type="text"
          maxLength={100}
          className="h-10 outline-none w-[320px] rounded-lg p-3 m-2"
          style={{ color: `${defaultValueColor(watchFields.fontColor)}`, backgroundColor: `${defaultValueColor(watchFields.backgroundColor)}` }}
        />
      </div>

      <div>
        <div>
          <div>일반 폰트</div>
          <div>AA</div>
          <div>AAA</div>
        </div>

        <div>
          <div>대형 폰트</div>
          <div>AA</div>
          <div>AAA</div>
        </div>

        <div>
          <div>ui svg 기타등등</div>
          <div>AA</div>
          <div>AAA</div>
        </div>
      </div>
    </>
  );
}
{
  /*
  
  
  레벨 AA (최소 대비)
  일반 텍스트 최소 4.5:1
  큰 텍스트 최소 18pt 또는 굵은 텍스트 최소 14pt 최소 3:1

  레벨 AAA (향상된 대비)
  일반 텍스트 최소 7:1
  큰 텍스트  최소 18pt 또는 굵은 텍스트 최소 14pt 최소 3:1
  
  
  <div>
<p>일반 텍스트</p>
<div>
  <div>AA 4.5:1</div>
  <div>AAA 7:1</div>
</div>
</div>

<div>
<p>대형 텍스트</p>
<div>
  <div>AA 3:1</div>
  <div>AAA 4.5:1</div>
</div>
</div>

<div>
<p>그 외 텍스트(SVG, 그래픽아이콘, UI 등등)</p>
<div>
  <div>AA 3:1</div>
  <div>AAA 4.5:1</div>
</div>
</div> */
}
