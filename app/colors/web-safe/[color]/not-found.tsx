"use client";
import { useParams } from "next/navigation";

export default function WebSafeColorNotFound() {
  const { color = "" } = useParams();
  const isColorHexRegex = /^([0-9A-F]{3}|[0-9A-F]{6})$/i;
  return <>{color}</>;
}
