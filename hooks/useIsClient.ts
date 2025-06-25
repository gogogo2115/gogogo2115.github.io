"use client";

import { useEffect, useState } from "react";

export const useIsClient = () => {
  const [isClient, setClient] = useState<boolean>(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return isClient;
};
