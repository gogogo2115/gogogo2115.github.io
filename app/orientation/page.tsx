"use client";

import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";

export default function OrientationPage() {
  const { supported, permission, isListening, data, start, stop, requestPermission } = useDeviceOrientation();

  return (
    <main className="p-8">
      <h1 className="text-xl font-semibold mb-4">Device Orientation Example</h1>

      <div className="space-y-1">
        <div>지원 여부: {supported ? "✅ 지원됨" : "❌ 미지원"}</div>
        <div>권한 상태: {permission}</div>
        <div>수신 중: {isListening ? "🎧 Listening" : "🛑 Stopped"}</div>
      </div>

      <div className="mt-4 space-x-3">
        <button onClick={start} className="bg-blue-500 text-white px-4 py-2 rounded">
          시작 (권한 자동 요청)
        </button>
        <button onClick={stop} className="bg-gray-600 text-white px-4 py-2 rounded">
          중지
        </button>
        <button onClick={requestPermission} className="bg-green-600 text-white px-4 py-2 rounded">
          권한 수동 요청
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <div>alpha: {data.alpha?.toFixed(2) ?? "N/A"}</div>
        <div>beta: {data.beta?.toFixed(2) ?? "N/A"}</div>
        <div>gamma: {data.gamma?.toFixed(2) ?? "N/A"}</div>
        <div>absolute: {String(data.absolute)}</div>
      </div>
    </main>
  );
}
