"use client";

import { useEffect, useState } from "react";

const useHistoryLength = () => {
  const [historyLength, setHistoryLength] = useState(0);

  useEffect(() => {
    const { length = 0 } = window.history;
    setHistoryLength(length);
  }, []);

  return historyLength;
};

export default useHistoryLength;
