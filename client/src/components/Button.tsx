type ButtonSize = "sm" | "md" | "lg" | "full";
type ButtonVariant =
  | "gradient-brand"
  | "gradient-secondary"
  | "foreground"
  | "foreground-gradient";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
  shadow?: boolean;
  className?: string;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "w-28 h-9 text-xs",
  md: "w-40 h-12",
  lg: "w-56 h-15",
  full: "w-full h-15",
};

const variantClasses: Record<ButtonVariant, string> = {
  "gradient-brand": "bg-gradient-brand text-primary-foreground",
  "gradient-secondary": "bg-gradient-secondary text-primary-foreground",
  foreground: "bg-foreground text-primary-foreground",
  "foreground-gradient": "bg-primary-foreground text-primary",
};

const Button = ({
  text,
  disabled = false,
  onClick = () => {},
  size = "full",
  variant = "gradient-brand",
  shadow = true,
  className,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        rounded-2xl
        ${variantClasses[variant]}
        ${shadow ? "shadow-primary" : "shadow-none"}
        font-medium
        cursor-pointer
        transition-all duration-200
        hover:opacity-90
        active:scale-[0.98]
        focus:outline-none
        focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default Button;
