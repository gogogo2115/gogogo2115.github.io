export const erinn_time = () => {
  const curr_date = new Date();

  // 에린시간
  const reset_date = new Date();
  reset_date.setHours(0, 0, 0, 0);

  // 현재시간 - 자정시간
  // 세컨으로 변경 후 에린시간 36분이 하루이므로 초기준으로 나머지에 대한 시간을 구한다.
  const rest_sec = Math.round((((curr_date - reset_date) / 1000) % (36 * 60)) - 24);

  // 90초가 1시간 / 1.5초가 1분
  erinn_hour = Math.floor(rest_sec / 90);
  erinn_min = Math.floor((rest_sec % 90) / 1.5);

  //console.log(erinn_hour + ":" + erinn_min);

  erinn_hour = lpad(erinn_hour.toString(), 2, "0");
  erinn_min = lpad(erinn_min.toString(), 2, "0");

  $("#erin_time").html(erinn_hour.substring(0, 1) + " " + erinn_hour.substring(1, 2) + " : " + erinn_min.substring(0, 1) + " " + erinn_min.substring(1, 2));
};
