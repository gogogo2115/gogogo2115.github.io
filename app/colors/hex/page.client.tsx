"use client";

import { useState } from "react";

type ColorsHexClientProps = { defaultFullHexColor: string };

export default function ColorsHexClient({ defaultFullHexColor }: ColorsHexClientProps) {
  return (
    <>
      <input type="text" className="text-black" placeholder="#ffffff" maxLength={7} />
      <></>
    </>
  );
}
