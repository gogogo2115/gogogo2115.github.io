"use client";

import { ErinnTimeOption, ErinnTimeResult, errinTimeV2 } from "@/utils/mabinogi";
import { useEffect, useState } from "react";

export default function MabinogiPage() {
  const [errinTimeOpt, setErrinTimeOpt] = useState<ErinnTimeOption>({
    timeFormat: "24h",
    truncateTo10: false,
  });
  const [errinTime, setErinnTime] = useState<ErinnTimeResult | null>(null);

  useEffect(() => {
    // 첫 계산 즉시 실행
    setErinnTime(errinTimeV2(errinTimeOpt));

    // 클라이언트에서만 실행되도록 useEffect에서 타이머 설정
    const interval = setInterval(() => {
      setErinnTime(errinTimeV2(errinTimeOpt));
    }, 500);

    return () => clearInterval(interval);
  }, [errinTimeOpt]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      {/* 시간 표시 카드 */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md px-8 py-6 text-center">
        {errinTime ? (
          <div className="min-h-[3rem]">
            <div className="text-gray-500 text-sm mb-2">
              표시 형식: {errinTime.timeFormat} / {errinTimeOpt.truncateTo10 ? "10분 단위" : "1분 단위"}
            </div>
            <div className="text-4xl font-bold text-gray-800 flex items-center justify-center">
              {errinTime.meridiem} {errinTime.hour}:{errinTime.min}
            </div>
          </div>
        ) : (
          <div className="text-3xl font-bold text-gray-400 min-h-[3rem] flex items-center justify-center">로딩 중...</div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="w-full max-w-md flex gap-4">
        <button
          type="button"
          onClick={() => setErrinTimeOpt((v) => ({ ...v, truncateTo10: !v.truncateTo10 }))}
          className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition cursor-pointer"
        >
          {errinTimeOpt.truncateTo10 ? "1분 단위 표시" : "10분 단위 표시"}
        </button>

        <button
          type="button"
          onClick={() =>
            setErrinTimeOpt((v) => ({
              ...v,
              timeFormat: v.timeFormat === "12h" ? "24h" : "12h",
            }))
          }
          className="flex-1 px-4 py-2 rounded-lg bg-green-500 text-white font-medium shadow hover:bg-green-600 transition cursor-pointer"
        >
          {errinTimeOpt.timeFormat === "12h" ? "24시간제로 보기" : "12시간제로 보기"}
        </button>
      </div>
    </div>
  );
}
