import type { ReactNode } from "react";

type TestLayoutProps = {
  children: ReactNode;
};

export default function TestLayout({ children }: TestLayoutProps) {
  return <>{children}</>;
}
