import type { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
}

const Panel = ({ children, className = "" }: PanelProps) => {
  return (
    <div className={`w-full max-w-md rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export default Panel;