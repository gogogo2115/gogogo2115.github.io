"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

type ContrastClientPageProps = { defaultFontColor: string; defaultBackgroundColor: string };
type FormInputColor = { fontColor: string; backgroundColor: string };

const colorValue = (value: string | undefined) => {
  value = (value ?? "").trim();
};

export default function ContrastPageClient({ defaultFontColor, defaultBackgroundColor }: ContrastClientPageProps) {
  const defaultValues = { fontColor: defaultFontColor, backgroundColor: defaultBackgroundColor };
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormInputColor>({ mode: "all", defaultValues });

  const watchFields = watch(); // 모든 필드를 감시

  const inputMinLength = 3;
  const inputMaxLength = 20;

  const colorRegex = new RegExp(`^((#)?([a-fA-F0-9]{6}))$`, "i");

  const fontColorRegister = register("fontColor", {
    required: { value: true, message: "fontColor를 반드시 입력해주세요." },
    minLength: { value: inputMinLength, message: `fontColor 문자열 ${inputMinLength}자 미만입니다` },
    maxLength: { value: inputMaxLength, message: `fontColor 문자열 ${inputMaxLength}자 초과하였습니다.` },
    pattern: { value: colorRegex, message: "#ffffff 형식으로 넣어주세요." },
    validate: {
      emptyValue: (value) => (value === "" ? "빈 값을 허용하지 않습니다." : true),
    },
  });

  return (
    <>
      <input {...fontColorRegister} className="text-black" />
      <p className="text-red-500 h-10">{errors.fontColor && errors.fontColor.message}</p>
    </>
  );
}
