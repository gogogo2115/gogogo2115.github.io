"use client";

import { useLayoutEffect, useState } from "react";

const useHistoryLength = () => {
  const [historyLength, setHistoryLength] = useState<null | number>(null);

  useLayoutEffect(() => {
    const { length = 0 } = window.history;
    setHistoryLength(length);
  }, []);

  return historyLength;
};

export default useHistoryLength;
