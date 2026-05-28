import type { IconProps } from "react-iconly";
import type { FC } from "react";

interface FormInputProps {
  icon?: FC<IconProps>;
  endIcon?: FC<IconProps>;
  onEndIconClick?: () => void;
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  errorText?: string;
}

const Input = ({
  icon: Icon,
  endIcon: EndIcon,
  onEndIconClick,
  label,
  name,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  errorText,
}: FormInputProps) => {
  const containerStyle = `flex items-center w-full h-12 rounded-2xl px-4 border transition-all duration-200 ${disabled ? "bg-gray-300 border-transparent cursor-not-allowed opacity-60" : `bg-border focus-within:ring-2 focus-within:ring-primary ${errorText ? "border-red-500 focus-within:ring-red-500" : "border-transparent"}`}`;

  const iconStyle = disabled ? "text-gray-400" : errorText ? "text-red-500" : "text-gray-100";
  const inputStyle = `w-full h-full bg-transparent outline-none cursor-inherit ${disabled ? "text-gray-500 placeholder-gray-400 cursor-not-allowed" : errorText ? "placeholder-red-500" : ""}`;
  const endIconStyle = disabled ? "text-gray-400" : errorText ? "text-red-500" : "text-gray-100";

  return (
    <div>
      <div className={containerStyle}>
        {label && (
          <span className="pr-3 text-sm text-gray-400 whitespace-nowrap">{label}</span>
        )}
        {Icon && (
          <span className={`pr-4 ${iconStyle}`}>
            <Icon set="light" primaryColor="currentColor" size={20} />
          </span>
        )}
        <input
          className={inputStyle}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          disabled={disabled}
        />
        {EndIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            className={`ml-4 ${endIconStyle}`}
            disabled={disabled}
          >
            <EndIcon set="light" primaryColor="currentColor" size={20} />
          </button>
        )}
      </div>

      <p className="text-xs text-red-500 mx-4 mt-0.5 text-center min-h-3.5">
        {errorText}
      </p>
    </div>
  );
};

export default Input;
