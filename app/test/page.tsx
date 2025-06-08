"use client";

import { copyToClipboard } from "@/utils/copyToClipboard";
import { share } from "@/utils/share";

export default function TestPage() {
  const handleShareClick = () => {
    share(
      { url: "http://naver.com", text: "안녕하세요", title: "반갑습니다" },
      {
        onSuccess: () => {
          alert("공유성공");
        },
        onCancel: () => {
          alert("공유취소");
        },
        onFailure: () => {
          alert("공유실패");
        },
      }
    );
  };

  const handleCopyClick = () => {
    copyToClipboard("11111", {
      onSuccess: () => {
        alert("성공");
      },
      onFailure: (m) => {
        console.log(m);
        alert("실패");
      },
    });
  };

  return (
    <>
      <button onClick={handleShareClick}>aa</button>
      <button onClick={handleCopyClick}>aa</button>
    </>
  );
}

// const BUILD_DATE_ISO = (process.env.BUILD_DATE_ISO ?? "호출 실패").trim();
// const BUILD_RAND_KEY = (process.env.BUILD_RAND_KEY ?? "호출 실패").trim();

// const PACKAGE_NAME = (process.env.NEXT_PUBLIC_CONFIG_PACKAGE_NAME ?? "호출 실패").trim();
// const PACKAGE_VERSION = (process.env.NEXT_PUBLIC_CONFIG_PACKAGE_VERSION ?? "호출 실패").trim();
// const NEXT_VERSION = (process.env.NEXT_PUBLIC_CONFIG_NEXT_VERSION ?? "호출 실패").trim();

// export default function TestPage() {
//   return (
//     <>
//       <div>{process.env.NODE_ENV}</div>
//       <div>BUILD_DATE_ISO: {BUILD_DATE_ISO}</div>
//       <div>BUILD_RAND_KEY: {BUILD_RAND_KEY}</div>
//       <div>PACKAGE_NAME: {PACKAGE_NAME}</div>
//       <div>PACKAGE_VERSION: {PACKAGE_VERSION}</div>
//       <div>NEXT_VERSION: {NEXT_VERSION}</div>
//     </>
//   );
// }
