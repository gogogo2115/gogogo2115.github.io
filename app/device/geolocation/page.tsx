"use client";

import { useGeolocationCurrentPosition } from "@/hooks/useGeolocation";
import { useEffect, useState } from "react";

export default function LocationPage() {
  const { position, fetchPosition } = useGeolocationCurrentPosition({
    fetchOnMount: true,
    positionOptions: {
      enableHighAccuracy: true,
      timeout: 10000,
    },
  });

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">현재 위치 확인</h1>

      <div className="mb-4">
        <p>
          <strong>권한 상태:</strong>
        </p>
        {/* {loading && <p className="text-blue-600">위치 정보를 가져오는 중...</p>}
        {error && <p className="text-red-500">에러: {typeof error === "string" ? error : error.message}</p>} */}
        {position && (
          <p className="text-green-700">
            위도: {position.coords.latitude || 0}, 경도: {position.coords.longitude || 0}
          </p>
        )}
      </div>

      <button onClick={fetchPosition} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        위치 다시 가져오기
      </button>
    </main>
  );
}
// https://so-so.dev/web/about-navigator/
