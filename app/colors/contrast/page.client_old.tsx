"use client";
import { throttle } from "lodash";
import { type ChangeEvent, useMemo, useState, useEffect, Suspense, MouseEvent } from "react";

import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";
import { isClient } from "@/utils/device";
import { hexToRGB, randomHexColor } from "../toColor";

type ContrastClientPageProps = {
  defaultTextColor: string;
  defaultBackgroundColor: string;
};

const inputTextProps = {
  type: "text",
  autoComplete: "off",
  className: "text-black outline-none h-10 p-1",
  maxLength: 7,
};

const inputColorProps = {
  type: "color",
  className: "outline-none w-10 h-10",
};

const validFullHexColorValue = (value: string) => {
  value = value.trim();
  const match = value.match(/^(#)?([a-fA-F0-9]{6})$/i);
  if (match) return { prefix: match[1] ?? "", isMatch: true, color: match[2] ?? "" };
  return { prefix: "", isMatch: false, color: value };
};

const inputColorValue = (value: string) => {
  value = value.trim();
  return /^(#)([a-fA-F0-9]{6})$/i.test(value) ? value : "#000000";
};

export default function ContrastPageClient({ defaultTextColor, defaultBackgroundColor }: ContrastClientPageProps) {
  const client = isClient();
  const [textColor, setTextColor] = useState<string>(defaultTextColor);
  const [backgroundColor, setBackgroundColor] = useState<string>(defaultBackgroundColor);

  const contrastRatio = useMemo(() => {
    try {
      const textToRGB = hexToRGB(textColor);
      const backgroundToRGB = hexToRGB(backgroundColor);
      if (textToRGB == null || backgroundToRGB == null) return 0;
      const { r: tR, g: tG, b: tB } = textToRGB;
      const { r: bR, g: bG, b: bB } = backgroundToRGB;

      console.log(textToRGB);
      console.log(backgroundToRGB);
      //
    } catch (e) {
      return 0;
    }
  }, [textColor, backgroundColor]);

  const onChangeTextPalette = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const value = target.value;
    setTextColor(() => value);
  };

  const onChangeBackgroundPalette = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const value = target.value;
    setBackgroundColor(() => value);
  };

  const onChangeTextColor = throttle((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const value = target.value;
    const { isMatch, prefix } = validFullHexColorValue(value);
    setTextColor(() => {
      if (isMatch) return prefix === "#" ? value : "#" + value;
      return value;
    });
  }, 100);

  const onChangeBackgroundColor = throttle((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    const value = target.value;
    const { isMatch, prefix } = validFullHexColorValue(value);
    setBackgroundColor(() => {
      if (isMatch) return prefix === "#" ? value : "#" + value;
      return value;
    });
  }, 100);

  const onClickRandomButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("클릭");
    const target = e.currentTarget;
    const dataTarget = target.dataset["randomTarget"] ?? "";
    if (dataTarget == "textColor") {
      setTextColor(randomHexColor());
    }
    if (dataTarget == "backgroundColor") {
      setBackgroundColor(randomHexColor());
    }
  };

  return (
    <Suspense fallback={<div></div>}>
      <div className="flex flex-row h-10 relative">
        <input {...inputColorProps} key={`textPalette`} id="textPalette" name="textPalette" onChange={onChangeTextPalette} value={inputColorValue(textColor)} />
        <input {...inputTextProps} key={`textColor`} id="textColor" name="textColor" onChange={onChangeTextColor} value={textColor} />
        <button type="button" title="글자색 랜덤 색상" data-random-target="textColor" onClick={onClickRandomButton}>
          랜덤
        </button>
      </div>
      <div className="flex flex-row h-10 relative">
        <input {...inputColorProps} key={`backgroundPalette`} id="backgroundPalette" name="backgroundPalette" onChange={onChangeBackgroundPalette} value={inputColorValue(backgroundColor)} />
        <input {...inputTextProps} key={`backgroundColor`} id="backgroundColor" name="backgroundColor" onChange={onChangeBackgroundColor} value={backgroundColor} />
        <button type="button" title="배경색 랜덤 색상" data-random-target="backgroundColor" onClick={onClickRandomButton}>
          랜덤
        </button>
      </div>

      <div className="p-2 rounded-xl w-60 h-40" style={{ backgroundColor: `${backgroundColor}` }}>
        <div style={{ color: `${textColor}` }}>
          <div>ssssssssssssss</div>
        </div>
      </div>
    </Suspense>
  );
}
