// 현실 1.5초 → 에린 1분
// 현실 시간의 15초 = 에린 시간의 10분
// 현실 시간의 1분 30초(90초) = 에린 시간의 1시간
// 현실 시간의 18분 = 에린 시간의 12시간
// 현실 시간의 36분 = 에린 시간의 하루 에린 시간 24시간(=1일)
// 현실 시간의 하루 = 에린 시간의 40일
// 현실 시간의 1주일 = 에린 시간의 280일 = 에린 시간의 1년

type ErinnTimeOption = {
  timeFormat?: "12h" | "24h";
  truncateTo10?: boolean;
};

type ErinnTimeResult = {
  meridiem: "am" | "pm";
  hour: string;
  min: string;
  timeFormat: "12h" | "24h";
};

export const testErinnTime = (option: ErinnTimeOption = {}) => {
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
  const offsetSec = 8.8;
  const errinDaySec = 36 * 60; // 에린 하루(24h) = 36분 = 2160초

  const errinSec = (((diffSec - offsetSec) % errinDaySec) + errinDaySec) % errinDaySec;

  const hour = Math.floor(errinSec / 90);
  const min = Math.floor((errinSec % 90) / 1.5);
  return { meridiem: "am", hour, min, timeFormat };
};

// let e = setInterval(() => {
//   var e;
//   let n, a, t, c;
//   l((e) => new Date().getTime()),
//     s(
//       ((n = new Date()),
//       (a = new Date()).setHours(0, 0, 0, 0),
//       (t = Math.floor((e = Math.round((((n - a) / 1e3) % 2160) - 0)) / 90)),
//       (c = Math.floor((e % 90) / 1.5)),
//       (t = i(t.toString(), 2, "0")),
//       (c = i(c.toString(), 2, "0")),
//       t.substring(0, 1) + t.substring(1, 2) + ":" + c.substring(0, 1) + c.substring(1, 2))
//     );
// }, 1e3);

// 공식 홈페이지의 소스
// function erinn_time() {
//   var curr_date = new Date();

//   // 에린시간
//   var reset_date = new Date();
//   reset_date.setHours(0, 0, 0, 0);

//   // 현재시간 - 자정시간
//   // 세컨으로 변경 후 에린시간 36분이 하루이므로 초기준으로 나머지에 대한 시간을 구한다.
//   var rest_sec = Math.round((((curr_date - reset_date) / 1000) % (36 * 60)) - 24);

//   // 90초가 1시간 / 1.5초가 1분
//   erinn_hour = Math.floor(rest_sec / 90);
//   erinn_min = Math.floor((rest_sec % 90) / 1.5);

//   //console.log(erinn_hour + ":" + erinn_min);

//   erinn_hour = lpad(erinn_hour.toString(), 2, "0");
//   erinn_min = lpad(erinn_min.toString(), 2, "0");

//   $("#erin_time").html(erinn_hour.substring(0, 1) + " " + erinn_hour.substring(1, 2) + " : " + erinn_min.substring(0, 1) + " " + erinn_min.substring(1, 2));
// }

export const erinn = () => {
  const currDate: Date = new Date();

  // 에린시간
  const resetDate = new Date();
  resetDate.setHours(0, 0, 0, 0);

  // 현재시간 - 자정시간
  // 세컨으로 변경 후 에린시간 36분이 하루이므로 초기준으로 나머지에 대한 시간을 구한다.
  // 에린 하루(24h) = 36분 = 2160초, 24초 오프셋(보정값)은 필요 시 0으로 조정
  const ERINN_DAY_SEC = 36 * 60; // 에린 하루(24h) = 36분 = 2160초,
  const OFFSET_SEC = 8.8;
  const elapsedSec = Math.floor((currDate.getTime() - resetDate.getTime()) / 1000);
  // 항상 [0, ERINN_DAY_SEC) 범위를 보장하는 양의 모듈러
  const restSec = (((elapsedSec - OFFSET_SEC) % ERINN_DAY_SEC) + ERINN_DAY_SEC) % ERINN_DAY_SEC;

  // 90초 = 1 에린시간, 1.5초 = 1 에린분
  const erinnHour = String(Math.floor(restSec / 90)).padStart(2, "0");
  const erinnMin = String(Math.floor((restSec % 90) / 1.5)).padStart(2, "0");
  const erinnSec = String(Math.floor(((restSec % 90) % 1.5) / 0.025)).padStart(2, "0");

  // let aa = erinnMin;
  // if (!erinnMin.endsWith("0")) {
  //   aa = erinnMin[0] + "0";
  // }

  return { hour: erinnHour, min: erinnMin, sec: erinnSec };
};

export function getErinnTime() {
  const KOREAN_OFFSET = 9;
  const SECONDS_IN_DAY = 60 * 60 * 24;
  const FIX_SECONDS = 0 * 60 * 60 - 8 * 60 + 0;
  const date = new Date();
  const KoreanHours = (date.getUTCHours() + KOREAN_OFFSET) % 24;
  const KoreanMinutes = (date.getUTCMinutes() + KOREAN_OFFSET * 60) % 60;
  const KoreanSeconds = (date.getUTCSeconds() + KOREAN_OFFSET * 60 * 60) % 60;
  const KoreanTimeInSeconds = KoreanHours * 60 * 60 + KoreanMinutes * 60 + KoreanSeconds;
  let ErinnTimeInSeconds = KoreanTimeInSeconds * 40;
  ErinnTimeInSeconds = ErinnTimeInSeconds + FIX_SECONDS;
  ErinnTimeInSeconds %= SECONDS_IN_DAY;
  return [Math.floor((ErinnTimeInSeconds / 60 / 60) % 24), Math.floor((ErinnTimeInSeconds / 60) % 60), ErinnTimeInSeconds % 60];
}
