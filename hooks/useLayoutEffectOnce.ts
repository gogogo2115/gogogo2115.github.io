"use client";

import { EffectCallback, useLayoutEffect } from "react";

export default function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useLayoutEffect(effect, []);
}
