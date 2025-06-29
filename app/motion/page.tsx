"use client"; // 이 페이지가 클라이언트 컴포넌트임을 명시해요. 브라우저 API를 사용하니까 필수!

import { useDeviceMotion } from "@/hooks/useDeviceMotion"; // useDeviceMotion 훅 경로를 맞춰주세요!
// 예시: 만약 useDeviceMotion.ts 파일이 project_root/hooks/useDeviceMotion.ts 에 있다면 위 경로처럼요.

export default function MotionPage() {
  const { supported, permission, isListening, data, start, stop, requestPermission } = useDeviceMotion();

  return (
    <main className="p-8">
      <h1 className="text-xl font-semibold mb-4">Device Motion Example</h1>

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
        <h2 className="font-medium mt-4">Acceleration (중력 제외)</h2>
        <div>x: {data.acceleration.x?.toFixed(2) ?? "N/A"}</div>
        <div>y: {data.acceleration.y?.toFixed(2) ?? "N/A"}</div>
        <div>z: {data.acceleration.z?.toFixed(2) ?? "N/A"}</div>

        <h2 className="font-medium mt-4">Acceleration Including Gravity (중력 포함)</h2>
        <div>x: {data.accelerationIncludingGravity.x?.toFixed(2) ?? "N/A"}</div>
        <div>y: {data.accelerationIncludingGravity.y?.toFixed(2) ?? "N/A"}</div>
        <div>z: {data.accelerationIncludingGravity.z?.toFixed(2) ?? "N/A"}</div>

        <h2 className="font-medium mt-4">Rotation Rate (회전율)</h2>
        <div>alpha: {data.rotationRate.alpha?.toFixed(2) ?? "N/A"}</div>
        <div>beta: {data.rotationRate.beta?.toFixed(2) ?? "N/A"}</div>
        <div>gamma: {data.rotationRate.gamma?.toFixed(2) ?? "N/A"}</div>

        <h2 className="font-medium mt-4">Interval</h2>
        <div>interval: {data.interval?.toFixed(2) ?? "N/A"} ms</div>
      </div>
    </main>
  );
}
