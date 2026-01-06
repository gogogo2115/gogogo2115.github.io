/**
 * Fisher–Yates(=Knuth) 셔플로 배열을 균등하게 무작위 섞어 **새 배열**로 반환합니다.
 *
 * - 원본 배열은 변경하지 않습니다(불변).
 * - `random`을 주입할 수 있어 테스트/재현(시드 RNG) 또는 다른 난수원(예: crypto) 사용이 가능합니다.
 *
 * @template T
 * @param arr - 섞을 대상 배열(읽기 전용 배열도 가능). `null/undefined`면 빈 배열을 반환합니다.
 * @param random - 난수 생성기(기본: `Math.random`).
 *   - **권장 계약:** `0 <= random() < 1` 범위의 `number` 반환.
 *   - 계약을 어겨 `1`을 반환하더라도 인덱스가 튀지 않도록 내부에서 안전 처리합니다.
 * @returns 섞인 새 배열. (원본은 변경하지 않음)
 *
 */
export const arrayShuffle = <T>(arr?: readonly T[] | null, random: () => number = Math.random): T[] => {
  if (!arr || !Array.isArray(arr)) return [];

  const targetArr = [...arr];
  const len = targetArr.length;
  if (len <= 1) return targetArr;

  for (let i = len - 1; i > 0; i--) {
    const r = random();
    const u = Number.isFinite(r) && r >= 0 && r < 1 ? r : 0;
    const j = Math.floor(u * (i + 1));
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
  locale?: Intl.LocalesArgument;

  /**
   * 난수 생성기 주입(기본: Math.random).
   * 계약: [0, 1) 범위의 number를 반환해야 합니다. (0 <= random() < 1)
   * (실수로 1을 반환해도 안전하게 처리되도록 내부에서 방어합니다)
   */
  random?: () => number;
};

/**
 * 문자열을 문자(또는 grapheme) 단위로 섞어서 반환합니다.
 *
 * - 기본 모드: JS 문자열 이터레이션(코드포인트) 단위로 분해 후 셔플
 * - useGrapheme=true: 가능한 경우 Intl.Segmenter(grapheme)로 “가시 글자” 단위 셔플
 * - `random` 주입으로 테스트/재현(시드 RNG) 또는 다른 난수원 사용 가능
 *
 * @param str - 섞을 문자열. null/undefined면 빈 문자열 반환.
 * @param options - 옵션(기본: grapheme 미사용, random=Math.random)
 * @returns 섞인 문자열.
 */
export const stringShuffle = (str?: string | null, options: StringShuffleOptions = {}): string => {
  if (typeof str !== "string") return "";
  if (str.length <= 1) return str;

  const { useGrapheme = false, locale, random = Math.random } = options;

  const canSegmenter = useGrapheme && typeof Intl !== "undefined" && "Segmenter" in Intl && typeof Intl.Segmenter === "function";
  if (canSegmenter) {
    try {
      const segmenter = new Intl.Segmenter(locale, { granularity: "grapheme" });
      const parts = Array.from(segmenter.segment(str), (s) => s.segment);
      return arrayShuffle(parts, random).join("");
    } catch {
      // Segmenter 오류 시 fallback
    }
  }

  return arrayShuffle([...str], random).join("");
};
