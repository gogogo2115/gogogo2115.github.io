import { useState, useCallback, Dispatch, SetStateAction } from "react";

const useToggle = (initialValue: boolean = false): readonly [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [isToggle, setIsToggle] = useState<boolean>(!!initialValue);
  const toggle = useCallback(() => setIsToggle((bool) => !bool), []);
  return [isToggle, toggle, setIsToggle] as const;
};

export default useToggle;
