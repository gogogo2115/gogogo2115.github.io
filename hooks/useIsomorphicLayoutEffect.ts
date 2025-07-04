"use client";

import { useEffect, useLayoutEffect } from "react";

const isClient = () => typeof window !== "undefined";

export const useIsomorphicLayoutEffect = isClient() ? useLayoutEffect : useEffect;
