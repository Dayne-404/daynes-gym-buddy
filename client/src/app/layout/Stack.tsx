import type { ReactNode } from "react";

interface StackProps {
  children?: ReactNode;
  gap?: number;
  direction?: "row" | "col";
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  spaceBetween?: boolean;
  className?: string;
}

const gapMap: Record<number, string> = {
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  6: "gap-6",
  7: "gap-7",
  8: "gap-8",
};

const Stack = ({
  children,
  gap = 4,
  direction = "col",
  center = false,
  centerX = false,
  centerY = false,
  spaceBetween = false,
  className = "",
}: StackProps) => {
  const alignItems = center || centerY ? "items-center" : "";
  const justifyContent =
    center || centerX
      ? "justify-center"
      : spaceBetween
        ? "justify-between"
        : "";

  return (
    <div
      className={`flex flex-${direction} ${gapMap[gap]} ${alignItems} ${justifyContent} ${className}`.trim()}
    >
      {children}
    </div>
  );
};

export default Stack;
