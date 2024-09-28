import { isNavigator } from "./device";

// export type NavigatorShareData = {
//   title?: string; // 공유 제목
//   text?: string; // 공유 설명
//   url?: string; // 공유할 URL
//   files?: File[]; // 공유할 파일 배열
// };

export type Options = {
  onSuccess?: () => void; // 공유 성공
  onFailure?: (err?: string) => void; // 공유 실패
  onCancel?: () => void; // 공유 취소
  onNotSupported?: () => void; // 공유 미지원
  supportedMimeTypes?: string[]; // 지원되는 MIME 타입 목록
};

/**
 * navigator.share 지원 여부를 확인
 * @returns {Boolean} 결과값
 */
export const isNavigatorShareSupported = (): boolean => isNavigator() && typeof navigator.share === "function" && typeof navigator.canShare === "function";

/**
 * 공유할 파일 MIME 타입 검증
 * @param {File[]} files - 공유할 파일 목록
 * @param {string[]} supportedMimeTypes - 지원되는 MIME 타입 목록
 * @returns {boolean} 파일이 지원되는지 여부
 */
const areFilesSupported = (files: File[], supportedMimeTypes: string[]): boolean => {
  if (supportedMimeTypes.length === 0) return false; // 빈 배열이면 지원하지 않음

  // supportedMimeTypes 및 file.type을 소문자로 변환하여 비교
  return files.every((file) => supportedMimeTypes.map((mime) => mime.toLowerCase()).includes(file.type.toLowerCase()));
  // return files.every((file) => supportedMimeTypes.includes(file.type)); // 대소문자 이슈가 생길 수 있어서 주석처리
};

/**
 * 공유 기능 구현
 * @param {ShareData} data - 공유할 데이터 (title, text, url, files 등)
 * @param {Options} options - 콜백 함수들 (성공, 실패, 취소, 미지원, 지원되는 MIME 타입)
 */
export const share = async (data: ShareData, options: Options = {}): Promise<void> => {
  const { onNotSupported, onSuccess, onFailure, onCancel, supportedMimeTypes } = options;

  // 지원 여부 확인
  if (!isNavigatorShareSupported()) {
    onNotSupported && onNotSupported();
    return;
  }

  // 파일 검증
  if (data.files && data.files.length > 0 && supportedMimeTypes && !areFilesSupported(data.files, supportedMimeTypes)) {
    onFailure && onFailure("지원되지 않는 파일 형식입니다.");
    return;
  }

  // 공유할 수 없는 데이터인 경우 처리
  if (navigator.canShare(data) === false) {
    onFailure && onFailure("공유할 수 없는 자료입니다."); // 파일 공유가 불가능한 경우 처리
    return;
  }

  try {
    await navigator.share(data);
    // 공유 성공
    onSuccess && onSuccess();
  } catch (e) {
    if ((e instanceof Error && e.name === "AbortError") || (e instanceof DOMException && e.code === DOMException.ABORT_ERR)) {
      // 공유가 취소된 경우 처리
      onCancel && onCancel();
    } else {
      // 다른 에러일 경우 처리
      onFailure && onFailure(e instanceof Error ? e.message : "공유 중 오류가 발생했습니다.");
    }
  }
};

/*
테스트용 예제 샘플

const files = [new File(["Hello, world!"], "hello.txt", { type: "text/plain" })];

share({
  title: "파일 공유",
  text: "이 파일을 확인해보세요!",
  files: files,
  url: "https://www.example.com"
}, {
  supportedMimeTypes: [], // 빈 배열: 아무 파일도 지원하지 않음
  onSuccess: () => alert("성공적으로 공유되었습니다!"),
  onFailure: (error) => alert(`공유 실패: ${error}`),
  onCancel: () => alert("공유가 취소되었습니다."),
  onNotSupported: () => alert("이 브라우저는 공유 API를 지원하지 않습니다."),
});

// 다중 파일을 사용한 공유 예시
const file1 = new File(["Hello, world!"], "hello.txt", { type: "text/plain" });
const file2 = new File(["Another file"], "another.txt", { type: "text/plain" });

initiateShare({
  title: "여러 파일 공유",
  text: "이 파일들을 확인해보세요!",
  files: [file1, file2],
}, {
  supportedMimeTypes: ["text/plain"], // 지원되는 파일 형식 (MIME 타입)
  onSuccess: () => alert("성공적으로 공유되었습니다!"),
  onFailure: (error) => alert(`공유 실패: ${error}`),
  onCancel: () => alert("공유가 취소되었습니다."),
  onNotSupported: () => alert("이 브라우저는 공유 API를 지원하지 않습니다."),
});
*/
