import { Stack } from "@/app/layout";
import { Button, Input } from "@/components";

interface CalorieLogInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLog: () => void;
}

const CalorieLogInput = ({ value, onChange, onLog }: CalorieLogInputProps) => {
  return (
    <Stack direction="row" gap={2} center>
      <div className="flex-1">
        <Input
          name="calories"
          type="number"
          placeholder="Enter Calories"
          value={value}
          onChange={onChange}
        />
      </div>
      <Button text="Log" size="sm" className="mb-4" onClick={onLog} />
    </Stack>
  );
};

export default CalorieLogInput;
