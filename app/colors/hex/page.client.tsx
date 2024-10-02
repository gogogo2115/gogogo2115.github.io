"use client";

import { throttle } from "lodash";
import { ChangeEvent, useMemo, useState } from "react";

type ColorsHexClientProps = { defaultFullHexColor: string };

export default function ColorsHexClient({ defaultFullHexColor }: ColorsHexClientProps) {
  //
  const [hexColor, setHexColor] = useState(defaultFullHexColor);

  const data = useMemo(() => {}, [hexColor]);

  const onChangeHexColor = throttle((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    setHexColor(() => target.value);
  }, 100);

  return (
    <>
      <input type="text" className="text-black" placeholder="#ffffff" maxLength={7} defaultValue={defaultFullHexColor} onChange={onChangeHexColor} />
      <></>
    </>
  );
}
