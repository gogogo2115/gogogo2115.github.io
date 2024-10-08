"use client";

import { useState } from "react";
import useIsomorphicLayoutEffect from "@/hooks/useIsomorphicLayoutEffect";

const useHistoryLength = () => {
  const [historyLength, setHistoryLength] = useState(0);

  useIsomorphicLayoutEffect(() => {
    const { length = 0 } = window.history;
    setHistoryLength(length);
  }, []);

  return historyLength;
};

export default useHistoryLength;
