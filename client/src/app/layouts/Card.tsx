import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`w-full max-w-md rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export default Card;