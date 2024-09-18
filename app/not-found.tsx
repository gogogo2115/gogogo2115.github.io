"use client";

import Link from "next/link";

export default function RootNotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
