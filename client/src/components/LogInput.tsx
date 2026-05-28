import { Stack } from "@/app/layout";
import { Button, Input } from "@/components";

interface LogInputProps {
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLog: () => void;
}

const LogInput = ({ value, placeholder = "Enter value", onChange, onLog }: LogInputProps) => {
  return (
    <Stack direction="row" gap={2} center>
      <div className="flex-1" onKeyDown={(e) => e.key === "Enter" && onLog()}>
        <Input
          name="value"
          type="number"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      <Button text="Log" size="sm" className="mb-4" onClick={onLog} />
    </Stack>
  );
};

export default LogInput;
