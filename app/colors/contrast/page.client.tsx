"use client";

import { randHexObj, type HEX_OBJ } from "@/utils/color";
import { tree } from "next/dist/build/templates/app-page";

import { ChangeEvent, MouseEvent, Suspense, useMemo, useState } from "react";
// import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

type ContrastPageClientProps = { fontHexObj: HEX_OBJ; backHexObj: HEX_OBJ };
type Form = { fontColor: string; backColor: string };

export default function ContrastPageClient({ fontHexObj, backHexObj }: ContrastPageClientProps) {
  return (
    <Suspense>
      <Component fontHexObj={fontHexObj} backHexObj={backHexObj} />
    </Suspense>
  );
}

const Component = ({ fontHexObj, backHexObj }: ContrastPageClientProps) => {
  // const searchParams = useSearchParams();
  // const search1 = searchParams.get("fontColor");
  // const search2 = searchParams.get("backColor");

  const propsFontHexColor = (prefix = "") => `${prefix}${fontHexObj.r}${fontHexObj.g}${fontHexObj.b}`;
  const propsBackHexColor = (prefix = "") => `${prefix}${backHexObj.r}${backHexObj.g}${backHexObj.b}`;

  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    mode: "onChange",
    defaultValues: { fontColor: propsFontHexColor("#"), backColor: propsBackHexColor("#") },
  });

  const inputTextAttrs = { type: "text", className: "text-black", minLength: 1, maxLength: 50, required: true };
  const fontInputTextAttr = { ...inputTextAttrs, placeholder: "글자 색상", id: "fontColor", name: "fontColor" };
  const backInputTextAttr = { ...inputTextAttrs, placeholder: "배경 색상", id: "backColor", name: "backColor" };

  const { fontColor: watchFontColor, backColor: watchBackColor } = watch();
  // const { fontColor: getFontColor, backColor: getBackColor } = getValues();

  console.log(watchFontColor, watchBackColor);

  const registerFontColor = register("fontColor", {
    required: { value: fontInputTextAttr.required, message: "hex 글자 색상값을 넣어주세요." },
    minLength: { value: fontInputTextAttr.minLength, message: `${fontInputTextAttr.minLength}` },
    maxLength: { value: fontInputTextAttr.maxLength, message: `${fontInputTextAttr.maxLength}` },
    validate: {
      isFullHexColor: (v) => {
        return /^(#|%23)?([0-9a-fA-F]{6})$/i.test(v) ? true : "형식 오류가 발생하였습니다.";
      },
    },
  });

  const registerBackColor = register("backColor", {
    required: { value: backInputTextAttr.required, message: "hex 배경 색상값을 넣어주세요." },
    minLength: { value: backInputTextAttr.minLength, message: `${backInputTextAttr.minLength}` },
    maxLength: { value: backInputTextAttr.maxLength, message: `${backInputTextAttr.maxLength}` },
    validate: {
      isFullHexColor: (v) => {
        return /^(#|%23)?([0-9a-fA-F]{6})$/i.test(v) ? true : "형식 오류가 발생하였습니다.";
      },
    },
  });

  const contrastData = useMemo(() => {}, []);

  return (
    <>
      <form noValidate autoComplete="off" autoCapitalize="off">
        <div className="flex flex-col">
          <label htmlFor={fontInputTextAttr.id}>글자색</label>
          <div className="flex flex-row">
            <input type="color" />
            <input {...fontInputTextAttr} {...registerFontColor} />
          </div>
          <div className="h-4">{errors.fontColor && errors.fontColor.message}</div>
        </div>

        <div className="flex flex-col">
          <label htmlFor={backInputTextAttr.id}>배경색</label>
          <div className="flex flex-row">
            <input type="color" />
            <input {...backInputTextAttr} {...registerBackColor} />
          </div>
          <div className="h-4">{errors.backColor && errors.backColor.message}</div>
        </div>

        <button>11</button>
      </form>
      <div>
        <div>
          <div>명암비</div>
          <div>1:1</div>
        </div>
        <div>
          일반 글자
          <div>AA(4.5:1)</div>
          <div>AAA(7:1)</div>
        </div>
        <div>
          대형 글자
          <div>AA(3:1)</div>
          <div>AAA(4.5:1)</div>
        </div>
        <div>
          <div>svg/아이콘</div>
          <div>AA(3:1)</div>
          <div>AA(4.5:1)</div>
        </div>
      </div>
      <div></div>
    </>
  );
};
