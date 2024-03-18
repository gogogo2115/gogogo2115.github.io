"use client";
import { useEffect, useState } from "react";
import { isNavigatorShareSupported } from "@/hooks/NavigatorShare";

const Maintenance = () => {
  const [test, setTest] = useState(false);

  useEffect(() => {
    console.log("isNavigatorShareSupported", isNavigatorShareSupported());
    setTest(isNavigatorShareSupported());
  }, []);

  return (
    <div>
      <div>{test ? "테스트!" : "테스트!!"}</div>
      <div id="Maintenance">준비중입니다.</div>
    </div>
  );
};

export default Maintenance;
