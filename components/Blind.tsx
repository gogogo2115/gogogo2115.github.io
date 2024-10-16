import { ReactNode, ElementType } from "react";

type BlindProps = {
  as?: ElementType;
  children: ReactNode;
  [key: string]: unknown;
};

const Blind = ({ as: Component = "span", children, ...rest }: BlindProps) => {
  return <Component {...rest}>{children}</Component>;
};

export default Blind;
