"use client";
import { useParams } from "next/navigation";

export default function WebSafeColorNotFound() {
  const { color = "" } = useParams();
  return <>{color}</>;
}
