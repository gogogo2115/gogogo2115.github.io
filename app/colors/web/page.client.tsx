"use client";

import { copyToClipboard, isCopyClipboardSupported } from "@/utils/copyToClipboard";
import { type Data } from "./data";

type ColorsWebPageClientProps = { data: Data[] };

export default function ColorsWebPageClient({ data }: ColorsWebPageClientProps) {
  const isCopySupported = isCopyClipboardSupported();

  return (
    <div className="grid gap-4 p-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
      {data.map((v, i) => {
        const { name, hex, rgb } = v;
        const { r, g, b } = rgb;
        const rgbText = `rgb(${r},${g},${b})`;

        return (
          <div key={i} className="max-w-sm h-[200px] rounded-xl p-2 block text-outline border-white border-solid border-[1px]" style={{ backgroundColor: name }}>
            <div className="flex flex-row justify-between">
              <div>{name}</div>
              {isCopySupported && (
                <button type="button" className="text-outline border-white" title={`${name} 복사`} onClick={() => copyToClipboard(name)}>
                  복사
                </button>
              )}
            </div>
            <div className="flex flex-row justify-between">
              <div>{hex}</div>
              {isCopySupported && (
                <button type="button" className="text-outline border-white" title={`${hex} 복사`} onClick={() => copyToClipboard(hex)}>
                  복사
                </button>
              )}
            </div>
            <div className="flex flex-row justify-between">
              <div>{rgbText}</div>
              {isCopySupported && (
                <button type="button" className="text-outline border-white" title={`${rgbText} 복사`} onClick={() => copyToClipboard(rgbText)}>
                  복사
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
