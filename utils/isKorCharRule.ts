/**
 * 한글 구별 체크
 * @example isKorCharRule(text)? '를' : '을'
 * @example isKorCharRule(text)? '는' : '은'
 * @example isKorCharRule(text)? '가' : '이'
 * @example isKorCharRule(text)? '와' : '과'
 * @example isKorCharRule(text)? '로' : '으로'
 *
 * 0xAC00 = 가
 * 초성 인덱스 = ((한글 유니코드값 - 0xAC00) / 28) / 21
 * 중성 인덱스 = ((한글 유니코드값 - 0xAC00) / 28) % 21
 * 종성 인덱스 = (한글 유니코드값 - 0xAC00) % 28
 */
const isKorCharRule = (str: string): boolean => {
  const korStartStr = 44032; //가
  const korEndStr = 55203; //힣
  var lastStrCode = str.charCodeAt(str.length - 1);
  if (lastStrCode < korStartStr || lastStrCode > korEndStr) {
    return false; //한글이 아닐 경우 false
  }
  return (lastStrCode - korStartStr) % 28 == 0;
};

export default isKorCharRule;
