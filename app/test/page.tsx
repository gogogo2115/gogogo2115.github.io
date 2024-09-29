"use client";

import { share } from "@/utils/share";
import { MouseEvent } from "react";

export default function TestPage() {
  const onNotSupported = () => {
    alert("미지원");
  };

  const onFailure = () => {
    alert("aaaa");
  };

  const onClickShare = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const file1 = new File(["Hello, world!"], "hello.txt", { type: "text/plain" });
    const file2 = new File(["Another file"], "another.txt", { type: "text/plain" });
    const data = {
      title: "여러 파일 공유",
      text: "이 파일들을 확인해보세요!",
      files: [file1, file2],
    };
    const options = {
      supportedMimeTypes: ["text/plain"], // 지원되는 파일 형식 (MIME 타입)
      onSuccess: () => alert("성공적으로 공유되었습니다!"),
      onFailure: (error: any) => alert(`공유 실패: ${error}`),
      onCancel: () => alert("공유가 취소되었습니다."),
      onNotSupported: () => alert("이 브라우저는 공유 API를 지원하지 않습니다."),
    };

    share(data, options);
    return;
  };

  return (
    <>
      <button onClick={onClickShare}>공유</button>
    </>
  );
}
