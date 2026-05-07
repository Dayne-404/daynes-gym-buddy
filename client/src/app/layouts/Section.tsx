import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => {
  return <div className={`w-full ${className}`}>{children}</div>;
};

export default Section;
