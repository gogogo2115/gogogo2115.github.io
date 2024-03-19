"use client";

import { useEffect, useState } from "react";

const useIsClient = (): boolean => {
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    setState(true);
  }, []);

  return state;
};

export default useIsClient;
