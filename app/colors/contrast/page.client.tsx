"use client";

import { type HEX_OBJ } from "@/utils/color";

import { ChangeEvent, MouseEvent, Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

type ContrastPageClientProps = { fontHexObj: HEX_OBJ; backHexObj: HEX_OBJ };
type Form = { fontColor: string; backColor: string };

function Component({ fontHexObj, backHexObj }: ContrastPageClientProps) {
  const searchParams = useSearchParams();
  const search1 = searchParams.get("fontColor");
  const search2 = searchParams.get("backColor");

  const fontHexColor = (prefix = "") => `${prefix}${fontHexObj.r}${fontHexObj.g}${fontHexObj.b}`;
  const backHexColor = (prefix = "") => `${prefix}${backHexObj.r}${backHexObj.g}${backHexObj.b}`;

  const { register, setValue } = useForm<Form>({
    mode: "onChange",
    defaultValues: { fontColor: fontHexColor("#"), backColor: backHexColor("#") },
  });

  const inputTextAttrs = { type: "text", className: "text-black", minLength: 1, maxLength: 50, required: true };
  const fontInputTextAttr = { ...inputTextAttrs, id: "fontColor", name: "fontColor", placeholder: "글자 색상" };
  const backInputTextAttr = { ...inputTextAttrs, id: "backColor", name: "backColor", placeholder: "배경 색상" };

  const registerFontColor = register("fontColor", {
    required: { value: true, message: "섹상값을 넣어주세요." },
    minLength: { value: fontInputTextAttr.minLength, message: `${fontInputTextAttr.minLength}` },
    maxLength: { value: fontInputTextAttr.maxLength, message: `${fontInputTextAttr.maxLength}` },
    validate: {},
  });

  const registerBackColor = register("backColor", {
    required: { value: true, message: "섹상값을 넣어주세요." },
    minLength: { value: backInputTextAttr.minLength, message: `${backInputTextAttr.minLength}` },
    maxLength: { value: backInputTextAttr.maxLength, message: `${backInputTextAttr.maxLength}` },
    validate: {},
  });

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target;
    const type = target.type;

    // input 형식 오류로 실행 처리하지 않음
    if (type !== "color") return;
    return;
  };

  return (
    <Suspense>
      {search1 && search1}
      {search2 && search2}
      <form noValidate autoComplete="off" autoCapitalize="off">
        <div>
          <label htmlFor={fontInputTextAttr.id}>글자색</label>
          <input type="color" />
          <input {...fontInputTextAttr} />
          <button type="button">random</button>
        </div>

        <div>
          <label htmlFor={backInputTextAttr.id}>배경색</label>
          <input type="color" />
          <input {...backInputTextAttr} />
          <button type="button">random</button>
        </div>

        <button>11</button>
      </form>

      <div>
        <div>
          <div>AA(4.5:1)</div>
          <div>AAA(7:1)</div>
        </div>
        <div>
          <div>AA(3:1)</div>
          <div>AAA(4.5:1)</div>
        </div>
        <div>
          <div>AA(3:1)</div>
        </div>
      </div>

      <div></div>
    </Suspense>
  );
}

export default function ContrastPageClient({ fontHexObj, backHexObj }: ContrastPageClientProps) {
  return <Component fontHexObj={fontHexObj} backHexObj={backHexObj} />;
}
