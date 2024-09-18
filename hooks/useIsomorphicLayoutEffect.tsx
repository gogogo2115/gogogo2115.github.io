import { isClient } from "@/utils/device";
import { useEffect, useLayoutEffect } from "react";
const useIsomorphicLayoutEffect = isClient() ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
