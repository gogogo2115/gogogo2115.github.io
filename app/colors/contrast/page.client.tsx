"use client";

import { getContrastRatio, hexColorToRgbObj, isValidHexColor, RGB_OBJ, setInputColorValue } from "@/utils/color";

import { ChangeEvent, Suspense, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

type ContrastPageClientProps = { fontHexColor: string; backHexColor: string };
type ContrastFormInput = { fontColor: string; backColor: string };

/**
 * 페이지 시작
 */
export default function ContrastPageClient({ fontHexColor, backHexColor }: ContrastPageClientProps) {
  return (
    <Suspense>
      <Component fontHexColor={fontHexColor} backHexColor={backHexColor} />
    </Suspense>
  );
}

const Component = ({ fontHexColor, backHexColor }: ContrastPageClientProps) => {
  const searchParams = useSearchParams();
  const search1 = searchParams.get("fontColor");
  const search2 = searchParams.get("backColor");

  const defaultFontColor = () => (isValidHexColor(fontHexColor) ? fontHexColor : "#ffffff");
  const defaultBackColor = () => (isValidHexColor(backHexColor) ? backHexColor : "#000000");

  console.log("setInputColorValue", setInputColorValue("rgba(101,201,255, 11)"));

  const {
    register,
    setError,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContrastFormInput>({
    mode: "onChange",
    defaultValues: { fontColor: defaultFontColor(), backColor: defaultBackColor() },
  });

  const { fontColor: watchFontColor, backColor: watchBackColor } = watch();

  const inputAttr = { type: "text", className: "text-black outline-none", minLength: 1, maxLength: 30, required: true },
    inputFontColorAttr = { ...inputAttr, id: "fontColor", name: "fontColor", placeholder: "글자 색상" },
    inputBackColorAttr = { ...inputAttr, id: "backColor", name: "backColor", placeholder: "배경 색상" };

  const registerFontColor = register("fontColor", {
    required: { value: inputFontColorAttr.required, message: "HEX 글자 색상값을 넣어주세요." },
    minLength: { value: inputFontColorAttr.minLength, message: `글자 색상 ${inputFontColorAttr.minLength}자 이상을 입력해주세요.` },
    maxLength: { value: inputFontColorAttr.maxLength, message: `글자 색상 ${inputFontColorAttr.maxLength}자 이하로 입력해주세요.` },
    validate: {
      s: (v) => v !== "" || "HEX 글자 색상값을 넣어주세요.",
    },
    onBlur: (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const value = target.value;
    },
  });

  const registerBackColor = register("backColor", {
    required: { value: inputBackColorAttr.required, message: "HEX 베경 색상값을 넣어주세요." },
    minLength: { value: inputBackColorAttr.minLength, message: `베경 색상 ${inputBackColorAttr.minLength}자 이상을 입력해주세요.` },
    maxLength: { value: inputBackColorAttr.maxLength, message: `베경 색상 ${inputBackColorAttr.maxLength}자 이하로 입력해주세요.` },
    validate: {
      s: (v) => v !== "" || "HEX 베경 색상값을 넣어주세요.",
    },
    onBlur: (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      const value = target.value;
    },
  });

  const onChangeColor = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.target;
    const dataColor = target.dataset["color"] as "fontColor" | "backColor"; // data 확인
    if (["fontColor", "backColor"].includes(dataColor)) {
      // 결과값 오류 발생 방지
      const targetType = target.type.toLowerCase();
      if (targetType !== "color") {
        setError(dataColor, { message: "색상 선택 입력 오류" }, { shouldFocus: true });
        return;
      }

      const value = target.value.toUpperCase();
      if (isValidHexColor(value)) {
        setValue(dataColor, value);
        return;
      }
    }
  };

  const contrastData = useMemo(() => {
    // // const toFontRgbObj
    // console.log("useMemo", fontRgbObj, backRgbObj, getContrastRatio(fontRgbObj, backRgbObj));

    // return getContrastRatio(fontRgbObj, backRgbObj);

    return 1;
  }, [watchFontColor, watchBackColor]);

  return (
    <>
      <form noValidate autoComplete="off" autoCapitalize="off">
        <div className="flex flex-col">
          <label htmlFor={inputFontColorAttr.id} className="select-none cursor-pointer">
            글자 색상
          </label>
          <div className="flex">
            <input type="color" className="w-8 h-8 aspect-[1/1] cursor-pointer" data-color="fontColor" onChange={onChangeColor} readOnly defaultValue={setInputColorValue(watchFontColor)} />
            <input {...registerFontColor} {...inputFontColorAttr} />
          </div>
          <div className="h-6">{errors.fontColor && errors.fontColor.message}</div>
        </div>

        <div className="flex flex-col">
          <label htmlFor={inputBackColorAttr.id} className="select-none cursor-pointer">
            배경 색상
          </label>
          <div className="flex">
            <input type="color" className="w-8 h-8 aspect-[1/1] cursor-pointer" data-color="backColor" onChange={onChangeColor} readOnly defaultValue={setInputColorValue(watchBackColor)} />
            <input {...registerBackColor} {...inputBackColorAttr} />
          </div>
          <div className="h-6">{errors.backColor && errors.backColor.message}</div>
        </div>
      </form>
    </>
  );
};
