"use client";

import { isClient } from "@/utils";
import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect = isClient ? useLayoutEffect : useEffect;

export default useIsomorphicLayoutEffect;
