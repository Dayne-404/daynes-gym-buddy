import { type ReactNode } from "react";

type CardVariant = "default" | "gradient-brand" | "gradient-brand-opaque" | "gradient-secondary";

interface CardProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "flex";
  variant?: CardVariant;
  className?: string;
  onClick?: () => void;
}

const sizeClasses = {
  sm: "w-35 h-35",
  md: "w-40 h-40",
  lg: "w-55 h-55",
  flex: "flex-1",
};

const variantClasses: Record<CardVariant, string> = {
  default: "",
  "gradient-brand": "bg-gradient-brand",
  "gradient-brand-opaque": "bg-gradient-brand-opaque",
  "gradient-secondary": "bg-gradient-secondary",
};

const Card = ({ children, size = "md", variant = "default", className = "", onClick }: CardProps) => {
  return (
    <div
      className={`shadow-primary rounded-xl p-4 ${sizeClasses[size]} ${variantClasses[variant]} ${className}${onClick ? " cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
