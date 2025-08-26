type ErinnTimeOption = {
  hours24?: boolean;
};

export const erinn = (date = new Date(), { hours24 }: ErinnTimeOption = {}) => {
  const currDate: Date = date === undefined ? new Date() : date;

  // 에린시간
  const resetDate = new Date();
  resetDate.setHours(0, 0, 0, 0);

  // 현재시간 - 자정시간
  // 세컨으로 변경 후 에린시간 36분이 하루이므로 초기준으로 나머지에 대한 시간을 구한다.
  // 에린 하루(24h) = 36분 = 2160초, 24초 오프셋(보정값)은 필요 시 0으로 조정
  const ERINN_DAY_SEC = 36 * 60;
  const OFFSET_SEC = 24;
  const elapsedSec = Math.floor((currDate.getTime() - resetDate.getTime()) / 1000);
  // 항상 [0, ERINN_DAY_SEC) 범위를 보장하는 양의 모듈러
  const restSec = (((elapsedSec - OFFSET_SEC) % ERINN_DAY_SEC) + ERINN_DAY_SEC) % ERINN_DAY_SEC;

  // 90초 = 1 에린시간, 1.5초 = 1 에린분
  const erinnHour = String(Math.floor(restSec / 90)).padStart(2, "0");
  const erinnMin = String(Math.floor((restSec % 90) / 1.5)).padStart(2, "0");
  console.log(erinnHour, erinnMin);
};

// export const erinn_time = () => {
//   const curr_date = new Date();

//   // 에린시간
//   const reset_date = new Date();
//   reset_date.setHours(0, 0, 0, 0);

//   // 현재시간 - 자정시간
//   // 세컨으로 변경 후 에린시간 36분이 하루이므로 초기준으로 나머지에 대한 시간을 구한다.
//   const rest_sec = Math.round((((curr_date - reset_date) / 1000) % (36 * 60)) - 24);

//   // 90초가 1시간 / 1.5초가 1분
//   erinn_hour = Math.floor(rest_sec / 90);
//   erinn_min = Math.floor((rest_sec % 90) / 1.5);

//   //console.log(erinn_hour + ":" + erinn_min);

//   erinn_hour = lpad(erinn_hour.toString(), 2, "0");
//   erinn_min = lpad(erinn_min.toString(), 2, "0");

//   $("#erin_time").html(erinn_hour.substring(0, 1) + " " + erinn_hour.substring(1, 2) + " : " + erinn_min.substring(0, 1) + " " + erinn_min.substring(1, 2));
// };

// function getErinnTime() {
//   const KOREAN_OFFSET = 9;
//   const SECONDS_IN_DAY = 60 * 60 * 24;
//   const FIX_SECONDS = 0 * 60 * 60 - 8 * 60 + 0;
//   const date = new Date();
//   const KoreanHours = (date.getUTCHours() + KOREAN_OFFSET) % 24;
//   const KoreanMinutes = (date.getUTCMinutes() + KOREAN_OFFSET * 60) % 60;
//   const KoreanSeconds = (date.getUTCSeconds() + KOREAN_OFFSET * 60 * 60) % 60;
//   const KoreanTimeInSeconds = KoreanHours * 60 * 60 + KoreanMinutes * 60 + KoreanSeconds;
//   let ErinnTimeInSeconds = KoreanTimeInSeconds * 40;
//   ErinnTimeInSeconds = ErinnTimeInSeconds + FIX_SECONDS;
//   ErinnTimeInSeconds %= SECONDS_IN_DAY;
//   return [Math.floor((ErinnTimeInSeconds / 60 / 60) % 24), Math.floor((ErinnTimeInSeconds / 60) % 60), ErinnTimeInSeconds % 60];
// }
