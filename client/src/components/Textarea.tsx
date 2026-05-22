import type { FC } from "react";
import type { IconProps } from "react-iconly";

interface TextareaProps {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  icon?: FC<IconProps>;
  rows?: number;
  disabled?: boolean;
  errorText?: string;
}

const Textarea = ({
  name,
  placeholder,
  value,
  onChange,
  icon: Icon,
  rows = 5,
  disabled = false,
  errorText,
}: TextareaProps) => {
  const containerStyle = `flex w-full rounded-2xl px-4 py-3 bg-border border transition-all duration-200 focus-within:ring-2 focus-within:ring-primary ${errorText ? "border-red-500 focus-within:ring-red-500" : "border-transparent"}`;
  const iconStyle = errorText ? "text-red-500" : "text-gray-100";

  return (
    <div>
      <div className={containerStyle}>
        {Icon && (
          <span className={`pr-4 pt-0.5 ${iconStyle}`}>
            <Icon set="light" primaryColor="currentColor" size={20} />
          </span>
        )}
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          rows={rows}
          disabled={disabled}
          className={`w-full bg-transparent outline-none resize-none ${errorText ? "placeholder-red-500" : ""}`}
        />
      </div>
      <p className="text-xs text-red-500 mx-4 mt-0.5 text-center min-h-3.5">{errorText}</p>
    </div>
  );
};

export default Textarea;
