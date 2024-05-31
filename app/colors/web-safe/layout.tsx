import { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function ColorsWebSafeLayout(props: LayoutProps) {
  const { children } = props;
  return <>{children}</>;
}
