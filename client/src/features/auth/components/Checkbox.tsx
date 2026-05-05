interface CheckboxProps {
  label?: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export const Checkbox = ({ label, checked, setChecked }: CheckboxProps) => {
  return (
    <label className="flex gap-3 cursor-pointer px-4">
      <input type="checkbox" className="w-6 h-6 accent-primary" checked={checked} onChange={(e) => setChecked(e.target.checked)}/>
      {label && <span className="text-gray-500 text-medium">{label}</span>}
    </label>
  );
};
