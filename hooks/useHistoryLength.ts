"use  client";

import { isClient } from "@/utils";
import { useEffect, useState } from "react";

const useHistoryLength = (): number => {
  const [historyLength, setHistoryLength] = useState(1);

  useEffect(() => {
    if (!isClient) return;
    setHistoryLength(window.history.length);
  }, []);

  return historyLength;
};

export default useHistoryLength;
