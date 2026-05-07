import type { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box = ({ children, className = "" }: BoxProps) => {
  return <div className={`w-full ${className}`}>{children}</div>;
};

export default Box;
