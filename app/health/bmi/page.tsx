import { Metadata } from "next";
import BmiPageClient from "./page.client";

export const metadata: Metadata = {
  title: "bmi 계산기",
  keywords: ["BMI CALCULATOR", "bmi 계산기", "body mass index"],
};

export default function BmiPage() {
  return <BmiPageClient />;
}
