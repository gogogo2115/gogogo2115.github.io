"use client";
import { useEffect } from "react";
import { isNavigatorShareSupported } from "@/hooks/NavigatorShare";

const Maintenance = () => {
  useEffect(() => {
    console.log("isNavigatorShareSupported", isNavigatorShareSupported());
  }, []);

  return <div id="Maintenance">준비중입니다.</div>;
};

export default Maintenance;
