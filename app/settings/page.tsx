"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";

export default function SettingsPage() {
  const settings = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <>
      <div></div>
    </>
  );
}
