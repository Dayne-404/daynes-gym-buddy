import type { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  label?: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const variantClasses = {
  primary:
    "bg-border hover:opacity-90",
  ghost:
    "bg-transparent text-foreground hover:bg-muted",
};

const IconButton = ({
  icon,
  onClick,
  disabled = false,
  label,
  variant = "primary",
  size = "md",
}: IconButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`
        inline-flex items-center justify-center
        rounded-xl
        cursor-pointer
        transition-all duration-200
        active:scale-[0.95]
        focus:outline-none
        focus-visible:ring-2 focus-visible:ring-primary/30
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
      `}
    >
      {icon}
    </button>
  );
};

export default IconButton;
