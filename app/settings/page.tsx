import { Metadata } from "next";
import SettingsClientPage from "./page.client";

export const metadata: Metadata = {
  title: "설정",
  description: "설정",
};

export default function SettingsPage() {
  return <SettingsClientPage />;
}
