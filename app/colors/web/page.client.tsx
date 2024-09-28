"use client";

import { copyToClipboard, isCopyClipboardSupported } from "@/utils/copyToClipboard";
import { type Data } from "./data";

type ColorsWebPageClientProps = { data: Data[] };

export default function ColorsWebPageClient({ data }: ColorsWebPageClientProps) {
  const isCopySupported = isCopyClipboardSupported();

  return (
    <div>
      {data.map((v, i) => {
        const {
          name,
          hex,
          rgb: { r, g, b },
        } = v;
        const rgbText = `rgb(${r},${g},${b})`;

        return (
          <div key={i} className="w-[240px] h-[200px] rounded-xl p-2 block text-outline border-white border-solid border-[1px]" style={{ backgroundColor: name }}>
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
