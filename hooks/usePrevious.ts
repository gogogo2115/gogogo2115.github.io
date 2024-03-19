import { useEffect, useRef } from "react";

// export default function usePrevious<T>(value: T, { defaultValue }: { defaultValue?: T }): T | undefined {
//   const ref = useRef<T>();

//   useEffect(() => {
//     ref.current = value;
//   });

//   return ref.current;
// }

const usePrevious = <T>(value: T, { defaultValue }: { defaultValue?: T }) => {
  const ref = useRef<T>(defaultValue != null ? defaultValue : value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
