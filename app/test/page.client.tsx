"use client";

import { ChangeEvent } from "react";

export default function TestPageClient() {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    return;
  };

  return (
    <div>
      <input onChange={onChange} className="text-black" />
    </div>
  );
}
