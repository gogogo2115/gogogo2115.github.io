/**
 * Fisher–Yates 방식으로 배열을 무작위로 섞어 새 배열로 반환합니다.
 *
 * @template T
 * @param arr - 섞을 대상 배열(읽기 전용 배열도 가능). null/undefined면 빈 배열 반환.
 * @returns 섞인 새 배열(원본은 변경하지 않음).
 */
export const arrayShuffle = <T>(arr?: readonly T[] | null): T[] => {
  if (!arr || !Array.isArray(arr)) return [];

  const targetArr = [...arr];
  const len = targetArr.length;
  if (len <= 1) return targetArr;

  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [targetArr[i], targetArr[j]] = [targetArr[j], targetArr[i]];
  }
  return targetArr;
};

type StringShuffleOptions = {
  /**
   * true면 Intl.Segmenter(grapheme)로 “눈에 보이는 글자 단위”로 쪼개서 섞습니다.
   * (지원되지 않는 런타임이면 자동으로 fallback 처리)
   */
  useGrapheme?: boolean;

  /**
   * Segmenter 로케일 힌트(선택).
   * 생략하면 런타임 기본 로케일을 사용합니다.
   */
  locale?: string;
};

/**
 * 문자열을 문자(또는 grapheme) 단위로 섞어서 반환합니다.
 *
 * @param str - 섞을 문자열. null/undefined면 빈 문자열 반환.
 * @param opts - 옵션(기본: grapheme 미사용).
 * @returns 섞인 문자열.
 */
export const stringShuffle = (str?: string | null, options: StringShuffleOptions = {}): string => {
  if (!str || typeof str !== "string") return "";
  if (str.length <= 1) return str;

  const { useGrapheme = false, locale } = options;

  if (useGrapheme && typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
    const parts = Array.from(segmenter.segment(str), (s) => s.segment);
    return arrayShuffle(parts).join("");
  }

  return arrayShuffle([...str]).join("");
};
