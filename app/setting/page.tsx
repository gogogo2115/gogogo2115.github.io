import { PACKAGE_GENERATOR, BUILD_HASH, BUILD_AT } from "@/utils/index";

const SettingPage = () => {
  const utcDate = new Date(BUILD_AT);
  const BUILD_AT_KR = utcDate.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    weekday: "long",
  });

  return (
    <ul>
      <li>build hash : {BUILD_HASH}</li>
      <li>build date : {BUILD_AT_KR}</li>
    </ul>
  );
};

export default SettingPage;
