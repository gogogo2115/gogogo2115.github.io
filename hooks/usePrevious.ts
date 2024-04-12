"use client";

import { useRef, useEffect, type MutableRefObject } from "react";

type Options<D> = { defaultValue?: D };

function usePrevious<T>(value: T, { defaultValue }: Options<T> = {}): MutableRefObject<T | undefined>["current"] {
  const ref = useRef<T | undefined>(defaultValue === undefined ? value : defaultValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
