"use client";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { isClient } from "@/utils/device";

import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { calculateNewBMI, calculateStandardBMI, result_kosso_bmi, result_who_bmi } from "./calculateBMI";

type BMIFormInputs = {
  age: number; // 나이
  sex: 0 | 1; // 성별  성별(여성=0, 남성=1)
  heightCm: number; // cm
  weightKg: number; // kg
};

export default function BmiPageClient() {
  const client = isClient();

  const {
    // watch,
    // getValues,
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<BMIFormInputs>({ mode: "onSubmit", defaultValues: { age: 20 } });

  const inputAttr = { type: "text", className: "text-black p-1 font-bold", step: "any" };
  const heightCmInputAttr = { ...inputAttr, min: 10, max: 500, id: "heightCm", title: "키(cm)을 입력해주세요." };
  const weightKgInputAttr = { ...inputAttr, min: 10, max: 500, id: "weightKg", title: "몸무게(kg)를 입력해주세요." };

  const [standardBmiData, setStandardBmiData] = useState<null | number>(null);
  const [newBmiData, setNewBmiData] = useState<null | number>(null);

  // 키(cm) register
  const heightCmRegister = register("heightCm", {
    required: { value: true, message: "키(cm)을 입력해주세요" },
    min: { value: heightCmInputAttr.min, message: `키(cm)는 최소 ${heightCmInputAttr.min}cm 이상이어야 합니다.` },
    max: { value: heightCmInputAttr.max, message: `키(cm)는 최대 ${heightCmInputAttr.max}cm 이하여야 합니다.` },
    onBlur: (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (value > heightCmInputAttr.max) {
      }
      if (value > heightCmInputAttr.min) {
      }
    },
  });

  // 몸무게(kg) register
  const weightKgRegister = register("weightKg", {
    required: { value: true, message: "몸무게(kg)를 입력해주세요" },
    min: { value: weightKgInputAttr.min, message: `몸무게(kg)는 최소 ${weightKgInputAttr.min}kg 이상이어야 합니다.` },
    max: { value: weightKgInputAttr.max, message: `몸무게(kg)는 최대 ${weightKgInputAttr.max}kg 이하여야 합니다.` },
    onBlur: (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      if (value > weightKgInputAttr.max) {
      }
      if (value > weightKgInputAttr.min) {
      }
    },
  });

  const calculateSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => {
      const { heightCm, weightKg } = data;
      const height = typeof heightCm !== "number" ? Number(heightCm) : heightCm;
      const weight = typeof weightKg !== "number" ? Number(weightKg) : weightKg;

      if (isNaN(height) || height <= 0) {
        setError("heightCm", { message: "키(cm)의 입력값 오류 " });
        setFocus("heightCm");
        return;
      }

      if (isNaN(weight) || weight <= 0) {
        setError("weightKg", { message: "몸무게(kg)의 입력값 오류 " });
        setFocus("weightKg");
        return;
      }

      const standardBMI = calculateStandardBMI(weightKg, heightCm);
      const newBMI = calculateNewBMI(weightKg, heightCm);

      if (standardBMI !== null) {
        setStandardBmiData(standardBMI);
      }

      if (newBMI !== null) {
        setNewBmiData(newBMI);
      }
    })();
  };

  /*
  옛날부터 가짜뉴스 진짜 좋아했음.
  
  */

  const onReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
  };

  useIsomorphicLayoutEffect(() => {
    if (client) {
      console.log("완료");
    }
  }, []);

  console.log(newBmiData, standardBmiData);

  return (
    <>
      <form onSubmit={calculateSubmit} noValidate autoComplete="off">
        <div className="flex flex-col">
          <div className="flex flex-row gap-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="heightCm">
              키(cm)
            </label>
            <input {...heightCmInputAttr} {...heightCmRegister} />
            <div>{errors.heightCm && errors.heightCm.message}</div>
          </div>

          <div className="flex flex-row gap-5">
            <label className="font-bold" htmlFor="weightKg">
              몸무게(kg)
            </label>
            <input {...weightKgInputAttr} {...weightKgRegister} />
            <div>{errors.weightKg && errors.weightKg.message}</div>
          </div>
        </div>

        <div>
          <button type="submit">계산</button>
          <button type="reset" onClick={onReset}>
            초기화
          </button>
        </div>
      </form>

      <div>
        {standardBmiData !== null && <>{standardBmiData}</>} {newBmiData !== null && <>{newBmiData}</>}
      </div>

      <div className="text-sm break-keep font-bold">계산 결과는 의학적 판단의 근거로 사용할 수 없는 참고 자료입니다. 정확한 상태와 진단은 의료 전문가와의 상담을 통해 확인하시기 바랍니다.</div>
    </>
  );
}
