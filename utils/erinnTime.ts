// 현실 1.5초 → 에린 1분
// 현실 시간의 15초 = 에린 시간의 10분
// 현실 시간의 1분 30초 (90초) = 에린 시간의 1시간
// 현실 시간의 18분 = 에린 시간의 12시간
// 현실 시간의 36분 = 에린 시간의 하루 에린 시간 24시간(=1일)
// 현실 시간의 하루 = 에린 시간의 40일
// 현실 시간의 1주일 = 에린 시간의 280일 = 에린 시간의 1년

type Meridiem = "am" | "pm";
type TimeFormat = "12h" | "24h";

export type ErinnTimeOption = {
  timeFormat?: TimeFormat;
  truncateTo10?: boolean;
};

export type ErinnTimeResult = {
  meridiem: Meridiem;
  hour: string;
  min: string;
  timeFormat: TimeFormat;
};

// === 상수 정의 ===
const REAL_ERRIN_DAY_SEC = 2160; // 현실 36분 = 에린 1일
const REAL_ERRIN_HOUR_SEC = 90; // 현실 90초 = 에린 1시간
const REAL_ERRIN_MIN_SEC = 1.5; // 현실 1.5초 = 에린 1분

export const errinTimeV2 = (option: ErinnTimeOption = {}): ErinnTimeResult => {
  // 옵션 기본값 정의
  const { timeFormat = "24h", truncateTo10 = false } = option;

  // 현실 하루 기준 경과된 초
  // 현실 자정 이후 경과 초
  const diffSec = Math.floor(Date.now() / 1000) % 86400;
  const offsetSec = 8.909; // 임의의 테스트로 맞춘 보정값 (초 단위)

  // 에린 하루 기준 경과된 초 (음수 결과 방지)
  const errinSec = (diffSec - offsetSec + REAL_ERRIN_DAY_SEC) % REAL_ERRIN_DAY_SEC;

  const hour = Math.floor(errinSec / REAL_ERRIN_HOUR_SEC);
  const min = Math.floor((errinSec % REAL_ERRIN_HOUR_SEC) / REAL_ERRIN_MIN_SEC);

  // 미세한 성능 향상을 위해 padStart 제거
  // 오전 / 오후
  const strMeridiem = hour >= 12 ? "pm" : "am";

  // 시
  const h = timeFormat === "12h" ? hour % 12 || 12 : hour;
  const strHour = (h < 10 ? "0" : "") + h;

  // 분
  const m = truncateTo10 ? min - (min % 10) : min;
  const strMin = (m < 10 ? "0" : "") + m;

  return { meridiem: strMeridiem, hour: strHour, min: strMin, timeFormat };
};

export const erinnTimeV1 = (option: ErinnTimeOption = {}): ErinnTimeResult => {
  // 옵션 기본값 정의
  const { timeFormat = "24h", truncateTo10 = false } = option;

  // 현재 PC(현실) 시간을 가져옴
  const currDate = new Date();

  // 에린시간
  const resetDate = new Date();
  resetDate.setHours(0, 0, 0, 0);

  // 현재시간 - 자정시간
  // 세컨으로 변경 후 에린시간 36분이 하루이므로 초기준으로 나머지에 대한 시간을 구한다.
  const diffSec = Math.floor((currDate.getTime() - resetDate.getTime()) / 1000);
  const offsetSec = 9.009; // 임의의 테스트로 맞춘 보정값 (초 단위)
  const errinDaySec = 36 * 60; // 에린 하루(24h) = 36분 = 2160초

  // 에린 하루 기준 경과된 초 (음수 결과 방지)
  const errinSec = (((diffSec - offsetSec) % errinDaySec) + errinDaySec) % errinDaySec;

  const hour = Math.floor(errinSec / 90);
  const min = Math.floor((errinSec % 90) / 1.5);

  const strMeridiem = hour >= 12 ? "pm" : "am";
  const strHour = String(timeFormat === "12h" ? hour % 12 || 12 : hour).padStart(2, "0");
  const strMin = String(truncateTo10 ? Math.floor(min / 10) * 10 : min).padStart(2, "0");

  return { meridiem: strMeridiem, hour: strHour, min: strMin, timeFormat };
};

/**
 * 마비노기 공식 홈페이지에서 추출한 소스 변수만 조금 수정함
 * 오전 00:00:00 시에 오류 있음 수정 필요함
 */
export const erinnTimeOfficial = () => {
  const curr_date = new Date();

  // 에린시간
  const reset_date = new Date();
  reset_date.setHours(0, 0, 0, 0);

  // 현재시간 - 자정시간
  // 세컨으로 변경 후 에린시간 36분이 하루이므로 초기준으로 나머지에 대한 시간을 구한다.
  const rest_sec = Math.round((((curr_date.getTime() - reset_date.getTime()) / 1000) % (36 * 60)) - 24);

  // 90초가 1시간 / 1.5초가 1분
  const erinn_hour = Math.floor(rest_sec / 90);
  const erinn_min = Math.floor((rest_sec % 90) / 1.5);

  const hour = (erinn_hour < 10 ? "0" + erinn_hour : erinn_hour).toString();
  const min = (erinn_min < 10 ? "0" + erinn_min : erinn_min).toString();

  return { hour, min };
};
