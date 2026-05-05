import type { IconProps } from "react-iconly";
import type { FC } from "react";

interface FormInputProps {
  icon?: FC<IconProps>;
  endIcon?: FC<IconProps>;
  onEndIconClick?: () => void;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  icon: Icon,
  endIcon: EndIcon,
  onEndIconClick,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div className="flex items-center w-full h-12 rounded-2xl px-4 bg-border border border-transparent transition-all duration-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
      {Icon && (
        <span className="text-gray-100 pr-4">
          <Icon set="light" primaryColor="currentColor" size={20} />
        </span>
      )}
      <input
        className="w-full h-full bg-transparent outline-none"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {EndIcon && (
        <button
          type="button"
          onClick={onEndIconClick}
          className="text-gray-100 hover:text-primary ml-4"
        >
          <EndIcon set="light" primaryColor="currentColor" size={20} />
        </button>
      )}
    </div>
  );
};

export default FormInput;
