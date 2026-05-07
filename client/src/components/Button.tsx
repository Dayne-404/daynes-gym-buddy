interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({
  text,
  disabled = false,
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className="
        w-full h-15
        rounded-2xl
        bg-gradient-brand text-primary-foreground
        shadow-primary
        font-medium
        cursor-pointer
        transition-all duration-200
        hover:opacity-90
        active:scale-[0.98]
        focus:outline-none
        focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30
      "
    >
      {text}
    </button>
  );
};

export default Button;
