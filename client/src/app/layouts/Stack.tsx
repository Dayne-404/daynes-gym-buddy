import type { ReactNode } from "react";

interface StackProps {
  children: ReactNode;
  gap?: number;
  className?: string;
}

const gapMap: Record<number, string> = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
};

const Stack = ({ children, gap = 4, className = "" }: StackProps) => {
  return (
    <div className={`flex flex-col ${gapMap[gap]} ${className}`}>
      {children}
    </div>
  );
};

export default Stack;
